import { IAction } from "../utils";
import { reducerTypes } from "./types";
import { IUser } from "../../interfaces/users";

export interface IUsersReducer {
  user: IUser | {};
}

export const INITIAL: IUsersReducer = {
user: {
  id: 1,
  email: "123@gmail.com",
  password: "Dima12345" || null,
  role: "admin",
  score: 0,
  nickname: "dima_Zayka",
},
};

export const UserReducer = (state = INITIAL, { type, payload }: IAction) => {
  switch (type) {
    case reducerTypes.GET_USERS:
      return { ...state, users: payload };
    default:
      return state;
  }
};
