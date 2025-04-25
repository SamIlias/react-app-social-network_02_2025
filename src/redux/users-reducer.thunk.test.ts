// import { ResultCodesEnum } from "../api/api";
// import { APIResponseType } from "../api/auth-api";
// // import { usersAPI } from "../api/users-api";
// import * as usersAPIImport from "../api/users-api";
// import { subscribe } from "./users-reducer";
//
// // jest.mock("../api/users-api");
//
// jest.mock("../api/users-api", () => ({
//   usersAPI: {
//     subscribeToUser: jest.fn(),
//     unsubscribeFromUser: jest.fn(),
//   },
// }));
//
// const usersAPIMock = usersAPIImport.usersAPI as jest.Mocked<
//   typeof usersAPIImport.usersAPI
// >;
//
// const result: APIResponseType = {
//   resultCode: ResultCodesEnum.success,
//   messages: [],
//   data: {},
// };
//
// usersAPIMock.subscribeToUser.mockReturnValue(Promise.resolve(result));
//
// test("thunk test", async () => {
//   const thunk = subscribe(1, "token");
//   const dispatchMock = jest.fn();
//   const getStateMock = jest.fn();
//
//   await thunk(dispatchMock, getStateMock, {});
//   expect(dispatchMock).toHaveBeenCalledTimes(3);
// });
