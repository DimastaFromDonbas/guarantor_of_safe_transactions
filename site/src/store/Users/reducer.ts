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
  checkAlertSystemMessage: boolean;
  updateHeaderAlert: boolean;
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
  myRefills: [
    {
      "id": 0,
      "time": "время сосать хуй",
      "score": 10000,
      "status": 1,
      "userEmail": "user104@gmail.com",
      "uniqueId": 1,
      "createdAt": "2023-01-22 13:51:19.017 +00:00",
      "updatedAt": "2023-01-22 13:51:19.017 +00:00",
      "userId": null
  },
  {
    "id": 1,
    "time": "а когда сосать?",
    "score": 10000,
    "status": 1,
    "userEmail": "user104@gmail.com",
    "uniqueId": 3,
    "createdAt": "2023-01-22 13:57:39.123 +00:00",
    "updatedAt": "2023-01-22 13:57:39.123 +00:00",
    "userId": null
},
{
    "id": 1,
    "time": "нам пизда, не устанавливай",
    "score": 10000,
    "status": 1,
    "userEmail": "user104@gmail.com",
    "uniqueId": 4,
    "createdAt": "2023-01-22 14:03:16.323 +00:00",
    "updatedAt": "2023-01-22 14:03:16.323 +00:00",
    "userId": null
}

  ],
  checkAlertSystemMessage: false,
  updateHeaderAlert: false,
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
    case reducerTypes.GET_UPDATE_HEADER_ALERT:
      return { ...state, updateHeaderAlert: payload };
    default:
      return state;
  }
};
