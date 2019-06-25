import { html } from "hybrids";
import { Spectre, SpectreIcons } from "../Spectre";
import { store } from "./StoreProvider";
import { router } from "./Router";
import { editNodeText, editNodeId, deleteNode } from "../Store";

const deleteNodeHandler = ({ router, store, nodeId }) => {
  store.dispatch(deleteNode(nodeId));
  router.navigate("/edit");
};

const nodeIdInputHandler = (host, event) => {
  host.inputNodeId = event.target.value;
};

const nodeTextInputHandler = (host, event) => {
  host.inputNodeText = event.target.value;
};

const applyChanges = (host, event) => {
  event.preventDefault();
  const { nodeId, nodeText, inputNodeId, inputNodeText, router, store } = host;

  if (inputNodeText && inputNodeText != nodeText) {
    store.dispatch(editNodeText(nodeId, inputNodeText));
    host.nodeText = inputNodeText;
  }

  if (inputNodeId && inputNodeId != nodeId) {
    router.navigate(`/edit/${inputNodeId}`, { quitely: true });
    store.dispatch(editNodeId(nodeId, inputNodeId));
    host.nodeId = inputNodeId;
  }
};

export default {
  store,
  router,
  nodeText: "",
  nodeId: "",
  inputNodeText: "",
  inputNodeId: "",
  nodeChanged: ({ inputNodeId, inputNodeText, nodeId, nodeText }) =>
    (inputNodeId && inputNodeId != nodeId) ||
    (inputNodeText && inputNodeText != nodeText),
  render: ({
    nodeId,
    nodeText,
    inputNodeId,
    inputNodeText,
    nodeChanged
  }) => html`
    ${Spectre} ${SpectreIcons}
    <form id="form" onsubmit="${applyChanges}">
      <div class="form-group">
        <label class="form-label" for="input-node-id">Id</label>
        <input
          class="form-input"
          type="text"
          id="input-node-id"
          placeholder="Enter an id"
          name="nodeId"
          oninput="${nodeIdInputHandler}"
          value="${inputNodeId || nodeId}"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="input-node-text">Text</label>
        <textarea
          class="form-input"
          id="input-node-text"
          placeholder="Enter the text"
          name="nodeText"
          rows="20"
          oninput="${nodeTextInputHandler}"
        >
${inputNodeText || nodeText}</textarea
        >
      </div>
      <button
        type="submit"
        class="${{
          btn: true,
          "btn-primary": true,
          disabled: !nodeChanged
        }}"
      >
        Apply changes
      </button>
      <button class="btn float-right" onclick="${deleteNodeHandler}">
        <i class="icon icon-delete"></i> Delete
      </button>
    </form>
  `
};
