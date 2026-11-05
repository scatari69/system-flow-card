// Demo-only stand-in. Home Assistant supplies its own ha-form and entity/icon pickers.
customElements.define('ha-form', class extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); }
  set hass(value) { this._hass=value; this.render(); }
  set data(value) { this._data=value; this.render(); }
  get data() { return this._data; }
  set schema(value) { this._schema=value; this.render(); }
  get schema() { return this._schema; }
  set computeLabel(value) { this._label=value; this.render(); }
  render() {
    if(!this._schema || !this._data) return;
    const style=document.createElement('style');
    style.textContent=`:host{display:block}label{display:grid;gap:6px;font:13px system-ui;margin:0 0 16px;color:var(--secondary-text-color)}input,select{box-sizing:border-box;width:100%;font:14px system-ui;color:var(--primary-text-color);background:var(--ha-card-background);border:1px solid var(--divider-color);border-radius:10px;padding:10px;min-width:0}input[type=checkbox]{width:18px;height:18px;accent-color:var(--primary-color)}input:focus-visible,select:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px}`;
    this.shadowRoot.replaceChildren(style);
    this._schema.forEach(field=>{
      const label=document.createElement('label');
      const text=document.createElement('span');
      text.textContent=this._label?this._label(field):field.label||field.name;
      label.append(text);
      const selector=field.selector;
      const control=document.createElement(selector.select?'select':'input');
      control.name=field.name;
      control.required=!!field.required;
      if(selector.select) selector.select.options.forEach(value=>{
        const option=document.createElement('option');option.value=value;option.textContent=value;control.append(option);
      });
      else control.type=selector.boolean?'checkbox':selector.number?'number':'text';
      if(selector.boolean)control.checked=!!this._data[field.name];
      else control.value=this._data[field.name]??'';
      if(selector.number) ['min','max','step'].forEach(key=>control[key]=selector.number[key]);
      if(selector.entity){
        const list=document.createElement('datalist');list.id='entities-'+field.name;
        Object.entries(this._hass?.states||{}).forEach(([id,entity])=>{const option=document.createElement('option');option.value=id;option.textContent=entity.attributes.friendly_name||id;list.append(option)});
        control.setAttribute('list',list.id);label.append(list);
      }
      control.addEventListener('change',()=>{
        if(!control.checkValidity())return;
        const value={...this._data};
        if(selector.boolean)value[field.name]=control.checked;
        else if(control.value==='')delete value[field.name];
        else value[field.name]=selector.number?Number(control.value):control.value;
        this.dispatchEvent(new CustomEvent('value-changed',{detail:{value},bubbles:true,composed:true}));
      });
      label.append(control);this.shadowRoot.append(label);
    });
  }
});
