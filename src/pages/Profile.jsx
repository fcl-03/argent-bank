import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setUser } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

function Profile() {

    const [newUserName, setNewUserName] = useState('')
    const [isEditing, setIsEditing] = useState(false)
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
    
    async function handleSaveUserName(event) {
        event.preventDefault()
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'PUT',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName: newUserName })
    })
    const data = await response.json()
    dispatch (setUser(data.body))
    setIsEditing(false)
    }
    
  
    return (
        
        <main className="main bg-dark">
        <div className="header">
            <h1>Welcome back, {user?.firstName} {user?.lastName}!</h1>
        </div>
            {isEditing ? (
                <form className='edit-form' onSubmit={handleSaveUserName}>
                <div className="input-firstname">
                    <label htmlFor="firstName">First name: </label>
                    <input type='firstname' disabled id='fistname' placeholder={user?.firstName}/>
                </div>
                <div className="input-lastname">
                    <label htmlFor="lastName">Last name: </label>
                    <input type='lastname' disabled id='lastname' placeholder={user?.lastName}/>
                </div>
                <div className="input-pseudo">
                    <label htmlFor="pseudo">User name: </label>
                   <input type="username" id="pseudo" placeholder={user?.userName} value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                </div>
                <div className='buttons'>
                <button>Save</button> <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
                </form>
            ):(
                <button onClick={() => setIsEditing(true)} className='edit-button'>Edit Name</button>
            )}
        </main>
        
    )
}

export default Profile