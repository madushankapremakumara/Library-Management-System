import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../api'
import '../styles/Auth.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await loginUser(email, password)
      onLogin(user)
      navigate('/')
    } catch (error) {
      alert('Login failed: ' + error.message)
    }
  }
 
  return (
    <div className="lms-auth-container">
      <div className="lms-auth-card">
        <div className="lms-auth-header">
          <h1 className="lms-auth-title">Welcome Back</h1>
          <p className="lms-auth-subtitle">Sign in to your library account</p>
        </div>
        <form className="lms-auth-form" onSubmit={handleSubmit}>
          <div className="lms-auth-group">
            <label className="lms-auth-label">Email Address</label>
            <input
              type="email"
              className="lms-auth-input"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="lms-auth-group">
            <label className="lms-auth-label">Password</label>
            <input
              type="password"
              className="lms-auth-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="lms-auth-submit-btn">Sign In</button>
        </form>
        <div className="lms-auth-footer">
          Don't have an account? <Link to="/signup" className="lms-auth-link">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}
 
export default Login
