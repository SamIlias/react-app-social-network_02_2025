import messageAvaOrange from "../assets/messageAvaOrange.png";
import blueCircle from "../assets/blueCircle.png";

const store = {
  _state: {
    leftBar: {
      items: ["Profile", "Messages", "News", "Music", "Settings"],
    },
    profilePageData: {
      newPostText: "Write your post here",
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
      newMessageText: "Write your message here",
      messagesData: [
        {
          message: "Hello, my friend!",
          image: messageAvaOrange,
        },
        {
          message: "Look at this!",
          image: blueCircle,
        },
        {
          message: "What in the world you doing!",
          image: blueCircle,
        },
      ],
    },
  },

  _generateId(seed) {
    return seed.length + 1;
  },

  _callSubscriber(store) {
    console.log("State has changed");
  },

  addPost() {
    if (!this._state.profilePageData.newPostText) {
      return;
    }
    const seed = this._state.profilePageData.posts;
    const newPost = {
      id: this._generateId(seed),
      text: this._state.profilePageData.newPostText,
    };

    this._state.profilePageData.posts.push(newPost);
    this._state.profilePageData.newPostText = "";
    this._callSubscriber(this);
  },

  updateNewPostText(text) {
    this._state.profilePageData.newPostText = text;

    this._callSubscriber(this);
  },

  updateNewMessageText(text) {
    this._state.messagesPageData.newMessageText = text;

    this._callSubscriber(this);
  },

  addMessage(text) {
    if (!this._state.messagesPageData.newMessageText) {
      return;
    }

    const newMessage = {
      message: text,
      image: messageAvaOrange,
    };

    this._state.messagesPageData.messagesData.push(newMessage);
    this._state.messagesPageData.newMessageText = "";
    this._callSubscriber(this);
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },
};

export default store;
