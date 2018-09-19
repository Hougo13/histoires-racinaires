import { html } from "hybrids";

export default {
  type: "text",
  placeholder: "",
  name: "",
  disabled: false,
  render: ({ type, placeholder, name, disabled }) => html`
    <style>
      :host {
        display: flex;
        flex-wrap: wrap;
      }

      :host:nost(:last-child) {
        margin-bottom: .4rem;
      }

      ::slotted(input) {
        box-sizing: border-box;
        appearance: none;
        background: #fff;
        background-image: none;
        border: .05rem solid #caced7;
        border-radius: .1rem;
        color: #50596c;
        display: block;
        font-size: .8rem;
        height: 1.8rem;
        line-height: 1.2rem;
        max-width: 100%;
        outline: none;
        padding: .25rem .4rem;
        position: relative;
        transition: all .2s ease;
        width: 100%;
      }
      
      ::slotted(input:focus) {
        border-color: #5755d9; 
        box-shadow: 0 0 0 .1rem rgba(87, 85, 217, .2);
      }

      ::slotted(input::placeholder) {
        color: #acb3c2;
      }

      ::slotted(input.sm) {
        font-size: .7rem;
        height: 1.4rem;
        padding: .05rem .3rem;
      }

      ::slotted(input.lg) {
        font-size: .9rem;
        height: 2rem;
        padding: .35rem .6rem;
      }

      ::slotted(input.inline) {
        display: inline-block;
        vertical-align: middle;
        width: auto;
      }

      ::slotted(input[type="file"]) {
        height: auto;
      }

      ::slotted(label) {
        display: block;
        line-height: 1.2rem;
        padding: .3rem 0;
      }
    </style>
    <slot></slot>
  `
};
