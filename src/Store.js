import { createStore } from "redux";

const reducer = (state = { page: "home", storyStatus: "pending" }, action) => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.value };
    case "FETCH_STORY":
      const newState = {
        ...state,
        storyStatus: action.status
      };
      if (action.status == "success") {
        newState.story = action.response;
      } else if (action.status == "error") {
        newState.error = action.error;
      }
      return newState;
    case "SELECT_NODE": {
      return { ...state, selectedNode: action.value };
    }
    case "EDIT_STORY_TITLE":
      return { ...state, story: { ...state.story, title: action.value } };

    case "EDIT_NODE_TEXT":
      const editNodes = {};
      editNodes[action.nodeId] = {
        ...state.story.nodes[action.nodeId],
        text: action.value
      };
      return {
        ...state,
        story: { ...state.story, nodes: { ...state.story.nodes, ...editNodes } }
      };
    case "EDIT_NODE_ID":
      const nodes = {};
      Object.keys(state.story.nodes).forEach(nodeId => {
        if (nodeId != action.oldValue) {
          nodes[nodeId] = {
            ...state.story.nodes[nodeId],
            choices: state.story.nodes[nodeId].choices.map(choice => ({
              ...choice,
              target:
                choice.target == action.oldValue
                  ? action.newValue
                  : choice.target
            }))
          };
        } else {
          nodes[action.newValue] = state.story.nodes[nodeId];
        }
      });
      return {
        ...state,
        selectedNode:
          state.selectedNode == action.oldValue
            ? action.newValue
            : state.selectedNode,
        story: { ...state.story, nodes }
      };
    default:
      return state;
  }
};

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const setPage = value => ({
  type: "SET_PAGE",
  value
});

export const selectNode = value => ({
  type: "SELECT_NODE",
  value
});

export const resetNodeSelection = () => ({
  type: "SELECT_NODE"
});

export const fetchStoryStart = () => ({
  type: "FETCH_STORY",
  status: "loading"
});

export const fetchStoryError = error => ({
  type: "FETCH_STORY",
  status: "error",
  error
});

export const fetchStorySuccess = response => ({
  type: "FETCH_STORY",
  status: "success",
  response
});

export const fetchStoryReset = () => ({
  type: "FETCH_STORY",
  status: "pending"
});

export const editStoryTitle = value => ({
  type: "EDIT_STORY_TITLE",
  value
});

export const editNodeId = (oldValue, newValue) => ({
  type: "EDIT_NODE_ID",
  oldValue,
  newValue
});

export const editNodeText = (nodeId, value) => ({
  type: "EDIT_NODE_TEXT",
  nodeId,
  value
});
