import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../state/store'
import { fetchUserDetailsStart } from '@/state/user/userSlice'

const Profile = () => {
    const dispatch = useDispatch()
    const userDetails = useSelector((state: RootState) => state.user.user)

    useEffect(() => {
        dispatch(fetchUserDetailsStart()) // Dispatch the fetch user details action
    }, [dispatch]) // The empty array means this effect runs once when the component mounts

    if (!userDetails) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>Profile</h1>
            <h1>{userDetails.name}</h1>
            <p>{userDetails.email}</p>
            {/* Display other user details here */}
        </div>
    )
}

export default Profile
