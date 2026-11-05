function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}var e,i;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(e||(e={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(i||(i={}));var s={alert:"mdi:alert",automation:"mdi:playlist-play",calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:google-pages",script:"mdi:file-document",sensor:"mdi:eye",simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weblink:"mdi:open-in-new"};function o(t,e){if(t in s)return s[t];switch(t){case"alarm_control_panel":switch(e){case"armed_home":return"mdi:bell-plus";case"armed_night":return"mdi:bell-sleep";case"disarmed":return"mdi:bell-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:bell"}case"binary_sensor":return e&&"off"===e?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"cover":return"closed"===e?"mdi:window-closed":"mdi:window-open";case"lock":return e&&"unlocked"===e?"mdi:lock-open":"mdi:lock";case"media_player":return e&&"off"!==e&&"idle"!==e?"mdi:cast-connected":"mdi:cast";case"zwave":switch(e){case"dead":return"mdi:emoticon-dead";case"sleeping":return"mdi:sleep";case"initializing":return"mdi:timer-sand";default:return"mdi:z-wave"}default:return console.warn("Unable to find icon for domain "+t+" ("+e+")"),"mdi:bookmark"}}var r={humidity:"mdi:water-percent",illuminance:"mdi:brightness-5",temperature:"mdi:thermometer",pressure:"mdi:gauge",power:"mdi:flash",signal_strength:"mdi:wifi"},n={binary_sensor:function(t,e){var i="off"===t;switch(null==e?void 0:e.attributes.device_class){case"battery":return i?"mdi:battery":"mdi:battery-outline";case"battery_charging":return i?"mdi:battery":"mdi:battery-charging";case"cold":return i?"mdi:thermometer":"mdi:snowflake";case"connectivity":return i?"mdi:server-network-off":"mdi:server-network";case"door":return i?"mdi:door-closed":"mdi:door-open";case"garage_door":return i?"mdi:garage":"mdi:garage-open";case"power":case"plug":return i?"mdi:power-plug-off":"mdi:power-plug";case"gas":case"problem":case"safety":case"tamper":return i?"mdi:check-circle":"mdi:alert-circle";case"smoke":return i?"mdi:check-circle":"mdi:smoke";case"heat":return i?"mdi:thermometer":"mdi:fire";case"light":return i?"mdi:brightness-5":"mdi:brightness-7";case"lock":return i?"mdi:lock":"mdi:lock-open";case"moisture":return i?"mdi:water-off":"mdi:water";case"motion":return i?"mdi:walk":"mdi:run";case"occupancy":case"presence":return i?"mdi:home-outline":"mdi:home";case"opening":return i?"mdi:square":"mdi:square-outline";case"running":return i?"mdi:stop":"mdi:play";case"sound":return i?"mdi:music-note-off":"mdi:music-note";case"update":return i?"mdi:package":"mdi:package-up";case"vibration":return i?"mdi:crop-portrait":"mdi:vibrate";case"window":return i?"mdi:window-closed":"mdi:window-open";default:return i?"mdi:radiobox-blank":"mdi:checkbox-marked-circle"}},cover:function(t){var e="closed"!==t.state;switch(t.attributes.device_class){case"garage":return e?"mdi:garage-open":"mdi:garage";case"door":return e?"mdi:door-open":"mdi:door-closed";case"shutter":return e?"mdi:window-shutter-open":"mdi:window-shutter";case"blind":return e?"mdi:blinds-open":"mdi:blinds";case"window":return e?"mdi:window-open":"mdi:window-closed";default:return o("cover",t.state)}},sensor:function(t){var e=t.attributes.device_class;if(e&&e in r)return r[e];if("battery"===e){var i=Number(t.state);if(isNaN(i))return"mdi:battery-unknown";var s=10*Math.round(i/10);return s>=100?"mdi:battery":s<=0?"mdi:battery-alert":"hass:battery-"+s}var n=t.attributes.unit_of_measurement;return"°C"===n||"°F"===n?"mdi:thermometer":o("sensor")},input_datetime:function(t){return t.attributes.has_date?t.attributes.has_time?o("input_datetime"):"mdi:calendar":"mdi:clock"}};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const a=window,l=a.ShadowRoot&&(void 0===a.ShadyCSS||a.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,c=Symbol(),d=new WeakMap;let h=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==c)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(l&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=d.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&d.set(e,t))}return t}toString(){return this.cssText}};const u=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new h(i,t,c)},m=l?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new h("string"==typeof t?t:t+"",void 0,c))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var p;const v=window,f=v.trustedTypes,g=f?f.emptyScript:"",y=v.reactiveElementPolyfillSupport,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>e!==t&&(e==e||t==t),_={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$};let x=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||_}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(m(t))}else void 0!==t&&e.push(m(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{l?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=a.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=_){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:b).toAttribute(e,i.type);this._$El=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:b;this._$El=o,this[o]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||$)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var w;x.finalized=!0,x.elementProperties=new Map,x.elementStyles=[],x.shadowRootOptions={mode:"open"},null==y||y({ReactiveElement:x}),(null!==(p=v.reactiveElementVersions)&&void 0!==p?p:v.reactiveElementVersions=[]).push("1.6.1");const E=window,A=E.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,k=`lit$${(Math.random()+"").slice(9)}$`,C="?"+k,O=`<${C}>`,j=document,T=(t="")=>j.createComment(t),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,N=/>/g,H=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),R=/'/g,I=/"/g,V=/^(?:script|style|textarea|title)$/i,D=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),L=D(1),B=D(2),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,K=j.createTreeWalker(j,129,null,!1),J=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":"",n=U;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===U?"!--"===l[1]?n=M:void 0!==l[1]?n=N:void 0!==l[2]?(V.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=H):void 0!==l[3]&&(n=H):n===H?">"===l[0]?(n=null!=o?o:U,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?H:'"'===l[3]?I:R):n===I||n===R?n=H:n===M||n===N?n=U:(n=H,o=void 0);const h=n===H&&t[e+1].startsWith("/>")?" ":"";r+=n===U?i+O:c>=0?(s.push(a),i.slice(0,c)+"$lit$"+i.slice(c)+k+h):i+k+(-2===c?(s.push(void 0),e):h)}const a=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==S?S.createHTML(a):a,s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[l,c]=J(t,e);if(this.el=Z.createElement(l,i),K.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=K.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(k)){const i=c[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(k),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?tt:"?"===e[1]?it:"@"===e[1]?st:X})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(V.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),K.nextNode(),a.push({type:2,index:++o});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const i=j.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){var o,r,n,a;if(e===q)return e;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const c=z(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(n=(a=i)._$Co)&&void 0!==n?n:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=Y(t,l._$AS(t,e.values),l,s)),e}class G{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:j).importNode(i,!0);K.currentNode=o;let r=K.nextNode(),n=0,a=0,l=s[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new Q(r,r.nextSibling,this,t):1===l.type?e=new l.ctor(r,l.name,l.strings,this,t):6===l.type&&(e=new ot(r,this,t)),this.u.push(e),l=s[++a]}n!==(null==l?void 0:l.index)&&(r=K.nextNode(),n++)}return o}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{constructor(t,e,i,s){var o;this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),z(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==q&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==W&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.p(i);else{const t=new G(o,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Z(t)),e}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Q(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class X{constructor(t,e,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=Y(this,t,e,0),r=!z(t)||t!==this._$AH&&t!==q,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Y(this,s[i+n],e,n),a===q&&(a=this._$AH[n]),r||(r=!z(a)||a!==this._$AH[n]),a===W?t=W:t!==W&&(t+=(null!=a?a:"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}const et=A?A.emptyScript:"";class it extends X{constructor(){super(...arguments),this.type=4}j(t){t&&t!==W?this.element.setAttribute(this.name,et):this.element.removeAttribute(this.name)}}class st extends X{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=Y(this,t,e,0))&&void 0!==i?i:W)===q)return;const s=this._$AH,o=t===W&&s!==W||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==W&&(s===W||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const rt=E.litHtmlPolyfillSupport;null==rt||rt(Z,Q),(null!==(w=E.litHtmlVersions)&&void 0!==w?w:E.litHtmlVersions=[]).push("2.6.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var nt,at;class lt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let n=r._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new Q(e.insertBefore(T(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return q}}lt.finalized=!0,lt._$litElement$=!0,null===(nt=globalThis.litElementHydrateSupport)||void 0===nt||nt.call(globalThis,{LitElement:lt});const ct=globalThis.litElementPolyfillSupport;null==ct||ct({LitElement:lt}),(null!==(at=globalThis.litElementVersions)&&void 0!==at?at:globalThis.litElementVersions=[]).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,ht=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function ut(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):ht(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function mt(t){return ut({...t,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pt;function vt(t,e=0){
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
return function(t){return!isNaN(parseFloat(t))&&!isNaN(Number(t))}(t)?Number(t):e}null===(pt=window.HTMLSlotElement)||void 0===pt||pt.prototype.assignedElements;var ft="1.0.0";console.groupCollapsed(`%c⚡ System Flow Card v${ft} is installed`,"color: #488fc2; font-weight: bold"),console.log("Readme:","https://github.com/scatari69/system-flow-card"),console.groupEnd();const gt=function(t,e,i){var s;return void 0===i&&(i=!1),function(){var o=[].slice.call(arguments),r=this,n=i&&!s;clearTimeout(s),s=setTimeout((function(){s=null,i||t.apply(r,o)}),e),n&&t.apply(r,o)}}((t=>{console.log(`%c⚡ System Flow Card v${ft} %cError: ${t}`,"color: #488fc2; font-weight: bold","color: #b33a3a; font-weight: normal")}),500),yt=(t,e,i=!1)=>({name:t,label:e,required:i,selector:{entity:{}}}),bt=[{name:"icon",label:"Icon",selector:{icon:{}}},{name:"color",label:"Color (hex or CSS color)",selector:{text:{}}},{name:"unit",label:"Display unit",selector:{text:{}}},{name:"invert",label:"Invert power direction",selector:{boolean:{}}}],$t=[yt("main","Main extra sensor"),yt("left","Left extra sensor"),yt("right","Right extra sensor")];let _t=class extends lt{constructor(){super(...arguments),this._error="",this.label=t=>t.label||t.name}setConfig(t){this._config=Object.assign(Object.assign({},t),{elements:t.elements||[]}),this._error=""}updateConfig(t){["top","bottom"].some((e=>t.elements.filter((t=>t.position===e)).length>2))?this._error="Only two sensors can be placed at the top or bottom. Choose another position.":(this._error="",this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0})))}updateElement(t,e){this._config&&this.updateConfig(Object.assign(Object.assign({},this._config),{elements:this._config.elements.map(((i,s)=>s===t?Object.assign(Object.assign({},i),e):i))}))}form(t,e,i){return L`<ha-form .hass=${this.hass} .data=${t} .schema=${e} .computeLabel=${this.label}
      @value-changed=${t=>{t.stopPropagation(),i(t.detail.value)}}></ha-form>`}extras(t,e){const i="string"==typeof t.extra?{main:t.extra}:t.extra||{};return L`<details><summary>Extra sensors</summary>${this.form(i,$t,(t=>e({extra:t})))}</details>`}appearance(t,e){return L`<label class="swatch">Pick a color
      <input type="color" aria-label="Pick node color" .value=${/^#[\da-f]{6}$/i.test(t.color||"")?t.color:"#65c8ff"}
        @input=${t=>e({color:t.target.value})}>
    </label>`}addElement(){var t;if(!this._config)return;const e=Object.keys((null===(t=this.hass)||void 0===t?void 0:t.states)||{}).find((t=>t.startsWith("sensor.")&&!this._config.elements.some((e=>"string"==typeof e.value?e.value===t:Object.values(e.value).includes(t)))))||"";this.updateConfig(Object.assign(Object.assign({},this._config),{elements:[...this._config.elements,{value:e,position:"right"}]}))}render(){if(!this._config||!this.hass)return L``;const t=this._config,e=t.system||{},i=t=>this.updateConfig(Object.assign(Object.assign({},this._config),{system:Object.assign(Object.assign({},this._config.system),t)}));return L`
      <p>Changes appear in the card preview. Save the card in Home Assistant to keep them.</p>
      ${this._error?L`<p class="error" role="alert">${this._error}</p>`:null}
      <section><h3>Card settings</h3>
        ${this.form(t,[{name:"title",label:"Title",selector:{text:{}}},{name:"speed",label:"Average travel time (seconds)",selector:{number:{min:.5,max:30,step:.5,mode:"box"}}},{name:"fadeIdylElements",label:"Fade idle sensors",selector:{boolean:{}}}],(e=>this.updateConfig(Object.assign(Object.assign({},t),e))))}
      </section>
      <details><summary>Central system node</summary>
        ${this.appearance(e,i)}
        ${this.form(e,[...bt,{name:"override",label:"Use a sensor instead of the calculated balance",selector:{boolean:{}}},...e.override?[yt("value","System value sensor",!0)]:[]],i)}
        ${this.extras(e,i)}
      </details>
      <h3>Sensors</h3>
      ${t.elements.map(((e,i)=>{var s;const o="string"!=typeof e.value,r=o?e.value.toSystem||e.value.fromSystem:e.value,n=(null===(s=this.hass.states[r||""])||void 0===s?void 0:s.attributes.friendly_name)||r||"New sensor",a=t=>this.updateElement(i,t);return L`<details class="sensor"><summary>${i+1}. ${n}</summary>
          <label class="split"><input type="checkbox" .checked=${o} @change=${t=>a({value:t.target.checked?{toSystem:e.value}:r||""})}>Separate production and consumption sensors</label>
          ${o?this.form(e.value,[yt("toSystem","Production sensor"),yt("fromSystem","Consumption sensor")],(t=>a({value:Object.assign(Object.assign({},e.value),t)}))):this.form({value:e.value},[yt("value","Power sensor",!0)],a)}
          ${this.appearance(e,a)}
          ${this.form(e,[{name:"position",label:"Position",required:!0,selector:{select:{options:["top","left","bottom","right"]}}},...bt,yt("fill","Fill level sensor (0–100%)"),{name:"exclude",label:"Exclude from system balance",selector:{boolean:{}}}],a)}
          ${this.extras(e,a)}
          <button class="remove" ?disabled=${1===t.elements.length} @click=${()=>this.updateConfig(Object.assign(Object.assign({},t),{elements:t.elements.filter(((t,e)=>e!==i))}))}>Remove sensor</button>
        </details>`}))}
      <button class="add" @click=${this.addElement}>+ Add sensor</button>
    `}};_t.styles=u`
    :host { display: block; color: var(--primary-text-color); }
    p { color: var(--secondary-text-color); line-height: 1.5; margin-top: 0; }
    h3 { font-size: 16px; margin: 20px 0 12px; }
    section, details { padding: 16px; border: 1px solid var(--divider-color, #8884); border-radius: 16px; margin-bottom: 12px; }
    details details { margin-top: 16px; margin-bottom: 0; }
    summary { cursor: pointer; font-weight: 600; overflow-wrap: anywhere; }
    details[open] > summary { margin-bottom: 16px; }
    ha-form { display: block; }
    label { display: flex; align-items: center; gap: 10px; line-height: 1.5; margin-bottom: 16px; }
    input[type=color] { width: 44px; height: 32px; padding: 2px; background: transparent; border: 1px solid var(--divider-color, #8884); border-radius: 8px; cursor: pointer; }
    input[type=checkbox] { width: 18px; height: 18px; flex-shrink: 0; accent-color: var(--primary-color); }
    button { font: inherit; color: var(--primary-color); background: transparent; border: 1px solid var(--divider-color, #8884); border-radius: 12px; padding: 10px 16px; cursor: pointer; }
    button:focus-visible, summary:focus-visible, input:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 3px; }
    button:disabled { opacity: .4; cursor: default; }
    .remove { margin-top: 16px; color: var(--error-color, #db4437); }
    .add { width: 100%; }
    .error { color: var(--error-color, #db4437); }
  `,t([ut({attribute:!1})],_t.prototype,"hass",void 0),t([mt()],_t.prototype,"_config",void 0),t([mt()],_t.prototype,"_error",void 0),_t=t([dt("system-flow-card-editor")],_t);let xt=class extends lt{constructor(){super(...arguments),this._config={},this.getEntity=t=>{const e=t?this.hass.states[t]:void 0;if(e&&e.state)return e;gt(`entity "${null!=t?t:"Unknown"}" is not available or misconfigured`)},this.previousDur={},this.getElementEntityId=t=>t.value?"string"==typeof t.value?t.value:t.value.toSystem||t.value.fromSystem||void 0:void 0,this.getElementEntity=t=>this.getEntity(this.getElementEntityId(t)),this.getElementIconId=t=>{if(t.icon)return t.icon;const e=this.getElementEntity(t);return e&&e?function(t){if(!t)return"mdi:bookmark";if(t.attributes.icon)return t.attributes.icon;var e=function(t){return t.substr(0,t.indexOf("."))}(t.entity_id);return e in n?n[e](t):o(e,t.state)}(e):"mdi:eye"},this.getElementColor=t=>t.color?t.color:"middle"===t.position?"var(--primary-color, #38bdf8)":"var(--secondary-text-color, #94a3b8)",this.getElementUnit=t=>t.unit||("middle"===t.position?void 0:this.getEntityUnit(this.getElementEntity(t))),this.getEntityUnit=t=>{const e="string"==typeof t?this.getEntity(t):t;if(e)return e.attributes.unit_of_measurement},this.displayValue=(t,e=!1,i=null,s=!1)=>{let o=t;if("string"==typeof o){const t=Number(o);Number.isNaN(t)||""===o.trim()||(o=t)}if(e&&"number"==typeof o&&(o=Math.abs(o)),"number"==typeof o){const t=10**("number"==typeof s?s:1);o=Math.round(o*t)/t}return i?`${o} ${i}`:o},this.getEntityValue=(t,e=!1,i=!1,s=!1)=>{const o="string"==typeof t?this.getEntity(t):t;if(!o)return;const r=null==o?void 0:o.state,n=i?this.getEntityUnit(o):null;return this.displayValue(r,e,n,s)},this.elementArrows=(t,e,i=null)=>{if(!t)return null;let s;switch(!0){case"top"===e&&t>0||"bottom"===e&&t<0:s="down";break;case"top"===e&&t<0||"bottom"===e&&t>0:s="up";break;case"left"===e&&t>0||"right"===e&&t<0:s="right";break;case"left"===e&&t<0||"right"===e&&t>0:s="left";break;default:s=""}return L`<ha-icon style="fill: ${i}; display: inline-block;" class="small" icon="mdi:arrow-${s}"></ha-icon>`},this.elementValueArrows=t=>L`
    <div class="value-row">
      ${void 0!==t.calculations.systemTotal?L`
          ${["left","middle"].includes(t.position)?null:this.elementArrows(t.calculations.systemTotal,t.position,this.getElementColor(t))}
          <span style="white-space: nowrap;">${this.displayValue(void 0!==t.display?t.display:t.calculations.systemTotal,"middle"!==t.position,this.getElementUnit(t),0)}</span>
          ${"left"===t.position?this.elementArrows(t.calculations.systemTotal,t.position,this.getElementColor(t)):null}
        `:null}
    </div>
  `,this.elementToHtml=(t,e=!1)=>{var i,s,o,r,n,a,l,c,d,h;return L`
    <div class="circle-container container-${t.position}" style="
      --node-color: ${this.getElementColor(t)};
      opacity: ${t.calculations.systemTotal||e||!(null===(i=this._config)||void 0===i?void 0:i.fadeIdylElements)?1:.4};
    ">
      <div class="circle">
        ${t.fill?L`<div class="fill-level" style="
            height: ${Math.min(100,Math.max(0,vt(this.getEntityValue(t.fill,!1,!1))))}%;
            position: absolute; width: 100%; bottom: 0px;
            background-color: ${this.getElementColor(t)};
            opacity: .25;
          "></div>`:null}


        ${"bottom"===t.position?this.elementValueArrows(t):L`<div class="value-row">${(null===(s=t.extra)||void 0===s?void 0:s.main)?this.getEntityValue(null===(o=t.extra)||void 0===o?void 0:o.main,!1,!0):" "}</div>`}


        <div class="icon-row">
          <span class="side-extra">${(null===(r=t.extra)||void 0===r?void 0:r.left)?this.getEntityValue(null===(n=t.extra)||void 0===n?void 0:n.left,!1,!0):" "}</span>
          <ha-icon style="width: 24px; height: 24px; fill: ${this.getElementColor(t)}" icon="${this.getElementIconId(t)}"></ha-icon>
          <span class="side-extra">${(null===(a=t.extra)||void 0===a?void 0:a.right)?this.getEntityValue(null===(l=t.extra)||void 0===l?void 0:l.right,!1,!0):" "}</span>
        </div>


        ${"bottom"===t.position?L`<div class="value-row">${(null===(c=t.extra)||void 0===c?void 0:c.main)?this.getEntityValue(null===(d=t.extra)||void 0===d?void 0:d.main,!1,!0):" "}</div>`:this.elementValueArrows(t)}
      </div>
      <span class="node-label">${"middle"===t.position?"System":(null===(h=this.getElementEntity(t))||void 0===h?void 0:h.attributes.friendly_name)||this.getElementEntityId(t)}</span>
    </div>
  `}}static getConfigElement(){return document.createElement("system-flow-card-editor")}static getStubConfig(t){return{speed:3,fadeIdylElements:!0,elements:[{value:Object.keys(t.states).find((e=>"power"===t.states[e].attributes.device_class))||Object.keys(t.states).find((t=>t.startsWith("sensor.")))||"",position:"top"}]}}setConfig(t){if(!t.elements||!t.elements.length)throw new Error("At least one entity must be defined");["top","bottom"].forEach((e=>{if(t.elements.filter((t=>t.position===e)).length>2)throw new Error(`Maximum 2 elements allowed in ${e} row.`)})),this._config=Object.assign(Object.assign({},t),{speed:Math.max(.5,vt(t.speed,5))})}getCardSize(){const t=this._config.elements||[],e=Math.max(1,...["left","right"].map((e=>t.filter((t=>t.position===e)).length)))+["top","bottom"].filter((e=>t.some((t=>t.position===e)))).length;return Math.ceil((112*e+36*(e-1)+64+(this._config.title?56:0))/50)}render(){var t,e,i,s,o,r,n,a,l,c;if(!this._config.elements||!this.hass)return L``;const{elements:d}=this._config;let h=0;const u=d.map((t=>{let e=0,i=null,s=0;const o=t.invert?-1:1;e="string"==typeof t.value?vt(this.getEntityValue(t.value))*o:vt(this.getEntityValue(t.value.toSystem)),"string"!=typeof t.value&&t.value.fromSystem&&(i=vt(this.getEntityValue(t.value.fromSystem))),s=e-(null!=i?i:0),t.exclude||(h-=s);const r="string"==typeof t.extra?{main:t.extra}:t.extra;return Object.assign(Object.assign({},t),{extra:r,calculations:{toSystem:e,fromSystem:i,systemTotal:s}})})),m="string"==typeof(null===(t=this._config.system)||void 0===t?void 0:t.extra)?{main:null===(e=this._config.system)||void 0===e?void 0:e.extra}:null===(i=this._config.system)||void 0===i?void 0:i.extra;let p;if((null===(s=this._config.system)||void 0===s?void 0:s.invert)&&(h*=-1),(null===(o=this._config.system)||void 0===o?void 0:o.override)&&(null===(r=this._config.system)||void 0===r?void 0:r.value)){const t=this.getEntity(this._config.system.value);t&&(p=t.state)}u.push(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({value:"system",display:p},(null===(n=this._config.system)||void 0===n?void 0:n.unit)?{unit:this._config.system.unit}:null),{icon:(null===(a=this._config.system)||void 0===a?void 0:a.icon)||"mdi:house"}),(null===(l=this._config.system)||void 0===l?void 0:l.extra)?{extra:this._config.system.extra}:null),(null===(c=this._config.system)||void 0===c?void 0:c.color)?{color:this._config.system.color}:null),{position:"middle",extra:m,calculations:{toSystem:h>0?h:0,fromSystem:h<0?h:0,systemTotal:h}}));const v={left:u.filter((t=>"left"===t.position)),top:u.filter((t=>"top"===t.position)),right:u.filter((t=>"right"===t.position)),bottom:u.filter((t=>"bottom"===t.position)),middle:u.filter((t=>"middle"===t.position))},f=v.top.length>0,g=v.bottom.length>0,y=Math.max(1,v.left.length,v.right.length),b={left:"left: var(--node-half); top: calc(var(--center-y) - var(--side-span) / 2); width: calc(50% - var(--node-size)); height: var(--side-span);",right:"left: calc(50% + var(--node-half)); top: calc(var(--center-y) - var(--side-span) / 2); width: calc(50% - var(--node-size)); height: var(--side-span);",top:"left: calc(50% - var(--vertical-span) / 2); top: var(--node-half); width: var(--vertical-span); height: calc(var(--center-y) - var(--node-size));",bottom:"left: calc(50% - var(--vertical-span) / 2); top: calc(var(--center-y) + var(--node-half)); width: var(--vertical-span); height: calc(100% - var(--center-y) - var(--node-size));"},$={left:(t,e)=>`M 100 ${e}   C 50 ${e}    50 ${t}    0 ${t}`,top:(t,e)=>`M ${e} 100   C ${e} 50    ${t} 50    ${t} 0`,right:(t,e)=>`M 0 ${e}     C 50 ${e}    50 ${t}    100 ${t}`,bottom:(t,e)=>`M ${e} 0     C ${e} 50    ${t} 50    ${t} 100`},_=u.filter((t=>0!==t.calculations.systemTotal)).reduce(((t,e)=>t+Math.abs(e.calculations.systemTotal)),0)/u.length,x=Object.fromEntries(["left","top","right","bottom"].map((t=>{const e=v[t];return[t,e.map(((i,s)=>{var o,r;const n=`flow-${t}-${s}`,a=1===e.length?50:s/(e.length-1)*100,l=$[t](a,50),c=i.calculations.systemTotal&&_?Math.min(12,Math.max(.75,this._config.speed/(Math.abs(i.calculations.systemTotal)/_))):0,d=null!==(r=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(`#${n}`))&&void 0!==r?r:null;return d&&c&&this.previousDur[n]&&this.previousDur[n]!==c&&(d.pauseAnimations(),d.setCurrentTime(d.getCurrentTime()*(c/this.previousDur[n])),d.unpauseAnimations()),this.previousDur[n]=c,{flowId:n,element:i,path:l,dur:c}}))]})));return L`
      <ha-card .header=${this._config.title}>
        <div class="card-content">
          <div class="flow-layout" style="
            grid-template-areas: ${f?"'. top .'":""} 'left middle right' ${g?"'. bottom .'":""};
            --middle-height: calc(var(--node-size) * ${y} + var(--row-gap) * ${y-1});
            --top-height: ${f?"calc(var(--node-size) + var(--row-gap))":"0px"};
          ">
            ${f?L`<div class="row top">${v.top.map((t=>this.elementToHtml(t)))}</div>`:null}
            <div class="col left">${v.left.map((t=>this.elementToHtml(t)))}</div>
            <div class="middle">${v.middle.map((t=>this.elementToHtml(t,!0)))}</div>
            <div class="col right">${v.right.map((t=>this.elementToHtml(t)))}</div>
            ${g?L`<div class="row bottom">${v.bottom.map((t=>this.elementToHtml(t)))}</div>`:null}
            <div class="lines" aria-hidden="true">
              ${w=x,E=(t,e)=>L`
                <svg xmlns="http://www.w3.org/2000/svg" style="${b[t]}" viewBox="0 0 100 100" preserveAspectRatio="none">
                  ${e.map((t=>{var e;return B`
                    <path d="${t.path}" stroke="${this.getElementColor(t.element)}" vector-effect="non-scaling-stroke" style="opacity: ${!t.element.calculations.systemTotal&&(null===(e=this._config)||void 0===e?void 0:e.fadeIdylElements)?.12:.3};"></path>
                    ${t.dur>0?B`
                      <svg viewBox="0 0 100 100" width="100" height="100" preserveAspectRatio="none" overflow="visible" id="${t.flowId}">
                        ${[0,1,2].map((e=>B`
                          <circle class="flow-particle" r="0.1" stroke="currentColor" stroke-width="3" vector-effect="non-scaling-stroke" style="color: ${this.getElementColor(t.element)}; fill: currentColor;">
                            <animateMotion dur="${t.dur}s" begin="${-e*t.dur/3}s" repeatCount="indefinite" calcMode="linear" path="${t.path}" keyPoints="${t.element.calculations.systemTotal>0?"1;0":"0;1"}" keyTimes="0;1" />
                          </circle>
                        `))}
                      </svg>`:null}

                  `}))}
                </svg>
              `,Object.keys(w).map((t=>E(t,w[t])))}
            </div>
          </div>
        </div>
      </ha-card>
    `;var w,E}};xt.styles=u`
    :host {
      --mdc-icon-size: 24px;
      --node-size: clamp(80px, 20cqi, 112px);
      --row-gap: 36px;
      --column-gap: 8px;
      display: block;
      container-type: inline-size;
    }
    ha-card {
      display: block;
      overflow: hidden;
      background: var(--ha-card-background, var(--card-background-color, #101722));
      border: 1px solid var(--divider-color, #ffffff14);
      border-radius: 28px;
      box-shadow: 0 12px 40px #0000000d;
      color: var(--primary-text-color);
    }
    ha-card::part(header) { font-weight: 600; letter-spacing: -.03em; }
    .card-content {
      --node-half: calc(var(--node-size) / 2);
      position: relative;
      padding: 28px 16px 34px !important;
      background: radial-gradient(ellipse at center, color-mix(in srgb, var(--primary-color, #38bdf8) 6%, transparent), transparent 65%);
      isolation: isolate;
    }
    .flow-layout {
      position: relative;
      display: grid;
      grid-template-columns: var(--node-size) minmax(0, 1fr) var(--node-size);
      gap: var(--row-gap) var(--column-gap);
      --center-y: calc(var(--top-height) + var(--middle-height) / 2);
      --side-span: max(20px, calc(var(--middle-height) - var(--node-size)));
      --vertical-span: max(20px, calc(100% - 3 * var(--node-size) - 2 * var(--column-gap)));
    }
    .top { grid-area: top; }
    .bottom { grid-area: bottom; }
    .left { grid-area: left; }
    .right { grid-area: right; }
    .middle { grid-area: middle; min-height: var(--middle-height); display: flex; align-items: center; justify-content: center; }
    .row { display: flex; justify-content: space-between; gap: var(--column-gap); }
    .row:has(> :only-child) { justify-content: center; }
    .col { display: flex; flex-direction: column; justify-content: space-between; gap: var(--row-gap); }
    .col:has(> :only-child) { justify-content: center; }
    .circle-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: opacity .4s ease;
      z-index: 1;
    }
    .circle {
      width: var(--node-size);
      height: var(--node-size);
      border-radius: 23px;
      border: 1px solid color-mix(in srgb, var(--node-color) 32%, transparent);
      background: color-mix(in srgb, var(--node-color) 7%, var(--ha-card-background, var(--card-background-color, #101722)));
      box-shadow: inset 0 1px 0 #ffffff0a, 0 6px 18px #0000000a;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 9px 3px;
      box-sizing: border-box;
      align-items: center;
      text-align: center;
      font-size: clamp(11px, 2.8cqi, 15px);
      line-height: 1.2;
      position: relative;
      color: var(--primary-text-color);
      transition: border-color .3s ease, box-shadow .3s ease, transform .3s ease;
    }
    .container-middle .circle {
      border-radius: 50%;
      border-color: color-mix(in srgb, var(--node-color) 60%, transparent);
      box-shadow: 0 0 0 6px color-mix(in srgb, var(--node-color) 5%, transparent), 0 0 32px color-mix(in srgb, var(--node-color) 12%, transparent);
    }
    @media (hover: hover) {
      .circle:hover { transform: translateY(-3px); border-color: var(--node-color); box-shadow: 0 8px 28px color-mix(in srgb, var(--node-color) 16%, transparent); }
    }
    .value-row { display: flex; align-items: center; justify-content: center; width: 100%; min-height: 14px; white-space: nowrap; font-variant-numeric: tabular-nums; z-index: 1; }
    .value-row:has(span) { font-weight: 650; letter-spacing: -.03em; }
    .icon-row { display: flex; align-items: center; justify-content: center; width: 100%; z-index: 1; }
    .icon-row ha-icon { color: var(--node-color); }
    ha-icon.small { --mdc-icon-size: 11px; color: var(--node-color); opacity: .7; }
    .side-extra { width: calc((100% - 24px) / 2); overflow: hidden; font-size: 9px; color: var(--secondary-text-color); overflow-wrap: anywhere; }
    .node-label { position: absolute; top: 100%; margin-top: 7px; max-width: calc(var(--node-size) + 10px); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 10px; font-weight: 500; letter-spacing: .02em; color: var(--secondary-text-color); }
    .fill-level { transition: height 1s ease; pointer-events: none; }
    .lines { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
    .lines > svg { position: absolute; overflow: visible; }
    path { stroke-width: 1.5; fill: none; opacity: .22; }
    .flow-particle { filter: drop-shadow(0 0 2px currentColor); }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { transition: none !important; animation: none !important; }
      .flow-particle { display: none; }
      .circle:hover { transform: none; }
    }
    @container (max-width: 360px) {
      .card-content { --node-size: clamp(56px, 20cqi, 72px); --row-gap: 30px; --column-gap: 2px; }
      .card-content { padding: 28px 8px 34px !important; }
      .circle { border-radius: 18px; font-size: 10px; }
      .side-extra { font-size: 8px; }
    }
  `,t([ut({attribute:!1})],xt.prototype,"hass",void 0),t([mt()],xt.prototype,"_config",void 0),xt=t([dt("system-flow-card")],xt);const wt=window;wt.customCards=wt.customCards||[],wt.customCards.push({type:"system-flow-card",name:"System Flow Card — Modern",description:"Animated system flow with a visual editor and an adaptive layout",documentationURL:"https://github.com/scatari69/system-flow-card#readme"});export{xt as SystemFlowCard};
