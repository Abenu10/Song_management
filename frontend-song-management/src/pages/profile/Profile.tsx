import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'

const Profile = () => {
    // const user = useSelector((state: RootState) => state.auth.user)
    const userDetails = useSelector((state: RootState) => state.user.user)
    console.log(userDetails)
    if (!userDetails) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>Profile</h1>
            {/* <h1>{userDetails.name}</h1>
            <p>{userDetails.email}</p> */}
            {/* Display other user details here */}
        </div>
    )
}

export default Profile
