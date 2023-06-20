import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/users'

const LogOut = () => {
    const dispatch = useDispatch() // Реализуем LogOut
    useEffect(() => {
        // Реализуем LogOut
        dispatch(logOut())
    }, [])
    return <h1>Loading</h1>
}

export default LogOut
