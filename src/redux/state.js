import orangeCircle from "../assets/orangeCircle.png";

let state = {
  leftBar: {
    items: ["Profile", "Messages", "News", "Music", "Settings"],
  },

  profilePageData: {
    posts: [
      { id: 1, text: "Here is my first post!" },
      { id: 2, text: "Yo! It is cool!" },
    ],
  },

  messagesPageData: {
    dialogsData: [
      { id: 1, name: "Sam" },
      { id: 2, name: "Andrew" },
      { id: 3, name: "Nastya" },
      { id: 4, name: "Victor" },
      { id: 5, name: "Bro" },
    ],

    messagesData: [
      {
        message: "Hello, my friend!",
        imgAddress:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Eo_circle_deep-orange_blank.svg/768px-Eo_circle_deep-orange_blank.svg.png",
      },
      {
        message: "Look at this!",
        imgAddress:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Eo_circle_deep-orange_blank.svg/768px-Eo_circle_deep-orange_blank.svg.png",
      },

      {
        message: "What in the world you doing!",

        imgAddress:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Eo_circle_indigo_blank.svg/48px-Eo_circle_indigo_blank.svg.png",
      },
    ],
  },
};

const generateId = (seed) => {
  return seed.length + 1;
};

export const addPost = (postMessage) => {
  const seed = state.profilePageData.posts;
  const newPost = { id: generateId(seed), text: postMessage };
  state.profilePageData.posts.push(newPost);

  debugger;
  console.log(state.profilePageData.posts);
};

export default state;
