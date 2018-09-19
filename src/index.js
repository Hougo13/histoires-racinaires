import { html, define } from "hybrids";
import StStoreProvider from "./components/StoreProvider.js";
import StPages from "./components/Pages.js";
import StRouter from "./components/Router.js";
import "hybrids/shim";

const StoryApp = {
  render: () =>
    html`
      <st-store-provider>
        <st-router>
          <st-pages></st-pages>
        </st-router>
      </st-store-provider>
    `.define({ StStoreProvider, StRouter, StPages })
};

export default StoryApp;

define("st-app", StoryApp);
