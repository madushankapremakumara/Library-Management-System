import { useState } from 'react'
import { updateUserDetail } from '../api'
import '../styles/Profile.css'
 
function Profile({ user, setUser, bookList }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })
 
  const borrowedBooks = bookList.filter(b => b.borrowed)
 
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await updateUserDetail(user.id, formData)
      setUser(response.data)
      setIsEditing(false)
      alert('Profile updated successfully!')
    } catch (error) {
      alert('Failed to update profile: ' + (error.response?.data?.error || error.message))
    }
  }
 
  return (
    <div className="lms-profile-page">
      <div className="lms-profile-header">
        <div className="lms-profile-avatar">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="lms-profile-info">
          <h1 className="lms-profile-name">{user?.name || 'No Name Set'}</h1>
          <p className="lms-profile-email">{user?.email}</p>
          <div className="lms-profile-details-grid">
            <div className="lms-profile-detail-item">
              <strong>Gender:</strong> {user?.gender || 'Not specified'}
            </div>
            <div className="lms-profile-detail-item">
              <strong>Born:</strong> {user?.birth_date || 'Not specified'}
            </div>
            <div className="lms-profile-detail-item">
              <strong>Joined:</strong> {new Date(user?.date_joined).toLocaleDateString()}
            </div>
          </div>
          <div className="lms-profile-badge">{user?.role}</div>
        </div>
        <button 
          className="lms-admin-btn primary" 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
 
      {isEditing && (
        <div className="lms-profile-section">
          <h2 className="lms-profile-sec-title">Personal Settings</h2>
          <form className="lms-profile-form" onSubmit={handleUpdate}>
            <div className="lms-auth-group">
              <label className="lms-auth-label">Full Name</label>
              <input
                className="lms-auth-input"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="lms-auth-group">
              <label className="lms-auth-label">Email Address</label>
              <input
                type="email"
                className="lms-auth-input"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <button type="submit" className="lms-admin-btn primary">Save Changes</button>
            </div>
          </form>
        </div>
      )}
 
      <div className="lms-profile-section">
        <h2 className="lms-profile-sec-title">📚 Currently Borrowing</h2>
        {borrowedBooks.length > 0 ? (
          <div className="lms-borrowed-list">
            {borrowedBooks.map(book => (
              <div key={book.id} className="lms-borrowed-item">
                <div className="lms-borrowed-info">
                  <span className="lms-borrowed-icon">📖</span>
                  <div className="lms-borrowed-details">
                    <span className="lms-borrowed-title">{book.title}</span>
                    <span className="lms-borrowed-date">Active Loan</span>
                  </div>
                </div>
                <span className="lms-badge available">Borrowed</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>You haven't borrowed any books yet.</p>
        )}
      </div>
 
      <div className="lms-profile-section">
        <h2 className="lms-profile-sec-title">📜 Activity History</h2>
        <div className="lms-borrowed-list" style={{ opacity: 0.6 }}>
          <div className="lms-borrowed-item">
            <div className="lms-borrowed-info">
              <span className="lms-borrowed-icon">✔️</span>
              <div className="lms-borrowed-details">
                <span className="lms-borrowed-title">Membership Activated</span>
                <span className="lms-borrowed-date">{new Date(user?.date_joined).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default Profile
