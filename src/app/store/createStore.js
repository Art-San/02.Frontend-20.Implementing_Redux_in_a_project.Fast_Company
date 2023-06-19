import { combineReducers, configureStore } from '@reduxjs/toolkit'
// Создаем Store
const rootReducer = combineReducers({})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
