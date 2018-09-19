import { html } from "hybrids";
import StEditor from "./Editor.js";
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

const editor = html`
    <st-editor></st-editor>
`.define({ StEditor });

export default {
  ...connectStore({
    // story: state => state.story,
    storyStatus: state => state.storyStatus
  }),
  render: ({ story, storyStatus }) => {
    console.log("render editor");

    return html`
        ${storyStatus == "success" && editor}
        ${storyStatus == "error" && error}
        ${storyStatus == "loading" && loading}
        ${storyStatus == "pending" && pending}
    `;
  }
};
