import { IAction } from "../utils";
import { reducerTypes } from "./types";
import { IUser } from "../../interfaces/users";
import { IDeal } from "../../interfaces/deal";
import { IRefill } from "../../interfaces/refill";
import { ITransfer } from "../../interfaces/transfer";
import { ITransferToUser } from "../../interfaces/transferToUser";
import {IDealMessage} from "../../interfaces/dealMessage";

export interface IUsersReducer {
  user: IUser | {};
  deals: IDeal[];
  refill: IRefill | {};
  myRefills: IRefill[];
  checkAlertSystemMessage: boolean;
  updateHeaderAlert: boolean;
  transfers: ITransfer[] | [];
  transfersToUser: ITransferToUser[] | [];
  dealMessages: IDealMessage[] | [];
  allUsers: any | [];
  allDeals: IDeal[] | [];
  fixSumSystemMessage: [];
}

export const INITIAL: IUsersReducer = {
  user: {
    id: 1,
    email: "user104@gmail.com",
    password: "1234567a" || null,
    role: "Админ",
    score: 0,
    nickname: "test",
    systemMessage: null,
    checkRu: 'true',
    minimumTransferAmount: null,
    sumTransferAmoumt: null,
    completed: 0,
  },
  deals: [{buyer: "user104@gmail.com",
  buyerNickname: "null",
  createdAt: "2023-01-21T11:41:29.231Z",
  description: "куплю дилдак",
  id: 10,
  name: "pisun",
  seller: "user4@gmail.com",
  sellerNickname: "null",
  status: 0,
  sum: 9999,
  updatedAt: "2023-01-21T11:41:29.231Z",}],
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
  transfers: [    
    {
    id: 1,
    paymantSystem: 'Сбербанк',
    walletNumber: '0000 1488 0420 0228',
    score: 5000,
    time: '2023.01.24 15:41',
    status: 1,
    userEmail: 'user120@gmail.com',
    createdAt: '',
    updatedAt: '',
  }
  ],
  transfersToUser: [{
    id: 1,
    userEmail: 'user120@gmail.com',
    receiverEmail: 'user121@gmail.com',
    score: 5000,
    time: '2023.01.24 15:59',
    status: 1,
    createdAt: '',
    updatedAt: '',
  }],
  dealMessages: [],
  allUsers: [{
    id: 1,
    email: "use32131231r123asdsasaas@gmail.com",
    password: "D2023212" || null,
    role: "ADMIN",
    score: 1110,
    nickname: "DimaKek",
    systemMessage: "string" || null,
    checkRu: 'true',
    minimumTransferAmount: null,
    sumTransferAmoumt: null,
    completed: 0,
  },{
    id: 1,
    email: "use32131231r123asd@gmail.com",
    password: "D2023212" || null,
    role: "ADMIN",
    score: 1110,
    nickname: "DimaKek",
    systemMessage: "string" || null,
    checkRu: 'true',
    minimumTransferAmount: null,
    sumTransferAmoumt: null,
    completed: 0,
  }],
  allDeals: [{
    id: 1,
    createdAt: "string",
    updatedAt: "string",
    name: "string",
    buyer: "string",
    buyerNickname: "string",
    seller: "string",
    sellerNickname: "string",
    sum: 1,
    status: 1,
    description: "string",
  }],
  fixSumSystemMessage: [],
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
    case reducerTypes.GET_TRANSFERS:
      return { ...state, transfers: payload };
    case reducerTypes.GET_TRANSFERS_TO_USER:
      return { ...state, transfersToUser: payload };
      case reducerTypes.GET_DEAL_MESSAGES:
        return { ...state, dealMessages: payload };
    case reducerTypes.GET_ALL_USERS:
      return { ...state, allUsers: payload };
    case reducerTypes.GET_ALL_DEALS:
      return { ...state, allDeals: payload };
    case reducerTypes.GET_FIX_SUM_SYSTEM_MESSAGE:
      return { ...state, fixSumSystemMessage: payload };
    default:
      return state;
  }
};
