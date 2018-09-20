import { router } from "./Router.js";
import { html } from "hybrids";

const clickHandler = ({ href, router, keepQuery }, e) => {
  e.preventDefault();
  router.navigate(href, { keepQuery });
};

export default {
  router,
  href: "",
  keepQuery: false,
  render: () =>
    html`
        <style>
            ::slotted(*) {
                cursor: pointer;
            }
        </style>
        <a onclick="${clickHandler}">
            <slot></slot>
        </a>
    `
};
