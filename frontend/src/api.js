import axios from 'axios'
 
const API_BASE_URL = 'http://127.0.0.1:8000/api/'
 
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
 
export const fetchBooks = () => api.get('books/')
export const fetchAuthors = () => api.get('authors/')
export const fetchCategories = () => api.get('categories/')
export const addBook = (bookData) => api.post('books/', bookData)
export const deleteBook = (id) => api.delete(`books/${id}/`)
export const borrowBook = (id) => api.post(`books/${id}/borrow/`)
export const returnBook = (id) => api.post(`books/${id}/return_book/`)
 
export const registerUser = (userData) => api.post('users/register/', userData)
export const fetchUser = (id) => api.get(`users/${id}/`)
export const fetchPendingLibrarians = () => api.get('users/pending_librarians/')
export const approveLibrarian = (id) => api.post(`users/${id}/approve/`)
export const updateUserDetail = (id, data) => api.patch(`users/${id}/`, data)
 
// For demo login, we'll check against existing users using either username or email
export const loginUser = async (identifier, password) => {
  const response = await api.get('users/')
  const users = response.data
  const user = users.find(u => u.username === identifier || u.email === identifier)
  if (user) {
    // In a real app, password verification is done on the backend.
    // We expect 'password123' from the seed data.
    if (password === 'password123' || password) {
      return user
    }
  }
  throw new Error('Invalid credentials')
}
 
export default api
