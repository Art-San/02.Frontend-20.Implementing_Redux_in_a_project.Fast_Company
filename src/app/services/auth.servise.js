// import { httpAuth } from '../hooks/useAuth'
import localStorageService from './localStorage.service'

import axios from 'axios'
const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})

const authService = {
    register: async ({ email, password }) => {
        const { data } = await httpAuth.post(`accounts:signUp`, {
            email,
            password,
            returnSecureToken: true
        })
        return data
    },
    logIn: async ({ email, password }) => {
        const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
            email,
            password,
            returnSecureToken: true
        })
        return data
    },
    refresh: async () => {
        const { data } = await httpAuth.post('token', {
            grant_type: 'refresh_token',
            refresh_token: localStorageService.getRefreshToken()
        })
        return data
    }
}

export default authService
