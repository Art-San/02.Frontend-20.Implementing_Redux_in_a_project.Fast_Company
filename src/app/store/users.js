import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.servise'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        auth: null, // Переносим метод регистрации в User Slice
        isLoggedIn: false // Переносим метод регистрации в User Slice
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        usersReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        usersRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        // Переносим метод регистрации в User Slice
        authRequestSuccess: (state, action) => {
            state.auth = { ...action.payload, isLoggedIn: true }
        },
        // Переносим метод регистрации в User Slice
        authRequestFailed: (state, action) => {
            state.error = action.payload
        }
    }
})

const { actions, reducer: usersReducer } = usersSlice
const {
    usersRequested,
    usersReceved,
    usersRequestFiled,
    authRequestSuccess,
    authRequestFailed
} = actions

const authRequested = createAction('users/authRequested')
// Переносим метод регистрации в User Slice
export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested())
        try {
            const data = await authService.register({ email, password })
            localStorageService.setTokens(data)
            dispatch(authRequestSuccess({ userId: data.localId }))
        } catch (error) {
            dispatch(authRequestFailed(error.message))
        }
    }

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested())
    try {
        const { content } = await userService.get()
        dispatch(usersReceved(content))
    } catch (error) {
        dispatch(usersRequestFiled(error.message))
    }
}

export const getUsersList = () => (state) => state.users.entities
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId)
    }
}

export default usersReducer
