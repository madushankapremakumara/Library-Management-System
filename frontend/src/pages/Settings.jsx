import { useState } from 'react'
import { updateUserDetail } from '../api'
import '../styles/Settings.css'

function Settings({ user, setUser }) {
  const [activeSection, setActiveSection] = useState('profile')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    birth_date: user?.birth_date || '',
    gender: user?.gender || '',
    username: user?.username || ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Saving changes...' })
    try {
      const response = await updateUserDetail(user.id, formData)
      setUser(response.data)
      setStatus({ type: 'success', message: 'Profile updated successfully!' })
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.error || 'Failed to update profile' })
    }
  }

  return (
    <div className="lms-settings-container">
      <div className="lms-settings-card">
        <aside className="lms-settings-sidebar">
          <div className="lms-settings-nav-title">Menu</div>
          <button 
            className={`lms-settings-nav-item ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            👤 Personal Info
          </button>
          <button 
            className={`lms-settings-nav-item ${activeSection === 'security' ? 'active' : ''}`}
            onClick={() => setActiveSection('security')}
          >
            🔒 Security
          </button>
          <button 
            className={`lms-settings-nav-item ${activeSection === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveSection('privacy')}
          >
            🛡️ Privacy & Safety
          </button>
          <button 
            className={`lms-settings-nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveSection('notifications')}
          >
            🔔 Notifications
          </button>
        </aside>

        <main className="lms-settings-content">
          {activeSection === 'profile' && (
            <section>
              <div className="lms-settings-section-header">
                <h1 className="lms-settings-title">Personal Information</h1>
                <p className="lms-settings-subtitle">Manage your profile details and contact information.</p>
              </div>

              <form className="lms-settings-form-section" onSubmit={handleUpdateProfile}>
                <div className="lms-settings-grid">
                  <div className="lms-auth-group">
                    <label className="lms-auth-label">Full Name</label>
                    <input 
                      className="lms-auth-input" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="lms-auth-group">
                    <label className="lms-auth-label">Username</label>
                    <input 
                      className="lms-auth-input" 
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  <div className="lms-settings-full-width lms-auth-group">
                    <label className="lms-auth-label">Email Address</label>
                    <input 
                      type="email"
                      className="lms-auth-input" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="lms-auth-group">
                    <label className="lms-auth-label">Birth Date</label>
                    <input 
                      type="date"
                      className="lms-auth-input" 
                      name="birth_date"
                      value={formData.birth_date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="lms-auth-group">
                    <label className="lms-auth-label">Gender</label>
                    <select 
                      className="lms-auth-input"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {status.message && (
                  <div className={`lms-status-msg ${status.type}`} style={{ 
                    marginTop: '1rem', 
                    padding: '0.8rem', 
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    backgroundColor: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: status.type === 'success' ? '#10b981' : '#ef4444',
                    border: `1px solid ${status.type === 'success' ? '#10b981' : '#ef4444'}`
                  }}>
                    {status.message}
                  </div>
                )}

                <div className="lms-settings-footer">
                  <button type="submit" className="lms-admin-btn primary">Save Changes</button>
                </div>
              </form>
            </section>
          )}

          {activeSection === 'security' && (
            <section>
              <div className="lms-settings-section-header">
                <h1 className="lms-settings-title">Security Settings</h1>
                <p className="lms-settings-subtitle">Keep your account secure with these settings.</p>
              </div>
              <div className="lms-settings-form-section">
                <div className="lms-toggle-group">
                  <div className="lms-toggle-info">
                    <span className="lms-toggle-label">Two-Factor Authentication</span>
                    <span className="lms-toggle-desc">Add an extra layer of security to your account.</span>
                  </div>
                  <button className="lms-admin-btn secondary small">Enable</button>
                </div>
                <div className="lms-toggle-group">
                  <div className="lms-toggle-info">
                    <span className="lms-toggle-label">Password Policy</span>
                    <span className="lms-toggle-desc">Last changed: 3 months ago.</span>
                  </div>
                  <button className="lms-admin-btn secondary small">Change Password</button>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'privacy' && (
            <section>
              <div className="lms-settings-section-header">
                <h1 className="lms-settings-title">Privacy & Safety</h1>
                <p className="lms-settings-subtitle">Control how your information is shared and visible.</p>
              </div>
              <div className="lms-settings-form-section">
                <div className="lms-toggle-group">
                  <div className="lms-toggle-info">
                    <span className="lms-toggle-label">Public Profile</span>
                    <span className="lms-toggle-desc">Allow others to see your borrowed books and achievements.</span>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="lms-toggle-group">
                  <div className="lms-toggle-info">
                    <span className="lms-toggle-label">Strict Library Rules</span>
                    <span className="lms-toggle-desc">Enable strict notifications for overdue books.</span>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
            </section>
          )}

          {activeSection === 'notifications' && (
            <section>
              <div className="lms-settings-section-header">
                <h1 className="lms-settings-title">Notification Preferences</h1>
                <p className="lms-settings-subtitle">Choose how and when you want to be notified.</p>
              </div>
              <div className="lms-settings-form-section">
                <p style={{ color: 'var(--gray-400)' }}>Email notifications and push alerts are enabled by default.</p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default Settings
