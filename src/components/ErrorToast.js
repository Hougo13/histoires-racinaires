import { html } from "hybrids";
import { Spectre, SpectreIcons } from "../Spectre";
import { connectStore } from "./StoreProvider";

export default {
  ...connectStore({
    error: state => state.error,
    storyStatus: state => state.storyStatus
  }),
  render: ({ storyStatus, error }) => html`
        ${Spectre}
        ${SpectreIcons}
        <style>
            .toast {
                box-sizing: border-box;
                padding: 10px;
            }
        </style>
        ${storyStatus == "error" &&
          html`
            <div class="toast toast-error">
                ${error.message}
            </div>
        `}
    `
};
