import StRouterLink from "./RouterLink.js";
import { html, dispatch } from "hybrids";
import { Spectre, SpectreIcons } from "../Spectre.js";

const onExit = (host, event) => {
  dispatch(host, "exit");
};

export default {
  nodeId: "",
  node: {},
  render: ({ node, nodeId }) =>
    html`
    ${Spectre}
    ${SpectreIcons}
    <style>
      :host {
        transition: opacity, bottom, 0.3s;
        position: absolute;
        bottom: -100px;
        opacity: 0;
        visibility: hidden;
        text-align: center;
        background-color: white;
        max-height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        font-size: 1rem;
      }

      :host(.show) {
          bottom: 0px;
          opacity: 1;
          visibility: visible;
      }
      #actions {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          margin-bottom: .4rem;
      }
      #choices {
          display: flex;
          justify-content: space-around;
      }
      #divider {
          margin-top: 0;
      }
      .card {
          margin: 4px;
      }
      #scroll {
          overflow: auto;
      }
    </style>
    <div class="divider" id="divider"></div>
    <div id="actions">
        <button class="btn btn-action btn-sm" onclick="${onExit}">
            <i class="icon icon-cross"></i>
        </button>
        <h4>${nodeId}</h4>
				<st-router-link href="${`/edit/${nodeId}`}">
						<button class="btn btn-action btn-sm">
								<i class="icon icon-edit"></i>
						</button>     
				</st-router-link> 

    </div>
    <div id="scroll">
        <p>${node.text}</p>
        <div id="choices">
            ${node.choices &&
              node.choices.map(
                choice => html`
                    <div class="card">
                        <div class="card-body">
                            ${choice.text}
                        </div>
                    </div>
                `
              )}
        </div>
    </div>
    `.define({ StRouterLink })
};
