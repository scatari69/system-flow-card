export async function testLayout(card, original) {
  const check=(condition,message)=>{if(!condition)throw Error('Layout: '+message)};
  const root=card.shadowRoot;
  const rect=element=>element.getBoundingClientRect();
  const originalWidth=card.style.width;
  const heights=[];
  const sizes=[];
  const cases=[
    original.elements,
    original.elements.filter(element=>element.position!=='top'),
    original.elements.filter(element=>element.position!=='top'&&element.position!=='bottom'),
    original.elements.filter(element=>element.position!=='bottom'),
    original.elements.filter(element=>element.position==='top'),
    original.elements.filter(element=>element.position==='bottom'),
    [{...original.elements[0],position:'left'}],
    [...Array.from({length:3},()=>({...original.elements[0],position:'left'})),{...original.elements[1],position:'right'}],
    [...original.elements,{...original.elements[0]},{...original.elements.find(element=>element.position==='bottom')}],
  ];
  try {
    for(const width of ['320px','600px']){
    card.style.width=width;heights.length=0;sizes.length=0;
    for(const elements of cases){
      card.setConfig({...original,elements});await card.updateComplete;
      heights.push(rect(root.querySelector('ha-card')).height);sizes.push(card.getCardSize());
      check(!root.querySelector('.spacer'),'empty sensor placeholders are removed');
      const center=rect(root.querySelector('.container-middle .circle'));
      const nodes=[...root.querySelectorAll('.circle')].map(rect);
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++)check(nodes[i].right<=nodes[j].left||nodes[j].right<=nodes[i].left||nodes[i].bottom<=nodes[j].top||nodes[j].bottom<=nodes[i].top,'nodes do not overlap');
      for(const [position,svg] of [...root.querySelectorAll('.lines > svg')].map((svg,i)=>[['left','top','right','bottom'][i],svg])){
        const sensors=[...root.querySelectorAll('.container-'+position+' .circle')];
        const paths=svg.querySelectorAll(':scope > path');
        check(paths.length===sensors.length,'one connector per sensor');
        for(let index=0;index<paths.length;index++){
          const path=paths[index];const node=rect(sensors[index]);
          const start=path.getPointAtLength(0).matrixTransform(path.getScreenCTM());
          const end=path.getPointAtLength(path.getTotalLength()).matrixTransform(path.getScreenCTM());
          const expected=position==='left'?[center.left,center.top+center.height/2]:position==='right'?[center.right,center.top+center.height/2]:position==='top'?[center.left+center.width/2,center.top]:[center.left+center.width/2,center.bottom];
          check(Math.hypot(start.x-expected[0],start.y-expected[1])<2,'connector starts at center '+position+' '+width+' case '+cases.indexOf(elements));
          check(Math.hypot(end.x-node.left-node.width/2,end.y-node.top-node.height/2)<2,'connector ends at sensor '+position);
        }
      }
    }
    check(heights[0]-heights[1]>80,'removing top sensor reduces height');
    check(heights[1]-heights[2]>80,'removing bottom sensor reduces height');
    check(Math.abs(heights[1]-heights[3])<2,'top-only and bottom-only layouts have equal height');
    check(sizes[0]>sizes[1]&&sizes[1]>sizes[2],'Home Assistant size estimate follows occupied rows');
    }
  } finally {card.style.width=originalWidth;card.setConfig(original);await card.updateComplete}
}
