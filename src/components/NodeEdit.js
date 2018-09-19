import { html } from "hybrids";
import { Spectre } from "../Spectre";
import StNodeEditBasic from "./NodeEditBasic";
import StNodeEditChoices from "./NodeEditChoices";

const switchTab = tab => (host, event) => {
  host.tab = tab;
};

export default {
  nodeId: "",
  node: {},
  tab: "basic",
  render: ({ tab, node, nodeId }) => {
    console.log("render edit node", node, nodeId);

    let content;
    switch (tab) {
      case "basic":
        content = html`
          <st-node-edit-basic nodeText="${
            node.text
          }" nodeId="${nodeId}"></st-node-edit-basic>
        `.define({ StNodeEditBasic });
        break;
      case "choices":
        content = html`
          <st-node-edit-choices></st-node-edit-choices>  
        `.define({ StNodeEditChoices });
        break;
      default:
        content = html``;
    }

    return html`
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
        ${content}
      </div>
		`;
  }
};
