import { IAction } from "../utils";
import { reducerTypes } from "./types";
import { IUser } from "../../interfaces/users";
import { IDeal } from "../../interfaces/deal";
import { IRefill } from "../../interfaces/refill";

export interface IUsersReducer {
  user: IUser | {};
  deals: IDeal[];
  refill: IRefill | {};
  myRefills: IRefill[];
}

export const INITIAL: IUsersReducer = {
  user: {
    id: 1,
    email: "string",
    password: "Dima1020111" || null,
    role: "Админ",
    score: 0,
    nickname: "test",
  },
  deals: [],
  refill: {},
  myRefills: []
};

export const UserReducer = (state = INITIAL, { type, payload }: IAction) => {
  switch (type) {
    case reducerTypes.GET_USER:
      return { ...state, user: payload };
    case reducerTypes.GET_DEAL:
      return { ...state, deals: payload };
    case reducerTypes.GET_REFILL:
      return { ...state, refill: payload };
    case reducerTypes.GET_MY_REFILLS:
      return { ...state, myRefills: payload };
    default:
      return state;
  }
};
