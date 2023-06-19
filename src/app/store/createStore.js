import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({}) // Создаем Store

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
