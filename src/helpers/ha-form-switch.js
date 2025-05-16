import { html, LitElement, css } from 'lit';
import { styles } from '../card.styles';


export class DialogBox extends LitElement {
    _params;
    _textField;

    showDialog(params) {
        this._params = params;
    }
    
    closeDialog() {
        if (this._params?.confirmation || this._params?.prompt) {
          return false;
        }
        if (this._params) {
          this._dismiss();
          return true;
        }
        return true;
    }
    render() {
        if (!this.hass) {
            return html``;
        }
        if (!this._params) {
          return;
        }
    
        const confirmPrompt = this._params.confirmation || this._params.prompt;
    
        return html`
          <ha-dialog
            open
            ?scrimClickAction=${confirmPrompt}
            ?escapeKeyAction=${confirmPrompt}
            @closed=${this._dialogClosed}
            defaultAction="ignore"
            .heading=${html`${this._params.warning
              ? html`<ha-svg-icon
                  .path=${mdiAlertOutline}
                  style="color: var(--warning-color)"
                ></ha-svg-icon> `
              : ""}${this._params.title
              ? this._params.title
              : this._params.confirmation &&
                this.hass.localize(
                  "ui.dialogs.generic.default_confirmation_title"
                )}`}
          >
            <div>
              ${this._params.text
                ? html`
                    <p class=${this._params.prompt ? "no-bottom-padding" : ""}>
                      ${this._params.text}
                    </p>
                  `
                : ""}
              ${this._params.prompt
                ? html`
                    <ha-textfield
                      dialogInitialFocus
                      value=${ifDefined(this._params.defaultValue)}
                      .placeholder=${this._params.placeholder}
                      .label=${this._params.inputLabel
                        ? this._params.inputLabel
                        : ""}
                      .type=${this._params.inputType
                        ? this._params.inputType
                        : "text"}
                      .min=${this._params.inputMin}
                      .max=${this._params.inputMax}
                    ></ha-textfield>
                  `
                : ""}
            </div>
            ${confirmPrompt &&
            html`
              <mwc-button
                @click=${this._dismiss}
                slot="secondaryAction"
                ?dialogInitialFocus=${!this._params.prompt &&
                this._params.destructive}
              >
                ${this._params.dismissText
                  ? this._params.dismissText
                  : this.hass.localize("ui.dialogs.generic.cancel")}
              </mwc-button>
            `}
            <mwc-button
              @click=${this._confirm}
              ?dialogInitialFocus=${!this._params.prompt &&
              !this._params.destructive}
              slot="primaryAction"
              class=${classMap({
                destructive: this._params.destructive || false,
              })}
            >
              ${this._params.confirmText
                ? this._params.confirmText
                : this.hass.localize("ui.dialogs.generic.ok")}
            </mwc-button>
          </ha-dialog>
        `;
    }

    _dismiss() {
        if (this._params?.cancel) {
          this._params.cancel();
        }
        this._close();
    }
    _confirm() {
        if (this._params?.confirm) {
          this._params?.confirm(this._textField?.value);
        }
        this._close();
    }
    _dialogClosed(ev) {
        if (ev.detail.action === "ignore") {
          return;
        }
        this._dismiss();
    }
    _close() {
        if (!this._params) {
          return;
        }
        this._params = undefined;


        const event = new Event("dialog-closed", {
            detail: { dialog: this.localName },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);


        //fireEvent(this, "dialog-closed", { dialog: this.localName });
    }

    static get styles() {
        return css`
          :host([inert]) {
            pointer-events: initial !important;
            cursor: initial !important;
          }
          a {
            color: var(--primary-color);
          }
          p {
            margin: 0;
            color: var(--primary-text-color);
          }
          .no-bottom-padding {
            padding-bottom: 0;
          }
          .secondary {
            color: var(--secondary-text-color);
          }
          .destructive {
            --mdc-theme-primary: var(--error-color);
          }
          ha-dialog {
            /* Place above other dialogs */
            --dialog-z-index: 104;
          }
          @media all and (min-width: 600px) {
            ha-dialog {
              --mdc-dialog-min-width: 400px;
            }
          }
          ha-textfield {
            width: 100%;
          }
        `;
      }
}

if(!customElements.get("dialog-box")){
    customElements.define("dialog-box", DialogBox);
}

export class HaFormLabel extends LitElement {
    static styles = [styles];

    schema = {};
    data;
    label;
    disabled = false;
    computeLabel;
    color;
    /**
     * Get properties
     *
     * @return {Object}
     */
    static get properties() {
        return {
            data: { type: Object },
            schema: { type: Object },
            disabled: { type: Boolean },
            name: { type: String },
            label: { type: String }
        }
    }
    render() {
        if (!this.hass) {
            return html``;
        }
        this.color = this.schema?.color;
        this.label = this.schema?.label ?? this.data ?? '';
        //this.label = this.label ?? (this.computeLabel ? this.computeLabel(this.schema,this.data) : this.schema ? this.schema.name : "");
        return html`
            <ha-label style=${this.color ? `--color: ${this.color}` : ""}>
                ${this.schema?.icon
                ? html`<ha-icon slot="icon" .icon=${this.schema?.icon}></ha-icon>`
                : ''}
                ${this.label ?? ''}
            </ha-label>
            `;
    }
}
export class HaFormSwitch extends LitElement {

    static styles = [styles];

    schema = {};
    data;
    label;
    disabled = false;
    computeLabel;
     /**
     * Get properties
     *
     * @return {Object}
     */
     static get properties() {
        return {
            data: { type: Object },
            schema: { type: Object },
            disabled: { type: Boolean },
            name: { type: String },
            label: { type: String }
        }
    }
    updated(_changedProperties){

        //alert("HaFormSwitch updated d");
    }
    render() {
        if (!this.hass) {
            return html``;
        }



        
        this.label= (this.computeLabel ? this.computeLabel(this.schema,this.data) : this.schema ? this.schema.name : "");



       
        return html`
        
        
        <mwc-formfield .label="${this.label}">
            <ha-switch
            .name=${this.schema?.name ?? ''}
            .label=${this.label}
            .computeLabel=${this.computeLabel}
            .checked=${this.data}
            .disabled=${this.disabled}
            @change=${this._valueChanged}
            ></ha-switch>
        </mwc-formfield>
        `;
    }
    getValue(obj, item) {
        return (obj ? (!item.name ? obj : obj[item.name]) : null);
    }
    _valueChanged(ev) {
        //this[`_${ev.target.name}`] = ev.target.checked;
        //{ value: ev.target.checked }
        //value-changed
        //const event = new CustomEvent("config-changed", {
        const event = new CustomEvent("value-changed", {
            detail: { value: ev.target.checked },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);

        //dispatchEvent
    }
}

