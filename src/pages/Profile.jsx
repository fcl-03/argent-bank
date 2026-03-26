import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { setUser } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { fetchUserProfile, updateUserProfile } from '../services/api'
import Account from '../components/Account'

function Profile() {

    const [newUserName, setNewUserName] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const token = useSelector((state) => state.auth.token)

        useEffect(() => {
            async function fetchProfile() {
                try {
                    const data = await fetchUserProfile(token)
                    dispatch(setUser(data.body))
                } catch {
                    console.error('Failed to fetch profile')
                }
            }
            fetchProfile()
        }, [dispatch, token])

    async function handleSaveUserName(event) {
        event.preventDefault()
        try {
            const data = await updateUserProfile(token, newUserName)
            dispatch(setUser(data.body))
            setIsEditing(false)
        } catch {
            console.error('Failed to update username')
        }
    }

    return (
        <main className="main bg-dark">
        <div className="header">
            <h1>Welcome back,<br /> {user?.firstName} {user?.lastName}!</h1>
        </div>
            {isEditing ? (
                <form className='edit-form' onSubmit={handleSaveUserName}>
                <div className="input-firstname">
                    <label htmlFor="firstName">First name: </label>
                    <input type='text' disabled id='firstname' placeholder={user?.firstName}/>
                </div>
                <div className="input-lastname">
                    <label htmlFor="lastName">Last name: </label>
                    <input type='text' disabled id='lastname' placeholder={user?.lastName}/>
                </div>
                <div className="input-pseudo">
                    <label htmlFor="pseudo">User name: </label>
                   <input type="text" id="pseudo" placeholder={user?.userName} value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                </div>
                <div className='buttons'>
                <button>Save</button> <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
                </form>
            ):(
                <button onClick={() => setIsEditing(true)} className='edit-button'>Edit Name</button>
            )}

            {/* Données statiques — l'API ne fournit pas encore les comptes */}
            <Account
                title="Argent Bank Checking (x8349)"
                amount="$2,082.79"
                description="Available Balance"
            />
            <Account
                title="Argent Bank Savings (x6712)"
                amount="$10,928.42"
                description="Available Balance"
            />
            <Account
                title="Argent Bank Credit Card (x8349)"
                amount="$184.30"
                description="Current Balance"
            />
        </main>
    )
}

export default Profile
