import { html, property } from "hybrids";
import { Spectre } from "../Spectre";
import StNodeEditBasic from "./NodeEditBasic";
import StNodeEditChoices from "./NodeEditChoices";

const switchTab = tab => (host, event) => {
  host.tab = tab;
};

export default {
  nodeId: "",
  node: property({}),
  tab: "basic",
  render: ({ tab, node, nodeId }) =>
    html`
      ${Spectre}
      <style>
        :host > div {
          margin: 2rem;
        }
      </style>
      <ul class="tab tab-block">
        <li class="tab-item ${tab == "basic" ? "active" : ""}">
          <a class="c-hand" onclick="${switchTab("basic")}">Basic</a>
        </li>
        <li class="tab-item ${tab == "choices" ? "active" : ""}">
          <a class="c-hand" onclick="${switchTab("choices")}">Choices</a>
        </li>
      </ul>
      <div>
        ${tab == "basic" &&
          html`
            <st-node-edit-basic
              nodeText="${node.text}"
              nodeId="${nodeId}"
            ></st-node-edit-basic>
          `}
        ${tab == "choices" &&
          html`
            <st-node-edit-choices></st-node-edit-choices>
          `}
      </div>
    `.define({ StNodeEditBasic, StNodeEditChoices })
};
