import { IAction } from "../utils";
import { reducerTypes } from "./types";
import { IUser } from "../../interfaces/users";

export interface IUsersReducer {
  users: IUser[] | null;
}

export const INITIAL: IUsersReducer = {
users: [],
};

export const UserReducer = (state = INITIAL, { type, payload }: IAction) => {
  switch (type) {
    case reducerTypes.GET_USERS:
      return { ...state, users: payload };
    default:
      return state;
  }
};
