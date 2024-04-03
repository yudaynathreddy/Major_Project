import { applyMiddleware, combineReducers, compose, createStore } from "@reduxjs/toolkit";
import { thunk } from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import storage from "redux-persist/lib/storage";
import loginreducer from './Reducers';
const persistconfig = {
    key: 'loginreducer',
    storage,
}
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    loginreducer
})
const persistreducer = persistReducer(persistconfig, rootReducer)
export const Store = createStore(persistreducer, composeEnhancer(applyMiddleware(thunk)))
export const persistor = persistStore(Store);
