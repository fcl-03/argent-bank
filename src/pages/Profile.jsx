import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setUser } from '../store/authSlice'
import { useDispatch } from 'react-redux'

function Profile() {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const token = useSelector((state) => state.auth.token)
    console.log(token)
    console.log(user)

    useEffect(() => {
        async function fetchProfile() {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${token}`
                },
        })
        const data = await response.json()
        console.log(data)
        dispatch(setUser(data.body))
        }
        fetchProfile()
    }, [])
  
    return (
        <h1>Welcome back, {user?.firstName} {user?.lastName}!</h1>
    )
}

export default Profile