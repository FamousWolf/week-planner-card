import { html, LitElement } from 'lit';
import styles from '../card.styles';
export class HaFormSwitch extends LitElement {

    static styles = styles;

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

