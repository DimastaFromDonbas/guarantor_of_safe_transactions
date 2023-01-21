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
  checkAlertSystemMessage: boolean
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
  deals: [{
    buyer: "user12@gmail.com",
    createdAt: "2023-01-18T13:25:37.883Z",
    description: "test",
    id: 4,
    name: "test",
    seller: "user5@gmail.com",
    status: 0,
    sum: 10,
    updatedAt: "2023-01-18T13:25:37.883Z"
}],
  refill: {},
  myRefills: [],
  checkAlertSystemMessage: false,
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
    case reducerTypes.GET_CHECK_SYSTEM:
      return { ...state, checkAlertSystemMessage: payload };
    default:
      return state;
  }
};
