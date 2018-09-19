import { html } from "hybrids";
import StRenderer from "./Renderer.js";
import { connectStore } from "./StoreProvider.js";

const error = html`
    Error
`;

const loading = html`
    Loading
`;

const pending = html`
    Pending
`;

const renderer = story =>
  html`
    <st-renderer story="${story}"></st-renderer>
`.define({ StRenderer });

export default {
  ...connectStore({
    story: state => state.story,
    storyStatus: state => state.storyStatus
  }),
  render: ({ story, storyStatus }) => {
    console.log("render play");

    return html`
        ${storyStatus == "success" && renderer(story)}
        ${storyStatus == "error" && error}
        ${storyStatus == "loading" && loading}
        ${storyStatus == "pending" && pending}
    `;
  }
};
