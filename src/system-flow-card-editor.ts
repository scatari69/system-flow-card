import { HomeAssistant } from "custom-card-helpers";
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { SystemFlowCardConfig } from "./system-flow-card-config.js";
import { ElementDef, SystemElementDef } from "./type.js";

const entityField = (name: string, label: string, required = false) => ({
  name, label, required, selector: { entity: {} },
});
const appearanceSchema = [
  { name: "icon", label: "Icon", selector: { icon: {} } },
  { name: "color", label: "Color (hex or CSS color)", selector: { text: {} } },
  { name: "unit", label: "Display unit", selector: { text: {} } },
  { name: "invert", label: "Invert power direction", selector: { boolean: {} } },
];
const extraSchema = [
  entityField("main", "Main extra sensor"),
  entityField("left", "Left extra sensor"),
  entityField("right", "Right extra sensor"),
];

@customElement("system-flow-card-editor")
export class SystemFlowCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: SystemFlowCardConfig;
  @state() private _error = "";

  public setConfig(config: SystemFlowCardConfig): void {
    this._config = { ...config, elements: config.elements || [] };
    this._error = "";
  }

  private label = (schema: { label?: string; name: string }): string => schema.label || schema.name;

  private updateConfig(config: SystemFlowCardConfig): void {
    if (["top", "bottom"].some(position => config.elements.filter(element => element.position === position).length > 2)) {
      this._error = "Only two sensors can be placed at the top or bottom. Choose another position.";
      return;
    }
    this._error = "";
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config }, bubbles: true, composed: true,
    }));
  }

  private updateElement(index: number, patch: Partial<ElementDef>): void {
    if (!this._config) return;
    this.updateConfig({ ...this._config, elements: this._config.elements.map((element, i) => i === index ? { ...element, ...patch } : element) });
  }

  private form(data: object, schema: object[], changed: (value: any) => void) {
    return html`<ha-form .hass=${this.hass} .data=${data} .schema=${schema} .computeLabel=${this.label}
      @value-changed=${(event: CustomEvent) => { event.stopPropagation(); changed(event.detail.value); }}></ha-form>`;
  }

  private extras(element: Pick<SystemElementDef, "extra">, changed: (patch: Partial<SystemElementDef>) => void) {
    const extra = typeof element.extra === "string" ? { main: element.extra } : element.extra || {};
    return html`<details><summary>Extra sensors</summary>${this.form(extra, extraSchema, value => changed({ extra: value }))}</details>`;
  }

  private appearance(element: Pick<SystemElementDef, "color">, changed: (patch: Partial<SystemElementDef>) => void) {
    return html`<label class="swatch">Pick a color
      <input type="color" aria-label="Pick node color" .value=${/^#[\da-f]{6}$/i.test(element.color || "") ? element.color! : "#65c8ff"}
        @input=${(event: Event) => changed({ color: (event.target as HTMLInputElement).value })}>
    </label>`;
  }

  private addElement(): void {
    if (!this._config) return;
    const value = Object.keys(this.hass?.states || {}).find(id => id.startsWith("sensor.") && !this._config!.elements.some(element => typeof element.value === "string" ? element.value === id : Object.values(element.value).includes(id))) || "";
    this.updateConfig({ ...this._config, elements: [...this._config.elements, { value, position: "right" }] });
  }

  protected render() {
    if (!this._config || !this.hass) return html``;
    const config = this._config;
    const system = config.system || {};
    const updateSystem = (patch: Partial<SystemElementDef>) => this.updateConfig({ ...this._config!, system: { ...this._config!.system, ...patch } });
    return html`
      <p>Changes appear in the card preview. Save the card in Home Assistant to keep them.</p>
      ${this._error ? html`<p class="error" role="alert">${this._error}</p>` : null}
      <section><h3>Card settings</h3>
        ${this.form(config, [
          { name: "title", label: "Title", selector: { text: {} } },
          { name: "speed", label: "Average travel time (seconds)", selector: { number: { min: 0.5, max: 30, step: 0.5, mode: "box" } } },
          { name: "fadeIdylElements", label: "Fade idle sensors", selector: { boolean: {} } },
        ], value => this.updateConfig({ ...config, ...value }))}
      </section>
      <details><summary>Central system node</summary>
        ${this.appearance(system, updateSystem)}
        ${this.form(system, [
          ...appearanceSchema,
          { name: "override", label: "Use a sensor instead of the calculated balance", selector: { boolean: {} } },
          ...(system.override ? [entityField("value", "System value sensor", true)] : []),
        ], updateSystem)}
        ${this.extras(system, updateSystem)}
      </details>
      <h3>Sensors</h3>
      ${config.elements.map((element, index) => {
        const split = typeof element.value !== "string";
        const entityId = split ? (element.value as { toSystem?: string; fromSystem?: string }).toSystem || (element.value as { fromSystem?: string }).fromSystem : element.value as string;
        const name = this.hass.states[entityId || ""]?.attributes.friendly_name || entityId || "New sensor";
        const change = (patch: Partial<ElementDef>) => this.updateElement(index, patch);
        return html`<details class="sensor"><summary>${index + 1}. ${name}</summary>
          <label class="split"><input type="checkbox" .checked=${split} @change=${(event: Event) => change({ value: (event.target as HTMLInputElement).checked ? { toSystem: element.value as string } : entityId || "" })}>Separate production and consumption sensors</label>
          ${split ? this.form(element.value as object, [entityField("toSystem", "Production sensor"), entityField("fromSystem", "Consumption sensor")], value => change({ value: { ...element.value as object, ...value } })) : this.form({ value: element.value }, [entityField("value", "Power sensor", true)], change)}
          ${this.appearance(element, change)}
          ${this.form(element, [
            { name: "position", label: "Position", required: true, selector: { select: { options: ["top", "left", "bottom", "right"] } } },
            ...appearanceSchema,
            entityField("fill", "Fill level sensor (0–100%)"),
            { name: "exclude", label: "Exclude from system balance", selector: { boolean: {} } },
          ], change)}
          ${this.extras(element, change)}
          <button class="remove" ?disabled=${config.elements.length === 1} @click=${() => this.updateConfig({ ...config, elements: config.elements.filter((_, i) => i !== index) })}>Remove sensor</button>
        </details>`;
      })}
      <button class="add" @click=${this.addElement}>+ Add sensor</button>
    `;
  }

  static styles = css`
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
  `;
}
