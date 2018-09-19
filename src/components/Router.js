import { parent } from "hybrids";
import Navigo from "navigo";
import { connectStore } from "./StoreProvider";
import { setPage, selectNode, resetNodeSelection } from "../Store";
import { fetchStory } from "../Actions";
import { html } from "hybrids/lib/html";

const routeHandler = host => () => {
  host.route = host.router.lastRouteResolved();
};

const Router = {
  ...connectStore({
    page: state => state.page,
    selectedNode: state => state.selectedNode
  }),
  route: {},
  router: {
    get: (host, lastValue) => lastValue,
    set: (host, value) => value,
    connect: (host, key) => {
      host.router = new Navigo(null, true);
      const handler = routeHandler(host);
      host.router
        .on({
          "*": { uses: handler },
          "/:page": { uses: handler, as: "page" },
          "/:page/:nodeId": { uses: handler }
        })
        .resolve();

      return () => router.destroy();
    }
  },
  navigate: ({ router, route }) => (
    url,
    { quitely, keepQuery } = { quitely: false, keepQuery: false }
  ) => {
    if (quitely) {
      router.pause(true);
    }
    router.navigate(keepQuery ? `${url}?${route.query}` : url);
    router.pause(false);
  },
  getParam: ({ route }) => name =>
    route && route.params && route.params[name]
      ? route.params[name]
      : undefined,
  getQuery: ({ route }) => name => {
    if (!route.query) {
      return;
    }

    let query = route.query.split("&").reduce((result, pair) => {
      pair = pair.split("=");
      result[pair[0]] = decodeURIComponent(pair[1] || "");
      return result;
    }, {});

    if (name) {
      return query[name];
    }

    return query;
  },
  render: ({
    getParam,
    getQuery,
    navigate,
    page,
    store,
    route,
    selectedNode
  }) => {
    setTimeout(() => {
      const p = getParam("page");
      if (page != p) {
        store.dispatch(setPage(p || "home"));
      }

      const n = getParam("nodeId");
      if (selectedNode != n) {
        store.dispatch(n ? selectNode(n) : resetNodeSelection());
      }

      const storyUrl = getQuery("url");
      if (storyUrl) {
        fetchStory(storyUrl, store).then(() => {
          navigate(route.url, { quitely: true });
        });
      }
    });

    return html`<slot></slot>`;
  }
};

export default Router;

export const router = parent(Router);
