import { html } from "hybrids";
import { connectStore } from "./StoreProvider.js";

const getPage = p => {
  switch (p) {
    case "home":
      return html.resolve(
        import(/* webpackChunkName: "HomePage",  webpackPrefetch: true */ "./HomePage.js").then(
          ({ default: StHomePage }) =>
            html`<st-home-page></st-home-page>`.define({ StHomePage })
        )
      );
    case "play":
      return html.resolve(
        import(/* webpackChunkName: "PlayPage",  webpackPrefetch: true */ "./PlayPage.js").then(
          ({ default: StPlayPage }) =>
            html`<st-play-page></st-play-page>`.define({ StPlayPage })
        )
      );
    case "edit":
      return html.resolve(
        import(/* webpackChunkName: "EditPage" */ "./EditPage.js").then(
          ({ default: StEditPage }) =>
            html`<st-edit-page></st-edit-page>`.define({ StEditPage })
        )
      );
    default:
      return html`Not Found`;
  }
};

export default {
  ...connectStore({
    page: state => state.page
  }),
  render: ({ page }) => {
    console.log("render pages");
    return html`${getPage(page)}`;
  }
};
