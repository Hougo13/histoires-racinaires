import { html } from "hybrids";
import { latinise, lowerCase, trim, replaceAll } from "voca";
import { connectStore } from "./StoreProvider";
import { Spectre, SpectreIcons } from "../Spectre";
import { editStoryTitle } from "../Store";
import { router } from "./Router";

const onEditHandler = host => {
  host.editTitle = true;
  host.tempTitle = host.storyTitle;
};

const onInputHandler = (host, event) => {
  host.tempTitle = event.target.value;
};

const onSubmitHandler = (host, event) => {
  event.preventDefault();
  host.editTitle = false;
  if (host.tempTitle != host.storyTitle) {
    host.store.dispatch(editStoryTitle(host.tempTitle));
  }
};

const onBackClick = ({ selectedNode, router }, event) => {
  console.log("click");
  if (selectedNode) {
    router.navigate("/edit");
  } else {
    router.navigate("/");
  }
};

export default {
  ...connectStore({
    storyTitle: ({ story }) => (story ? story.title : ""),
    story: state => state.story,
    selectedNode: state => (state.selectedNode ? true : false)
  }),
  router,
  editTitle: false,
  tempTitle: "",
  storyHref: ({ story }) =>
    `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(story))}`,
  storyFilename: ({ storyTitle }) =>
    `${replaceAll(latinise(lowerCase(trim(storyTitle))), " ", "_")}.json`,

  render: ({ storyTitle, editTitle, storyHref, storyFilename }) => {
    const displayTitleTemplate = html`
        <h3 class="text-primary">${storyTitle}</h3>
        <button class="btn btn-sm s-circle" onclick="${onEditHandler}"><i class="icon icon-edit"></i></button>
    `;

    const editTitleTemplate = html`
        <form class="input-group" onsubmit="${onSubmitHandler}">
            <input type="text" class="form-input" value="${storyTitle}" oninput="${onInputHandler}">
            <button class="btn btn-primary input-group-btn"><i class="icon icon-check"></i></button>
        </form>
    `;

    return html`
        ${Spectre}
        ${SpectreIcons}
        <style>
            :host {
                /* width: 100%; */
                flex-shrink: 0;
                align-items: stretch;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                border-bottom: .05rem solid #e7e9ed;
                padding: 7px;
            }
            section {
                display: flex;
            }
            section > * {
                margin-top: auto;
                margin-bottom: auto;
            }
            section > * {
                margin-left: 3px;
                margin-right: 3px;
            }
        </style>
        <section>
            <button class="btn btn-link" onclick="${onBackClick}"><i class="icon icon-back"></i></button>
            ${editTitle ? editTitleTemplate : displayTitleTemplate}
        </section>
        <section>
            <a href="${storyHref}" download="${storyFilename}">
                <button class="btn btn-primary">Save</button>
            </a>
        </section>
  `;
  }
};
