import { html, dispatch } from "hybrids";
import { Spectre } from "../Spectre";
import { store, connectStore } from "./StoreProvider";
import {
  editNodeChoice,
  selectNode,
  createNode,
  createNodeChoice
} from "../Store";
import { reset } from "ansi-colors";

const closeModal = host => {
  dispatch(host, "closemodal", { bubbles: true, composed: true });
};

const save = (host, event) => {
  event.preventDefault();
  const { choice, store, nodeId, nodes } = host;
  const form = new FormData(event.target);

  const newText = form.get("text") || "empty";
  const newTarget = form.get("target");

  const newValue = {
    target: newTarget,
    text: newText
  };

  if (!nodes[newTarget]) {
    store.dispatch(createNode(newTarget));
  }

  if (choice.target) {
    store.dispatch(editNodeChoice(nodeId, choice.target, newValue));
  } else {
    store.dispatch(createNodeChoice(nodeId, newValue));
    event.target.reset();
  }

  closeModal(host);
  host.open = false;
};

export default {
  ...connectStore({
    nodeId: state => state.selectedNode,
    nodes: state => state.story.nodes
  }),
  open: false,
  choice: {},
  render: ({ open, choice }) => html`
		${Spectre}
		<div class="${{ modal: true, active: open }}" id="modal-id">
			<a class="modal-overlay" aria-label="Close" onclick="${closeModal}"></a>
			<div class="modal-container">
				<div class="modal-header">
					<button class="btn btn-clear float-right" aria-label="Close" onclick="${closeModal}"></button>
					<div class="modal-title h5">Edit Choice</div>
				</div>
				<form onsubmit="${save}">
					<div class="modal-body">
						<div class="content">
							<div class="form-group">
								<label class="form-label" for="input-target">Target</label>
								<input class="form-input" type="text" id="input-target" name="target" value="${choice.target ||
                  ""}">
							</div>
							<div class="form-group">
								<label class="form-label" for="input-text">Text</label>
								<textarea class="form-input" id="input-text" rows="3" name="text" placeholder="empty">${
                  choice.text
                }</textarea>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn">Save</button>
					</div>
				<form>
			</div>
		</div>
	`
};
