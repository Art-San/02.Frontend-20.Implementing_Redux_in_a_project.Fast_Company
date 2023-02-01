import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../services/quality.service'

const qualitiesSlice = createSlice({
    name: 'qualities',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        qualitiesRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { actions, reducer: qualitiesReducer } = qualitiesSlice
const { qualitiesRequested, qualitiesReceved, qualitiesRequestFiled } = actions

function isDutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true
    }
    return false
}

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities
    if (isDutdated(lastFetch)) {
        console.log('lastFetch', lastFetch)
        dispatch(qualitiesRequested())
        try {
            const { content } = await qualityService.fetchAll()
            dispatch(qualitiesReceved(content))
        } catch (error) {
            dispatch(qualitiesRequestFiled(error.message))
        }
    }
}

export const getQualities = () => (state) => state.qualities.entities
export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading
export const getQualitiesByIds = (qualitisIds) => state => {
    if (state.qualities.entities) {
        const qualitiesArray = []
        for (const qualId of qualitisIds) {
            for (const quality of state.qualities.entities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality)
                    break
                }
            }
        }
        return qualitiesArray
    }
    return []
}

export default qualitiesReducer
