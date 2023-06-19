import { combineReducers, configureStore } from '@reduxjs/toolkit'
import professionsReducer from './professions'
import qualitiesReducer from './qualities'

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer // создали professions slice
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
