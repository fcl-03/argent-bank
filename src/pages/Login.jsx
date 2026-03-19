import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function handleSubmit(event) {
        event.preventDefault()
  
        const response = await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
  
        const data = await response.json()
        console.log(data)

        if (data.status === 200) {
            dispatch(login({ token: data.body.token }))
            navigate('/profile')
        } else {
            setError('Invalid email or password')
        }
    }
    
  return (
    
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Email</label>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button> 
          {error && <p className="error">{error}</p>}
        </form>
      </section>
    </main>
    
  )
}

export default Login