import { useState } from 'react'
import BookManagement from '../components/BookManagement'
import MemberManagement from '../components/MemberManagement'
import LibrarianApprovals from '../components/LibrarianApprovals'
import '../styles/AdminDashboard.css'
 
function AdminDashboard({ books, setBooks }) {
  const [activeTab, setActiveTab] = useState('books')
 
  const stats = [
    { label: 'Total Books', value: books.length },
    { label: 'Borrowed', value: books.filter(b => b.borrowed).length },
    { label: 'Available', value: books.filter(b => b.available).length },
    { label: 'Fines Pending', value: 'LKR 4,200' },
  ]
 
  return (
    <div className="lms-admin-dashboard">
      <div className="lms-admin-header">
        <h1 className="lms-admin-title">Librarian Console</h1>
        <p className="lms-admin-subtitle">Manage catalog, members, and library operations.</p>
      </div>
 
      <div className="lms-stats-grid">
        {stats.map(stat => (
          <div key={stat.label} className="lms-stat-card">
            <span className="lms-stat-label">{stat.label}</span>
            <div className="lms-stat-value">{stat.value}</div>
          </div>
        ))}
      </div>
 
      <div className="lms-admin-tabs">
        <button
          className={`lms-admin-tab ${activeTab === 'books' ? 'active' : ''}`}
          onClick={() => setActiveTab('books')}
        >
          Book Management
        </button>
        <button
          className={`lms-admin-tab ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          Member Records
        </button>
      </div>
 
      {activeTab === 'books' ? (
        <BookManagement books={books} setBooks={setBooks} />
      ) : (
        <MemberManagement />
      )}
    </div>
  )
}
 
export default AdminDashboard
