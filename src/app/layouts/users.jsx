import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Redirect } from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import UsersLoader from '../components/ui/hoc/usersLoader'
import UserProvider from '../hooks/useUsers'
import { getCurrentUserId } from '../store/users'
const Users = () => {
    const params = useParams()
    const { userId, edit } = params
    const currentUserUserId = useSelector(getCurrentUserId)

    return (
        <>
            <UsersLoader>
                <UserProvider>
                    {userId ? (
                        edit ? (
                            userId === currentUserUserId ? (
                                <EditUserPage />
                            ) : (
                                <Redirect to={`/users/${currentUserUserId}/edit`} />
                            )
                        ) : (
                            <UserPage userId={userId} />
                        )
                    ) : (
                        <UsersListPage />
                    )}
                </UserProvider>
            </UsersLoader>
        </>
    )
}

export default Users
