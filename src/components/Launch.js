import { html } from "hybrids";
import { Spectre } from "../Spectre";

export default {
  render: () => html`
      ${Spectre}
      <style>
        :host {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: space-evenly;
        }

        :host > * {
          margin: auto;
        }
      </style>
      <a class="btn btn-lg btn-primary" href="#/play">Play</a>   
      <a class="btn btn-lg" href="#/edit">Edit</a>   
    `
};
