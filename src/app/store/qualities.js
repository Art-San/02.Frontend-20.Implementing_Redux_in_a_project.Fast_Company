import { createSlice } from '@reduxjs/toolkit'
// Создаем Qualities Slice
const qualitiesSlice = createSlice({
    name: 'qualities',
    initialState: {
        entitis: null,
        isLoading: true
    }
})

const { reducer: qualitiesReducer } = qualitiesSlice

export default qualitiesReducer
