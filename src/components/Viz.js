import StGraph from "./Graph.js";
import StNodeDetail from "./NodeDetail.js";
import { html } from "hybrids";

const selectHandler = (host, event) => {
  host.cursor = event.detail.nodeId;
  host.showDetail = true;
};

const unselectHandler = (host, event) => {
  host.showDetail = false;
};

const exitHandler = (host, event) => {
  host.showDetail = false;
};

export default {
  story: {},
  showDetail: false,
  cursor: "",
  render: ({ story, showDetail, cursor }) => {
    return html`
            <style>
                :host {
                    display: flex;
                    height: 100%;
                    max-height: 100%;
                    flex-grow: 1;
                    width: 100%;
                    /* position: absolute; */
                    overflow: hidden;
                }
            </style>
            <st-graph story="${story}" onselect="${selectHandler}" onunselect="${unselectHandler}"></st-graph>
            <st-node-detail 
                nodeId="${cursor}"
                node="${story.nodes[cursor] || {}}"
                onexit="${exitHandler}"
                class=${{
                  show: showDetail
                }}
            ></st-node-detail>
        `.define({ StGraph, StNodeDetail });
  }
};
