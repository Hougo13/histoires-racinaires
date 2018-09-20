import { html } from "hybrids";
import { Spectre } from "../Spectre";
import StEditNodeChoiceModal from "./NodeEditChoiceModal";
import { store, connectStore } from "./StoreProvider";
import { deleteNodeChoice } from "../Store";
import StRouterLink from "./RouterLink.js";

const openModal = host => {
  host.edition = true;
};

const closeModal = host => {
  host.edition = false;
};

const deleteChoice = ({ store, nodeId, choice }) => {
  store.dispatch(deleteNodeChoice(nodeId, choice.target));
};

export default {
  ...connectStore({
    nodeId: state => state.selectedNode
  }),
  choice: {},
  edition: false,
  render: ({ choice, edition }) =>
    html`
			${Spectre}
			<div class="tile">
				<div class="tile-content">
					<st-router-link href="${`/edit/${choice.target}`}">
						<p class="tile-title">${choice.target}</p>
					</st-router-link>
					<p class="tile-subtitle text-gray">${choice.text}</p>
				</div>
				<div class="tile-action">
					<button class="btn btn-primary" onclick="${openModal}">Edit</button>
					<button class="btn" onclick="${deleteChoice}">Delete</button>
				</div>
			</div>
			<st-edit-node-choice-modal open="${edition}" choice="${choice}" onclosemodal="${closeModal}"></st-edit-node-choice-modal>
  	`.define({ StEditNodeChoiceModal, StRouterLink })
};
