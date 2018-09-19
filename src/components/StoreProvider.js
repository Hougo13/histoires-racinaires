import { parent } from "hybrids";
import Store from "../Store";

const StoreProvider = {
  store: Store,
  dispatch: ({ store }) => (...args) => store.dispatch(...args),
  dispatchTask: ({ store }) => (...args) =>
    setTimout(() => store.dispatch(...args)),
  getState: ({ store }) => (...args) => store.getState(...args),
  subscribe: ({ store }) => (...args) => store.subscribe(...args)
};

export default StoreProvider;

export const store = parent(StoreProvider);

export const connect = mapState => ({
  get: mapState
    ? ({ store }) => mapState(store.getState())
    : ({ store }) => store.getState(),
  connect: ({ store }, key, invalidate) => store.subscribe(invalidate)
});

export const connectStore = mapStates => ({
  store,
  ...Object.keys(mapStates).reduce((acc, key) => {
    acc[key] = connect(mapStates[key]);
    return acc;
  }, {})
});
