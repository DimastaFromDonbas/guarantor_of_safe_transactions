import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "./saga";
import { rootReducer } from "./rootReducers";

const sagaMiddleware = createSagaMiddleware()

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

