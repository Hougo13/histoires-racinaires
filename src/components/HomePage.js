import { html } from "hybrids";
import StOpen from "./Open";
import StLaunch from "./Launch";
import { connectStore } from "./StoreProvider";

export default {
  ...connectStore({
    storyStatus: state => state.storyStatus
  }),
  render: ({ storyStatus }) =>
    html`
      ${
        storyStatus == "success"
          ? html`<st-launch></st-launch>`
          : html`<st-open></st-open>`
      }
    `.define({ StOpen, StLaunch })
};
