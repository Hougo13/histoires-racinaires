import { html, dispatch } from "hybrids";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

const nodesToElements = nodes => {
  const elements = [];
  Object.keys(nodes).forEach(id => {
    const { text, choices } = nodes[id];
    elements.push({
      data: { id, text, choices },
      grabbable: false,
      selectable: false
    });
    if (choices) {
      choices.forEach(({ target, text }) => {
        elements.push({
          data: { source: id, target, text }
        });
      });
    }
  });
  return elements;
};

const dataToNode = ({ text, choices }) => ({ text, choices });

const select = (host, data) => {
  host.cursor = data.id;
  dispatch(host, "select", {
    detail: {
      nodeId: data.id
    }
  });
};

export default {
  story: {},
  cursor: "",
  rendered: false,
  cyElement: host => host.shadowRoot.getElementById("cy"),
  cy: {
    get: (host, lastValue) => {
      if (lastValue) {
        lastValue.destroy();
      }

      if (host.rendered) {
        const cy = cytoscape({
          container: host.cyElement,
          elements: nodesToElements(host.story.nodes),
          boxSelectionEnabled: false,
          layout: {
            name: "dagre",
            nodeDimensionsIncludeLabels: true
          },
          style: [
            {
              selector: "node",
              style: {
                content: "data(id)",
                "text-opacity": 0.5,
                "text-valign": "center",
                "text-halign": "right",
                "background-color": "#5755d9",
                "text-margin-x": 10
              }
            },
            {
              selector: "node.selected",
              style: {
                "background-color": "#f1f1fc",
                "border-color": "#5755d9",
                "border-width": 4
              }
            },
            {
              selector: `node[text = 'empty']`,
              style: {
                "background-color": "#ffb700"
              }
            },
            {
              selector: `node[text = 'empty'].selected`,
              style: {
                "background-color": "#f1f1fc",
                "border-color": "#ffb700",
                "border-width": 4
              }
            },
            {
              selector: "edge",
              style: {
                "curve-style": "bezier",
                width: 4,
                "target-arrow-shape": "triangle",
                "line-color": "#f1f1fc",
                "target-arrow-color": "#f1f1fc"
              }
            },
            {
              selector: "edge.selected",
              style: {
                "line-color": "#5755d9",
                "target-arrow-color": "#5755d9"
              }
            },
            {
              selector: `edge[text = 'empty']`,
              style: {
                "line-color": "#ffb700",
                "target-arrow-color": "#ffb700"
              }
            }
          ]
        });

        cy.on("tap", "node", event => {
          const data = event.target.data();
          select(host, data);
        });

        cy.on("tap", "edge", event => {
          const data = event.target.source().data();
          select(host, data);
        });

        cy.on("tap", event => {
          if (!event.target.length) {
            host.cursor = "";
            dispatch(host, "unselect");
          }
        });

        return cy;
      }

      return lastValue;
    }
  },
  render: host => {
    if (!host.rendered) {
      setTimeout(() => {
        host.rendered = true;
      });
    }

    if (host.cy) {
      host.cy.nodes().removeClass("selected");
      host.cy.edges().removeClass("selected");
      if (host.cursor) {
        host.cy.nodes(`node[id='${host.cursor}']`).addClass("selected");
        host.cy.edges(`edge[source='${host.cursor}']`).addClass("selected");
      }
    }

    return html`
            <style>
                :host {
                    display: block;
                    /* position: absolute; */
                    height: 100%;
                    max-width: 100%;
                    flex-grow: 1;
                }

                #cy {
                    position: relative;
                    height: 100%;
                    width: 100%;
                }
            </style>
            <div id="cy"></div>
        `;
  }
};
