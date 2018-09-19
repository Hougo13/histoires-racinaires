import { html } from "hybrids";

export default {
  story: {},
  cursor: {
    get: ({ story }, lastValue) => lastValue || story.root,
    set: ({ story: { nodes } }, value, lastValue) =>
      nodes[value] ? value : lastValue
  },
  render: host => {
    const { story, cursor } = host;
    const node = story && story.nodes[cursor];

    if (!cursor) {
      return html`<div>Error!</div>`;
    }

    return html`
      <style>
          @import url("https://fonts.googleapis.com/css?family=Handlee");
          :host {
              font-family: 'Handlee', cursive;
              font-size: 28px;
              display: flex;
              height: 100%;
              width: 100%;
              background-color: rgb(60, 60, 60);
              color: rgb(205, 204, 208);
              flex-direction: column;
              justify-content: center;
          }
          #text {
            text-align: center;
          }
          #choices {
            display: flex;
            justify-content: space-around;
            margin-top: 40px;
          }
          .choice {
            cursor: pointer;
          }
      </style>
      <p id="text">${node.text}</p>
      <div id="choices">
      ${node.choices &&
        node.choices.map(
          choice =>
            html`<p class="choice" onclick="${() => {
              host.cursor = choice.target;
            }}">${choice.text}</p>`
        )}
      </div>
  `;
  }
};
