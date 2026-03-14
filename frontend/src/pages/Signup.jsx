import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api'
import '../styles/Auth.css'
 
function Signup({ onLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('')
  const [isLibrarian, setIsLibrarian] = useState(false)
  const navigate = useNavigate()
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const username = email.split('@')[0] 
      const response = await registerUser({ 
        username, 
        email, 
        password, 
        name, 
        role: isLibrarian ? 'librarian' : 'member',
        birth_date: birthDate,
        gender: gender
      })
      
      if (isLibrarian) {
        alert('Registration successful! Please wait for an admin to approve your account.')
        navigate('/login')
      } else {
        onLogin(response.data)
        navigate('/')
      }
    } catch (error) {
      alert('Signup failed: ' + (error.response?.data?.error || error.message))
    }
  }
 
  return (
    <div className="lms-auth-container">
      <div className="lms-auth-card">
        <div className="lms-auth-header">
          <h1 className="lms-auth-title">Create Account</h1>
          <p className="lms-auth-subtitle">Join the Library Management System</p>
        </div>
        <form className="lms-auth-form" onSubmit={handleSubmit}>
          <div className="lms-auth-group">
            <label className="lms-auth-label">Full Name</label>
            <input
              type="text"
              className="lms-auth-input"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="lms-auth-row">
            <div className="lms-auth-group">
              <label className="lms-auth-label">Birth Date</label>
              <input
                type="date"
                className="lms-auth-input"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </div>
            <div className="lms-auth-group">
              <label className="lms-auth-label">Gender</label>
              <select
                className="lms-auth-input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="lms-auth-checkbox-group" onClick={() => setIsLibrarian(!isLibrarian)}>
            <input
              type="checkbox"
              className="lms-auth-checkbox"
              checked={isLibrarian}
              onChange={() => {}} // Handled by group click
            />
            <span>Register as Librarian</span>
          </div>
          <button type="submit" className="lms-auth-submit-btn">Sign Up</button>
        </form>
        <div className="lms-auth-footer">
          Already have an account? <Link to="/login" className="lms-auth-link">Sign In</Link>
        </div>
      </div>
    </div>
  )
}
 
export default Signup
