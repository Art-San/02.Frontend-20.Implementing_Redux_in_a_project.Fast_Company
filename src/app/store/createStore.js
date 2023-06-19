import { combineReducers, configureStore } from '@reduxjs/toolkit'
import qualitiesReducer from './qualities'

const rootReducer = combineReducers({
    qualities: qualitiesReducer // Создаем Qualities Slice
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
