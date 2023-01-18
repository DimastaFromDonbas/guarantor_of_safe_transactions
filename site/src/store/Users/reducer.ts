import { IAction } from "../utils";
import { reducerTypes } from "./types";
import { IUser } from "../../interfaces/users";
import { IDeal } from "../../interfaces/deal";

export interface IUsersReducer {
  user: IUser | {};
  deals: IDeal[];
}

export const INITIAL: IUsersReducer = {
  user: {},
  deals: [],
};

export const UserReducer = (state = INITIAL, { type, payload }: IAction) => {
  switch (type) {
    case reducerTypes.GET_USER:
      return { ...state, user: payload };
    case reducerTypes.GET_DEAL:
      return { ...state, deals: payload };
    default:
      return state;
  }
};
