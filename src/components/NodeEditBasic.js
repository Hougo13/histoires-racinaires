import { html } from "hybrids";
import { Spectre } from "../Spectre";
import { store } from "./StoreProvider";
import { router } from "./Router";
import { editNodeText, editNodeId } from "../Store";

const applyChanges = ({ nodeId, nodeText, router, store }, event) => {
  event.preventDefault();
  const form = new FormData(event.target);

  const newNodeText = form.get("nodeText");
  if (newNodeText != nodeText) {
    store.dispatch(editNodeText(nodeId, newNodeText));
  }

  const newNodeId = form.get("nodeId");
  if (newNodeId != nodeId) {
    router.navigate(`/edit/${newNodeId}`, { quitely: true });
    store.dispatch(editNodeId(nodeId, newNodeId));
  }
};

export default {
  store,
  router,
  nodeText: "",
  nodeId: "",
  render: ({ nodeId, nodeText }) => html`
		${Spectre}
		<style>

		</style>
		<form id="form" onsubmit="${applyChanges}">
			<div class="form-group">
				<label class="form-label" for="input-node-id">Id</label>
				<input 	class="form-input" type="text" id="input-node-id" placeholder="Enter an id" name="nodeId" value="${nodeId}">
			</div>
			<div class="form-group">
				<label class="form-label" for="input-node-text">Text</label>
				<textarea class="form-input" id="input-node-text"	placeholder="Enter the text" name="nodeText" rows="20">${nodeText}</textarea>
			</div>
			<button type="submit" class="btn btn-primary">Apply changes</button>
		</form>
	`
};
