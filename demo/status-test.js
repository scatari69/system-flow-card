export async function testStatus(card, original, hass) {
  const check=(condition,message)=>{if(!condition)throw Error('Status: '+message)};
  const originalWidth=card.style.width;
  const originalHass=card.hass;
  try {
    for(const width of ['320px','600px']){
      card.style.width=width;
      for(const override of [false,true]){
        const states={...hass.states,'sensor.long_status':{state:'scheduled_recharge',attributes:{friendly_name:'Status'}}};
        card.hass={states};
        card.setConfig({...original,system:{...original.system,...(override?{override:true,value:'sensor.long_status',extra:undefined}:{extra:'sensor.long_status'})}});
        await card.updateComplete;
        const circle=card.shadowRoot.querySelector('.container-middle .circle');
        const row=circle.querySelector('.status-row');
        check(row.textContent.trim().startsWith('scheduled_recharge'),'full status is retained');
        check(getComputedStyle(row).whiteSpace==='normal','status can wrap');
        check(row.scrollWidth<=row.clientWidth+1,'status fits horizontally');
        const rows=[...circle.children].filter(element=>!element.classList.contains('fill-level')).map(element=>element.getBoundingClientRect());
        check(rows.every((rect,index)=>!index||rect.top>=rows[index-1].bottom-1),'status does not overlap icon or value');
        const bounds=circle.getBoundingClientRect();
        check(rows[0].top>=bounds.top&&rows[rows.length-1].bottom<=bounds.bottom,'content stays within node height');
        const range=document.createRange();range.selectNodeContents(row);
        for(const line of range.getClientRects())for(const x of [line.left,line.right])for(const y of [line.top,line.bottom])check(Math.hypot(x-bounds.left-bounds.width/2,y-bounds.top-bounds.height/2)<=bounds.width/2+1,'status stays inside circular boundary '+width);
      }
    }
  } finally {card.style.width=originalWidth;card.hass=originalHass;card.setConfig(original);await card.updateComplete}
}
