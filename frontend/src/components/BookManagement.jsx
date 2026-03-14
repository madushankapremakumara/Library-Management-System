import { useState } from 'react'
import { addBook, deleteBook } from '../api'
 
function BookManagement({ books, setBooks }) {
  const [showModal, setShowModal] = useState(false)
  const [newBook, setNewBook] = useState({ 
    title: '', 
    author: '', 
    description: '', 
    isbn: '',
    cover: '' 
  })
 
  const handleAddBook = async (e) => {
    e.preventDefault()
    try {
      await addBook({ ...newBook, available: true, borrowed: false })
      // We don't have direct access to 'loadBooks' here, but we can recommend 
      // passing it down or just assuming the user will see it on refresh for now.
      // Better: we can manually update the parent state if the API returns the new book.
      setNewBook({ title: '', author: '', description: '', isbn: '', cover: '' })
      setShowModal(false)
      window.location.reload() // Simple way to refresh from parent for now
    } catch (error) {
      alert('Error adding book: ' + (error.response?.data?.error || error.message))
    }
  }
 
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id)
        setBooks(prev => prev.filter(b => b.id !== id))
      } catch (error) {
        alert('Error deleting book: ' + error.message)
      }
    }
  }
 
  return (
    <div className="lms-book-mgmt">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
        <h3 className="lms-admin-sec-title">Catalog Control</h3>
        <button className="lms-admin-btn primary" onClick={() => setShowModal(true)}>+ Add New Book</button>
      </div>
 
      <div className="lms-admin-table-container">
        <table className="lms-admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td style={{ fontWeight: '600' }}>{book.title}</td>
                <td>
                  <span className={`lms-badge ${book.available ? 'available' : 'unavailable'}`}>
                    {book.available ? 'Available' : 'Borrowed'}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="lms-admin-btn danger" onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {showModal && (
        <div className="lms-modal-overlay">
          <div className="lms-modal">
            <h2 className="lms-admin-title">Add New Book</h2>
            <form className="lms-auth-form" onSubmit={handleAddBook}>
              <div className="lms-auth-group">
                <label className="lms-auth-label">Book Title</label>
                <input
                  className="lms-auth-input"
                  value={newBook.title}
                  onChange={e => setNewBook({ ...newBook, title: e.target.value })}
                  required
                />
              </div>
              <div className="lms-auth-group">
                <label className="lms-auth-label">Author Name</label>
                <input
                  className="lms-auth-input"
                  value={newBook.author}
                  onChange={e => setNewBook({ ...newBook, author: e.target.value })}
                  required
                />
              </div>
              <div className="lms-auth-group">
                <label className="lms-auth-label">ISBN</label>
                <input
                  className="lms-auth-input"
                  value={newBook.isbn}
                  onChange={e => setNewBook({ ...newBook, isbn: e.target.value })}
                  required
                />
              </div>
              <div className="lms-auth-group">
                <label className="lms-auth-label">Description</label>
                <textarea
                  className="lms-auth-input"
                  style={{ minHeight: '100px', resize: 'vertical' }}
                  value={newBook.description}
                  onChange={e => setNewBook({ ...newBook, description: e.target.value })}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="lms-admin-btn primary" style={{ flex: 1 }}>Add Book</button>
                <button type="button" className="lms-admin-btn danger" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
 
export default BookManagement
