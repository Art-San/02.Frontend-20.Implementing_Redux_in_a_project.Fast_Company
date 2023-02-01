import { createSlice } from '@reduxjs/toolkit'

const qualitiesSlice = createSlice({
    name: 'qualities',
    initialState: {
        entitis: null,
        isLoading: true
    }
})

const { reducer: qualitiesReducer } = qualitiesSlice

export default qualitiesReducer
