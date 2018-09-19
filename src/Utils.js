export const validateStory = ({ title, root, nodes }) => {
  const hasNodes = nodes && Object.keys(nodes).length > 0;
  const hasRoot = root && nodes[root];
  const hasValidNodes = nodes.reduce((result, { text, choices }) => {
    if (!result) {
      return false;
    }
  }, true);

  return hasRoot && hasNodes;
};

export const parseStory = (story, autoFix = false) => {
  if (!story.title) {
    if (autoFix) {
      story.title = "Unnamed story";
    } else {
      throw new Error("title is undefined");
    }
  }

  if (!story.nodes) {
    if (autoFix) {
      story.nodes = {};
    } else {
      throw new Error("nodes is undefined");
    }
  }

  if (Object.keys(story.nodes).length == 0) {
    if (autoFix) {
      story.nodes["root-node"] = { text: "" };
      story.root = "root-node";
    } else {
      throw new Error("nodes is empty");
    }
  }

  if (!story.root) {
    if (autoFix) {
      story.root = Object.keys(story.nodes)[0];
    } else {
      throw new Error("root is undefined");
    }
  }

  Object.keys(story.nodes).forEach(nodeId => {
    const node = story.nodes[nodeId];

    if (!node.text) {
      if (autoFix) {
        node.text = "empty";
      } else {
        throw new Error(`text is undefined in ${nodeId}`);
      }
    }

    if (!node.choices) {
      if (autoFix) {
        node.choices = [];
      } else {
        throw new Error(`choices is undefined in ${nodeId}`);
      }
    }

    node.choices.forEach((choice, i) => {
      if (!choice.text) {
        if (autoFix) {
          choice.text = "empty";
        } else {
          throw new Error(`text is undefined in ${nodeId} : choices[${i}]`);
        }
      }

      if (!choice.target) {
        throw new Error(`target is undefined in ${nodeId} : choices[${i}]`);
      }

      if (!story.nodes[choice.target]) {
        if (autoFix) {
          story.nodes[choice.target] = {
            text: "empty",
            choices: []
          };
        } else {
          throw new Error(
            `target ${choice.target} doesn't exist in ${nodeId} : choices[${i}]`
          );
        }
      }
    });
  });

  return story;
};

export const exist = value => value !== undefined && value !== null;

// export const fetchStory = url =>
//   fetch(url)
//     .then(response => response.json())
//     .then(story => parseStory(story, true));
