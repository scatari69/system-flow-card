export async function testLabels(card, original) {
  const check=(condition,message)=>{if(!condition)throw Error('Labels: '+message)};
  const root=card.shadowRoot;
  const sensor=()=>root.querySelector('.container-'+original.elements[0].position);
  const system=()=>root.querySelector('.container-middle');
  const set=async(name,show_name)=>{card.setConfig({...original,system:{...original.system,name,show_name},elements:original.elements.map((element,index)=>index?element:{...element,name,show_name})});await card.updateComplete};
  try {
    await set(undefined,undefined);
    const defaultName=sensor().querySelector('.node-label').textContent;
    check(defaultName==='Solar panels'&&system().querySelector('.node-label').textContent==='System','existing labels remain visible');
    await set('Custom node',true);
    check(sensor().querySelector('.node-label').textContent==='Custom node'&&system().querySelector('.node-label').textContent==='Custom node','custom names render on sensors and system');
    check(sensor().querySelector('.node-label').title==='Custom node','full name is available as tooltip');
    await set('Custom node',false);
    check(!sensor().querySelector('.node-label')&&!system().querySelector('.node-label'),'labels can be hidden independently of names');
    check(sensor().querySelector('.circle').getAttribute('aria-label')==='Custom node','hidden labels keep accessible names');
    check(root.querySelectorAll('.node-label').length===original.elements.length-1,'other nodes keep their labels');
    await set('  ',true);
    check(sensor().querySelector('.node-label').textContent===defaultName&&system().querySelector('.node-label').textContent==='System','empty custom names restore defaults');
    await set('<img src=x>',true);
    check(sensor().querySelector('.node-label').textContent==='<img src=x>'&&!sensor().querySelector('img'),'custom names render as safe text');
    await set('Custom node',false);
    check(root.querySelectorAll('.circle').length===original.elements.length+1,'hiding labels preserves sensor nodes');
  } finally {card.setConfig(original);await card.updateComplete}
}
