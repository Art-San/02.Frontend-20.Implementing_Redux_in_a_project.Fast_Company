import { createSlice } from '@reduxjs/toolkit'
import professionService from '../services/profession.service'
import isDutdated from '../utils/isQutdated'

const professionsSlice = createSlice({
    name: 'professions',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true
        },
        professionsReceved: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        professionsRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { actions, reducer: professionsReducer } = professionsSlice
const { professionsRequested, professionsReceved, professionsRequestFiled } =
    actions

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions
    if (isDutdated(lastFetch)) {
        console.log('lastFetch', lastFetch)
        dispatch(professionsRequested())
        try {
            const { content } = await professionService.get()
            dispatch(professionsReceved(content))
        } catch (error) {
            dispatch(professionsRequestFiled(error.message))
        }
    }
}
export const getProfessions = () => (state) => state.professions.entities // изменяем интерфейс
// изменяем интерфейс
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading
// изменяем интерфейс
export const getProfessionbyId = (id) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find((p) => p._id === id)
    }
}

export default professionsReducer
