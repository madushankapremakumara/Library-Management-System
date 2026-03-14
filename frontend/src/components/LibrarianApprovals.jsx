import { useState, useEffect } from 'react'
import { fetchPendingLibrarians, approveLibrarian } from '../api'

function LibrarianApprovals() {
  const [pending, setPending] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPending()
  }, [])

  const loadPending = async () => {
    try {
      const response = await fetchPendingLibrarians()
      setPending(response.data)
    } catch (error) {
      console.error('Error fetching pending librarians:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id) => {
    try {
      await approveLibrarian(id)
      setPending(pending.filter(u => u.id !== id))
      alert('Librarian approved successfully!')
    } catch (error) {
      alert('Approval failed: ' + (error.response?.data?.error || error.message))
    }
  }

  if (loading) return <div className="lms-loader" style={{ padding: '2rem', textAlign: 'center' }}>⌛ Loading pending approvals...</div>

  return (
    <div className="lms-admin-section">
      <h2 className="lms-admin-sec-title">🛡️ Pending Librarian Approvals</h2>
      {pending.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray-500)' }}>
          No pending approvals at the moment.
        </div>
      ) : (
        <div className="lms-admin-table-wrapper">
          <table className="lms-admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map(user => (
                <tr key={user.id}>
                  <td><strong>{user.username}</strong></td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="lms-admin-btn primary"
                      onClick={() => handleApprove(user.id)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default LibrarianApprovals
