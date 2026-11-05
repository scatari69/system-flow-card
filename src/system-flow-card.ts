/* eslint-disable no-nested-ternary */
import { HomeAssistant, stateIcon } from "custom-card-helpers";
import { HassEntity } from 'home-assistant-js-websocket';
import { css, html, LitElement, svg, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { SystemFlowCardConfig } from "./system-flow-card-config.js";
import {
  coerceNumber,
} from "./utils.js";
import { logError } from "./logging.js";
import { CalculatedElementDef } from "./type.js";
import "./system-flow-card-editor.js";


@customElement("system-flow-card")
export class SystemFlowCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config = {} as SystemFlowCardConfig;

  public static getConfigElement(): HTMLElement {
    return document.createElement("system-flow-card-editor");
  }

  public static getStubConfig(hass: HomeAssistant): Partial<SystemFlowCardConfig> {
    const value = Object.keys(hass.states).find(id => hass.states[id].attributes.device_class === "power")
      || Object.keys(hass.states).find(id => id.startsWith("sensor.")) || "";
    return { speed: 3, fadeIdylElements: true, elements: [{ value, position: "top" }] };
  }

  setConfig(config: SystemFlowCardConfig): void {
    if (!config.elements || (!config.elements.length)) {
      throw new Error("At least one entity must be defined");
    }
    ['top', 'bottom'].forEach(position => {
      if (config.elements.filter(element => element.position === position).length > 2) {
        throw new Error(`Maximum 2 elements allowed in ${position} row.`);
      }
    })
    this._config = {
      ...config,
      speed: Math.max(0.5, coerceNumber(config.speed, 5)),
    }
  }

  public getCardSize(): Promise<number> | number {
    const elements = this._config.elements || [];
    const rows = Math.max(1, ...['left', 'right'].map(position => elements.filter(element => element.position === position).length))
      + ['top', 'bottom'].filter(position => elements.some(element => element.position === position)).length;
    return Math.ceil((rows * 112 + (rows - 1) * 36 + 64 + (this._config.title ? 56 : 0)) / 50);
  }

  private getEntity = (entityId: string | undefined | null):  HassEntity | undefined => {
    const entity = entityId ? this.hass.states[entityId] : undefined;
    if (!entity || !entity.state) {
      logError(`entity "${entityId ?? "Unknown"}" is not available or misconfigured`);
      return undefined;
    }
    return entity;
  }

  private previousDur: { [name: string]: number } = {};

  private getElementEntityId  = (element: CalculatedElementDef): string | undefined =>
    element.value
      ? typeof element.value === 'string'
        ? element.value
        : element.value.toSystem || element.value.fromSystem || undefined
      : undefined;

  private getElementEntity = (element: CalculatedElementDef): HassEntity | undefined =>
    this.getEntity(this.getElementEntityId(element))

  private getElementIconId = (element: CalculatedElementDef): string => {
    if(element.icon) return element.icon;
    const entity = this.getElementEntity(element);
    if (!entity) return 'mdi:eye';
    return entity ? stateIcon(entity) : 'mdi:eye';
  }

  private getElementColor = (element: CalculatedElementDef): string => {
    if(!element.color) return element.position === 'middle' ? 'var(--primary-color, #38bdf8)' : 'var(--secondary-text-color, #94a3b8)';
    return element.color;
  }

  private getElementUnit = (element: CalculatedElementDef): string | undefined =>
    element.unit || (element.position === 'middle' ? undefined : this.getEntityUnit(this.getElementEntity(element)))

  private getEntityUnit = (ent: HassEntity | string | undefined) => {
    const entity = typeof ent === 'string' ? this.getEntity(ent) : ent;
    if(!entity) return undefined;
    return entity.attributes.unit_of_measurement;
  }

  private displayValue = (val: any, abs: boolean = false, unit: string | null = null, places: number | boolean = false): number | string | undefined => {
    let value = val;

    // 1. SMART CHECK: Only convert to number if it is PURELY numeric.
    // "23.456" -> Becomes Number(23.456) -> Gets rounded.
    // "8R/Z"   -> Becomes NaN            -> Stays "8R/Z" (Text preserved).
    if (typeof value === 'string') {
      const numberValue = Number(value);
      if (!Number.isNaN(numberValue) && value.trim() !== '') {
        value = numberValue;
      }
    }

    // 2. Handle Absolute Value
    if (abs && typeof value === 'number') {
      value = Math.abs(value);
    }

    // 3. Rounding Logic (Only for valid numbers)
    if (typeof value === 'number') {
      // Default to 1 decimal place if 'places' is strictly false/undefined
      const prec = typeof places === 'number' ? places : 1;
      const factor = 10 ** prec;
      value = Math.round(value * factor) / factor;
    }

    // 4. Append Unit
    if (unit) {
      return `${value} ${unit}`;
    }
    return value;
  }

  private getEntityValue = (ent: HassEntity | string | undefined, abs: boolean = false, showUnit: boolean = false, places: number | boolean = false): number | string | undefined => {
    const entity = typeof ent === 'string' ? this.getEntity(ent) : ent;
    if(!entity) return undefined;
    const value = entity?.state;
    const unit = showUnit ? this.getEntityUnit(entity) : null;
    return this.displayValue(value, abs, unit, places);
  }

  private elementArrows = (value: number, position: string, fill: string | null = null) => {
    if (!value) return null;
    let direction: string;
    switch (true) {
      case (position === 'top' && value > 0 || position === 'bottom' && value < 0): direction = 'down'; break;
      case (position === 'top' && value < 0 || position === 'bottom' && value > 0): direction = 'up'; break;
      case (position === 'left' && value > 0 || position === 'right' && value < 0): direction = 'right'; break;
      case (position === 'left' && value < 0 || position === 'right' && value > 0): direction = 'left'; break;
      default: direction = '';
    }
    return html`<ha-icon style="fill: ${fill}; display: inline-block;" class="small" icon="mdi:arrow-${direction}"></ha-icon>`;
  }

  private elementValueArrows = (element: CalculatedElementDef) => html`
    <div class="value-row">
      ${element.calculations.systemTotal !== undefined
        ? html`
          ${!['left', 'middle'].includes(element.position) ? this.elementArrows(element.calculations.systemTotal, element.position, this.getElementColor(element)) : null}
          <span style="white-space: nowrap;">${this.displayValue(
              (element as any).display !== undefined ? (element as any).display : element.calculations.systemTotal,
              element.position !== 'middle',
              this.getElementUnit(element),
              0
            )}</span>
          ${element.position === 'left' ? this.elementArrows(element.calculations.systemTotal, element.position, this.getElementColor(element)) : null}
        ` : null
      }
    </div>
  `

  private elementToHtml = (element: CalculatedElementDef, preventFade: boolean = false) => html`
    <div class="circle-container container-${element.position}" style="
      --node-color: ${this.getElementColor(element)};
      opacity: ${!element.calculations.systemTotal && !preventFade && this._config?.fadeIdylElements ? .4 : 1};
    ">
      <div class="circle">
        ${element.fill ? (
          html`<div class="fill-level" style="
            height: ${Math.min(100, Math.max(0, coerceNumber(this.getEntityValue(element.fill, false, false))))}%;
            position: absolute; width: 100%; bottom: 0px;
            background-color: ${this.getElementColor(element)};
            opacity: .25;
          "></div>`
        ) : null}


        ${element.position === 'bottom'
          ? this.elementValueArrows(element)
          : html`<div class="value-row">${element.extra?.main ? this.getEntityValue(element.extra?.main, false, true) : ' '}</div>`
        }


        <div class="icon-row">
          <span class="side-extra">${element.extra?.left ? this.getEntityValue(element.extra?.left, false, true) : ' '}</span>
          <ha-icon style="width: 24px; height: 24px; fill: ${this.getElementColor(element)}" icon="${this.getElementIconId(element)}"></ha-icon>
          <span class="side-extra">${element.extra?.right ? this.getEntityValue(element.extra?.right, false, true) : ' '}</span>
        </div>


        ${element.position === 'bottom'
          ? html`<div class="value-row">${element.extra?.main ? this.getEntityValue(element.extra?.main, false, true) : ' '}</div>`
          : this.elementValueArrows(element)
        }
      </div>
      <span class="node-label">${element.position === 'middle' ? 'System' : this.getElementEntity(element)?.attributes.friendly_name || this.getElementEntityId(element)}</span>
    </div>
  `

  protected render(): TemplateResult {
    if (!this._config.elements || !this.hass) return html``;

    const { elements: configElements } = this._config;
    let systemPower = 0;
    const elements = configElements.map((element) : CalculatedElementDef => {
      let toSystem = 0;
      let fromSystem: number | null = null;
      let systemTotal = 0;
      const multiplier = element.invert ? -1 : 1;
      toSystem = typeof element.value === "string"
        ? coerceNumber(this.getEntityValue(element.value)) * multiplier
        : coerceNumber(this.getEntityValue(element.value.toSystem))
      if (typeof element.value !== "string" && element.value.fromSystem) {
        fromSystem = coerceNumber(this.getEntityValue(element.value.fromSystem));
      }
      systemTotal = toSystem - (fromSystem ?? 0)
      if(!element.exclude) systemPower -= systemTotal;
      const extra = typeof element.extra === "string" ? { main: element.extra } : element.extra
      return { ...element, extra, calculations: { toSystem, fromSystem, systemTotal } }
    });

    const extra = typeof this._config.system?.extra === "string" ? { main: this._config.system?.extra } : this._config.system?.extra

    // [CUSTOM FIX] Allow inverting the central System value via config
    if ((this._config.system as any)?.invert) {
      systemPower *= -1;
    }

    // [CUSTOM FIX] Allow overriding the system display value with a specific entity
    // FIX: We explicitly tell TypeScript this variable can be a 'string' or 'undefined'
    let systemDisplayOverride: string | undefined;

    if ((this._config.system as any)?.override && (this._config.system as any)?.value) {
      const overrideEntity = this.getEntity((this._config.system as any).value);
      if (overrideEntity) {
        systemDisplayOverride = overrideEntity.state;
      }
    }

    elements.push({
      value: 'system',
      display: systemDisplayOverride, // Now valid because we updated type.ts
      ...(this._config.system?.unit ? { unit: this._config.system.unit } : null),
      icon: this._config.system?.icon || 'mdi:house',
      ...(this._config.system?.extra ? { extra: this._config.system.extra } : null),
      ...(this._config.system?.color ? { color: this._config.system.color } : null),
      position: 'middle',
      extra,
      calculations: { toSystem: systemPower > 0 ? systemPower : 0, fromSystem: systemPower < 0 ? systemPower : 0, systemTotal: systemPower },
    })

    const elementsByPosition = {
      left: elements.filter(element => element.position === 'left'),
      top: elements.filter(element => element.position === 'top'),
      right: elements.filter(element => element.position === 'right'),
      bottom: elements.filter(element => element.position === 'bottom'),
      middle: elements.filter(element => element.position === 'middle')
    };

    const hasTop = elementsByPosition.top.length > 0;
    const hasBottom = elementsByPosition.bottom.length > 0;
    const sideRows = Math.max(1, elementsByPosition.left.length, elementsByPosition.right.length);
    const svgBoxStylesByPosition = {
      left: 'left: var(--node-half); top: calc(var(--center-y) - var(--side-span) / 2); width: calc(50% - var(--node-size)); height: var(--side-span);',
      right: 'left: calc(50% + var(--node-half)); top: calc(var(--center-y) - var(--side-span) / 2); width: calc(50% - var(--node-size)); height: var(--side-span);',
      top: 'left: calc(50% - var(--vertical-span) / 2); top: var(--node-half); width: var(--vertical-span); height: calc(var(--center-y) - var(--node-size));',
      bottom: 'left: calc(50% - var(--vertical-span) / 2); top: calc(var(--center-y) + var(--node-half)); width: var(--vertical-span); height: calc(100% - var(--center-y) - var(--node-size));',
    }

    const svgLineMapByPosition = {
      // FIX: Remove all commas from the path 'd' attribute. Use spaces only.
      'left':   (pc, ipc)  => `M 100 ${ipc}   C 50 ${ipc}    50 ${pc}    0 ${pc}`,
      'top':    (pc, ipc)  => `M ${ipc} 100   C ${ipc} 50    ${pc} 50    ${pc} 0`,
      'right':  (pc, ipc)  => `M 0 ${ipc}     C 50 ${ipc}    50 ${pc}    100 ${pc}`,
      'bottom': (pc, ipc)  => `M ${ipc} 0     C ${ipc} 50    ${pc} 50    ${pc} 100`,
    };

    const avgSystemTotal = elements
      .filter(element => element.calculations.systemTotal !== 0)
      .reduce((prev, element) => prev + Math.abs(element.calculations.systemTotal), 0)
      / elements.length;

    const lineCalcs = Object.fromEntries(['left', 'top', 'right', 'bottom'].map(position => {
      const theseElements = elementsByPosition[position];
      return [position, theseElements.map((element, index) => {
        const flowId: string = `flow-${position}-${index}`;
        const pc = theseElements.length === 1 ? 50 : index / (theseElements.length - 1) * 100;
        const ipc = 50;
        const path = svgLineMapByPosition[position](pc, ipc)
        const dur = element.calculations.systemTotal && avgSystemTotal
          ? Math.min(12, Math.max(0.75, (this._config.speed) / (Math.abs(element.calculations.systemTotal) / avgSystemTotal)))
          : 0

        const flowSVGElement = (this.renderRoot?.querySelector(`#${flowId}`) ?? null) as SVGSVGElement;
        if (flowSVGElement && dur && this.previousDur[flowId] && this.previousDur[flowId] !== dur) {
          flowSVGElement.pauseAnimations();
          flowSVGElement.setCurrentTime(flowSVGElement.getCurrentTime() * (dur / this.previousDur[flowId]));
          flowSVGElement.unpauseAnimations();
        }
        this.previousDur[flowId] = dur;
        return { flowId, element, path, dur }
      })];
    }));

    const objectMap = (obj, fn) => Object.keys(obj).map(key => fn(key, obj[key]))

    return html`
      <ha-card .header=${this._config.title}>
        <div class="card-content">
          <div class="flow-layout" style="
            grid-template-areas: ${hasTop ? "'. top .'" : ''} 'left middle right' ${hasBottom ? "'. bottom .'" : ''};
            --middle-height: calc(var(--node-size) * ${sideRows} + var(--row-gap) * ${sideRows - 1});
            --top-height: ${hasTop ? 'calc(var(--node-size) + var(--row-gap))' : '0px'};
          ">
            ${hasTop ? html`<div class="row top">${elementsByPosition.top.map(element => this.elementToHtml(element))}</div>` : null}
            <div class="col left">${elementsByPosition.left.map(element => this.elementToHtml(element))}</div>
            <div class="middle">${elementsByPosition.middle.map(element => this.elementToHtml(element, true))}</div>
            <div class="col right">${elementsByPosition.right.map(element => this.elementToHtml(element))}</div>
            ${hasBottom ? html`<div class="row bottom">${elementsByPosition.bottom.map(element => this.elementToHtml(element))}</div>` : null}
            <div class="lines" aria-hidden="true">
              ${objectMap(lineCalcs, (pos, posLineCalcs) => html`
                <svg xmlns="http://www.w3.org/2000/svg" style="${svgBoxStylesByPosition[pos]}" viewBox="0 0 100 100" preserveAspectRatio="none">
                  ${posLineCalcs.map(posLineCalc => svg`
                    <path d="${posLineCalc.path}" stroke="${this.getElementColor(posLineCalc.element)}" vector-effect="non-scaling-stroke" style="opacity: ${!posLineCalc.element.calculations.systemTotal && this._config?.fadeIdylElements ? .12 : .3};"></path>
                    ${posLineCalc.dur > 0 ? svg`
                      <svg viewBox="0 0 100 100" width="100" height="100" preserveAspectRatio="none" overflow="visible" id="${posLineCalc.flowId}">
                        ${[0, 1, 2].map(index => svg`
                          <circle class="flow-particle" r="0.1" stroke="currentColor" stroke-width="3" vector-effect="non-scaling-stroke" style="color: ${this.getElementColor(posLineCalc.element)}; fill: currentColor;">
                            <animateMotion dur="${posLineCalc.dur}s" begin="${-index * posLineCalc.dur / 3}s" repeatCount="indefinite" calcMode="linear" path="${posLineCalc.path}" keyPoints="${posLineCalc.element.calculations.systemTotal > 0 ? '1;0' : '0;1'}" keyTimes="0;1" />
                          </circle>
                        `)}
                      </svg>` : null}

                  `)}
                </svg>
              `)}
            </div>
          </div>
        </div>
      </ha-card>
    `;}

  static styles = css`
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
  `;
}
/* ... footer code same as before ... */
const windowWithCards = window as unknown as Window & { customCards: unknown[]; };
windowWithCards.customCards = windowWithCards.customCards || [];
windowWithCards.customCards.push({
  type: "system-flow-card",
  name: "System Flow Card — Modern",
  description: "Animated system flow with a visual editor and an adaptive layout",
  documentationURL: "https://github.com/scatari69/system-flow-card#readme",
});
declare global { interface HTMLElementTagNameMap { "system-flow-card": SystemFlowCard; } }
