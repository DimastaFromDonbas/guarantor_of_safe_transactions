import { IAction } from "../utils";
import { reducerTypes } from "./types";
import { IUser } from "../../interfaces/users";

export interface IUsersReducer {
  user: IUser | {};
}

export const INITIAL: IUsersReducer = {
user: {},
};

export const UserReducer = (state = INITIAL, { type, payload }: IAction) => {
  switch (type) {
    case reducerTypes.GET_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};
