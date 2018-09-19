import { html } from "hybrids";
import StErrorToast from "./ErrorToast";
import { Spectre, SpectreIcons } from "../Spectre";
import { loadStory, fetchStory } from "../Actions";
import { connectStore } from "./StoreProvider";
import SButton from "./spectre/Button";
import SFormGroup from "./spectre/FormGroup";

const openStory = ({ store, storyStatus }, event) => {
  event.preventDefault();

  if (storyStatus != "loading") {
    const form = new FormData(event.target);
    const url = form.get("url");
    const file = form.get("file");

    if (url) {
      fetchStory(url, store);
    } else if (file.size > 0) {
      loadStory(file, store);
    }
  }
};

export default {
  ...connectStore({
    storyStatus: state => state.storyStatus
  }),
  render: ({ storyStatus }) =>
    html`
      ${Spectre}
      <style>
        form {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        form > * {
          margin-left: 10px;
          margin-right: 10px;
          margin-bottom: 30px !important;
        }
        form > button, {
          margin-top: 30px;
          margin-left: auto;
          margin-right: auto;
          width: 50px;
        }        

        form > .form-group {
          box-sizing: border-box;
        }
      </style>
      <st-error-toast></st-error-toast>
      <form onsubmit="${openStory}">
        <div class="form-group">
          <label for="url-input">From a url</label>
          <input 
            class="form-input" 
            type="url" id="url-input" 
            placeholder="https://mydrive/mystory.json" 
            name="url" 
            disabled="${storyStatus == "loading"}">
        </div>          
        <div class="divider text-center" data-content="OR"></div>
        <div class="form-group">
          <label class="form-label" for="file-input">From a file</label>
          <input 
            class="form-input" 
            type="file" 
            id="file-input" 
            accept="application/json"
            name="file"
            disabled="${storyStatus == "loading"}">
        </div>  
        <button class="btn btn-primary ${storyStatus == "loading" &&
          "loading"}" type="submit">Ok</button>
      </form>

  `.define({ StErrorToast, SButton, SFormGroup })
};
