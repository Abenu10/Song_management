import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'

const Profile = () => {
    const user = useSelector((state: RootState) => state.user.data)

    if (!user) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            {/* Display other user details here */}
        </div>
    )
}

export default Profile
