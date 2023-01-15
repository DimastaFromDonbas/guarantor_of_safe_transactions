import { combineReducers } from "redux";
import { UserReducer } from "./Users/reducer";
import { IUsersReducer } from "./Users/reducer";

export interface IRootReducer {
    users: IUsersReducer;

}

export const rootReducer = combineReducers<IRootReducer>({
    users: UserReducer,
});
