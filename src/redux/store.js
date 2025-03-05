// import blueCircle from "../assets/blueCircle.png";
// import profileReducer from "./profile-reducer";
// import messagesReducer from "./messages-reducer";
// import messageAvaOrange from "../assets/messageAvaOrange.png";
//
// const store = {
//   _state: {
//     leftBar: {
//       items: ["Profile", "Messages", "News", "Music", "Settings"],
//     },
//     profilePageData: {
//       newPostText: "",
//       posts: [
//         { id: 1, text: "Here is my first post!" },
//         { id: 2, text: "Yo! It is cool!" },
//       ],
//     },
//     messagesPageData: {
//       dialogsData: [
//         { id: 1, name: "Sam" },
//         { id: 2, name: "Andrew" },
//         { id: 3, name: "Nastya" },
//         { id: 4, name: "Victor" },
//         { id: 5, name: "Bro" },
//       ],
//       newMessageText: "",
//       messagesData: [
//         {
//           message: "Hello, my friend!",
//           image: messageAvaOrange,
//         },
//         {
//           message: "Look at this!",
//           image: blueCircle,
//         },
//         {
//           message: "What in the world you doing!",
//           image: blueCircle,
//         },
//       ],
//     },
//   },
//
//   _callSubscriber(store) {
//     console.log("State has changed");
//   },
//
//   getState() {
//     return this._state;
//   },
//
//   subscribe(observer) {
//     this._callSubscriber = observer;
//   },
//
//   dispatch(action) {
//     this._state.profilePageData = profileReducer(
//       this._state.profilePageData,
//       action,
//     );
//
//     this._state.messagesPageData = messagesReducer(
//       this._state.messagesPageData,
//       action,
//     );
//
//     this._callSubscriber(this);
//   },
// };
//
// export default store;
