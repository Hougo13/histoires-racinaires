import { html } from "hybrids";
import { Spectre } from "../Spectre";
import { connectStore } from "./StoreProvider";
import { editNodeText, editNodeId } from "../Store";
import { router } from "./Router";

const nodeIdInput = (host, event) => {
  host.cache = { ...host.cache, nodeId: event.target.value };
};

const nodeTextInput = (host, event) => {
  host.cache = { ...host.cache, nodeText: event.target.value };
};

const applyChanges = (host, event) => {
  event.preventDefault();
  const form = new FormData(event.target);

  if (host.nodeTextChanged) {
    host.store.dispatch(editNodeText(host.nodeId, form.get("nodeText")));
  }

  if (host.nodeIdChanged) {
    const newNodeId = form.get("nodeId");
    host.router.navigate(`/edit/${newNodeId}`, { quitely: true });
    host.store.dispatch(editNodeId(host.nodeId, newNodeId));
  }
};

export default {
  ...connectStore({}),
  router,
  nodeId: "",
  node: {
    get: (host, value) => value || {},
    set: (host, value) => {
      console.log("set node");
      return value;
    }
  },
  cache: {
    get: ({ nodeId, node }, value) =>
      value || { nodeId: nodeId, nodeText: node.text },
    set: (host, value, lastValue) => value
  },
  nodeIdChanged: ({ cache, nodeId }) => cache.nodeId != nodeId,
  nodeTextChanged: ({ cache, node }) => cache.nodeText != node.text,
  nodeChanged: ({ nodeIdChanged, nodeTextChanged }) =>
    nodeIdChanged || nodeTextChanged,
  render: ({ node, nodeId, nodeChanged }) => {
    console.log("render edit node", node, nodeId, nodeChanged);
    return html`
			${Spectre}
			<style>

			</style>
			<form id="form" onsubmit="${applyChanges}">
				<div class="form-group">
					<label class="form-label" for="input-node-id">Id</label>
					<input 	class="form-input" type="text" id="input-node-id" placeholder="Enter an id" name="nodeId" value="${nodeId}" oninput="${nodeIdInput}">
				</div>
				<div class="form-group">
					<label class="form-label" for="input-node-text">Text</label>
					<textarea 
						class="form-input" id="input-node-text"	placeholder="Enter the text" name="nodeText" rows="10" oninput="${nodeTextInput}"
					>${node.text}</textarea>
				</div>
				<button type="submit" class="btn btn-primary ${
          nodeChanged ? "" : "disabled"
        }">Apply changes</button>
			</form>
		`;
  }
};
