import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { fetchBooks, borrowBook, returnBook, fetchUser, fetchCategories } from './api'
 
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import BookList from './components/BookList'
import ActionPanel from './components/ActionPanel'
import AnnouncementBanner from './components/AnnouncementBanner'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminDashboard from './pages/AdminDashboard'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
 
import './styles/global.css'
 
function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('lms_user')
    return saved ? JSON.parse(saved) : null
  })
 
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [bookList, setBookList] = useState([])
  const [activeAction, setActiveAction] = useState('Borrow Book')
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    if (user) {
      localStorage.setItem('lms_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('lms_user')
    }
  }, [user])
 
  useEffect(() => {
    const syncUser = async () => {
      if (user?.id) {
        try {
          const response = await fetchUser(user.id)
          setUser(response.data)
        } catch (error) {
          console.error('Failed to sync profile:', error)
          if (error.response?.status === 404) {
            setUser(null) // Handle deleted user
          }
        }
      }
    }
    syncUser()
  }, [])

  useEffect(() => {
    loadBooks()
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const response = await fetchCategories()
      setCategories(response.data)
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const loadBooks = async () => {
    try {
      const response = await fetchBooks()
      setBookList(response.data)
    } catch (error) {
      console.error('Error loading books:', error)
    } finally {
      setLoading(false)
    }
  }
 
  const filteredBooks = bookList.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || 
                         book.description.toLowerCase().includes(search.toLowerCase()) ||
                         book.isbn?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === '' || book.category === parseInt(selectedCategory)
    return matchesSearch && matchesCategory
  })
 
  const handleBorrow = async (id) => {
    try {
      await borrowBook(id)
      loadBooks() // Refresh list
    } catch (error) {
      alert('Failed to borrow book: ' + (error.response?.data?.error || error.message))
    }
  }
 
  const handleReturn = async (id) => {
    try {
      await returnBook(id)
      loadBooks() // Refresh list
    } catch (error) {
      alert('Failed to return book: ' + (error.response?.data?.error || error.message))
    }
  }
 
  const handleLogout = () => setUser(null)
 
  return (
    <BrowserRouter>
      <div className="lms-app">
        <Header user={user} onLogout={handleLogout} />
        <main className="lms-main">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <>
                    <SearchBar 
                      search={search} 
                      onSearch={setSearch} 
                      categories={categories}
                      selectedCategory={selectedCategory}
                      onCategoryChange={setSelectedCategory}
                    />
                    <h2 className="lms-section-title">📖 Books</h2>
                    {loading ? (
                      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--gray-400)' }}>
                        <div className="lms-loader" style={{ marginBottom: '1rem' }}>⌛</div>
                        Loading library catalog...
                      </div>
                    ) : (
                      <BookList books={filteredBooks} onBorrow={handleBorrow} onReturn={handleReturn} />
                    )}
                    <h2 className="lms-section-title">⚡ Quick Actions</h2>
                    <div className="lms-bottom-grid">
                      <ActionPanel activeAction={activeAction} onActionChange={setActiveAction} />
                      <AnnouncementBanner />
                    </div>
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/login" element={<Login onLogin={setUser} />} />
            <Route path="/signup" element={<Signup onLogin={setUser} />} />
            <Route 
              path="/admin" 
              element={
                user?.role === 'librarian' ? (
                  <AdminDashboard books={bookList} setBooks={setBookList} />
                ) : (
                  <Navigate to="/" />
                )
              } 
            />
            <Route 
              path="/profile" 
              element={
                user ? (
                  <Profile user={user} setUser={setUser} bookList={bookList} />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/settings" 
              element={
                user ? (
                  <Settings user={user} setUser={setUser} />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
 
export default App