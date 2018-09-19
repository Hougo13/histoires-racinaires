import { html } from "hybrids";
import StViz from "./Viz";
import StEditionBar from "./EditionBar";
import StNodeEdit from "./NodeEdit";
import { connectStore } from "./StoreProvider";

export default {
  ...connectStore({
    story: state => state.story,
    selectedNodeId: state => state.selectedNode,
    selectedNode: state =>
      state.selectedNode ? state.story.nodes[state.selectedNode] : {}
  }),
  render: ({ story, selectedNode, selectedNodeId }) =>
    html`
        <style>
            :host {
                display: flex;
                flex-direction: column;
                height: 100%;
                max-height: 100%;
            }
        </style>
        <st-edition-bar></st-edition-bar>
        ${
          selectedNodeId
            ? html`<st-node-edit nodeId="${selectedNodeId}" node="${selectedNode}"></st-node-edit>`
            : html`<st-viz story="${story}"></st-viz>`
        }            
  `.define({ StViz, StEditionBar, StNodeEdit })
};
