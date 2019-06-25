import { parseStory } from "./Utils";
import { fetchStoryStart, fetchStorySuccess, fetchStoryError } from "./Store";

export const fetchStory = (url, store) => {
  store.dispatch(fetchStoryStart());
  return fetch(url)
    .then(response => response.json())
    .then(story => parseStory(story, true))
    .then(story => store.dispatch(fetchStorySuccess(story)))
    .catch(error => store.dispatch(fetchStoryError(error)));
};

export const loadStory = (file, store) => {
  const reader = new FileReader();
  reader.onloadstart = () => store.dispatch(fetchStoryStart());
  reader.onerror = () => {
    console.error(reader.error);
    store.dispatch(fetchStoryError(reader.error));
  };
  reader.onload = () => {
    try {
      const story = parseStory(JSON.parse(reader.result), true);
      store.dispatch(fetchStorySuccess(story));
    } catch (error) {
      console.error(error);
      store.dispatch(fetchStoryError(error));
    }
  };

  reader.readAsText(file);
};

export const createStory = async store => {
  store.dispatch(fetchStoryStart());
  const story = await parseStory({}, true);
  store.dispatch(fetchStorySuccess(story));
};
