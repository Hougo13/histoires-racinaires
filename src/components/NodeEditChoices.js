import { html } from "hybrids";
import { Spectre } from "../Spectre";
import StEditNodeChoice from "./NodeEditChoice";
import StEditNodeChoiceModal from "./NodeEditChoiceModal";
import { connectStore } from "./StoreProvider";

const openAddModal = host => {
  host.addModal = true;
};

const closeAddModal = host => {
  host.addModal = false;
};

export default {
  ...connectStore({
    choices: state => state.story.nodes[state.selectedNode].choices
  }),
  addModal: false,
  render: ({ choices, addModal }) =>
    html`
			${Spectre}
			${choices.map(
        choice => html`
					<st-edit-node-choice choice="${choice}"></st-edit-node-choice>
				`
      )}
			<button class="btn" onclick="${openAddModal}">Add</button>
			<st-edit-node-choice-modal open="${addModal}" onclosemodal="${closeAddModal}"></st-edit-node-choice-modal>
	`.define({ StEditNodeChoice, StEditNodeChoiceModal })
};
