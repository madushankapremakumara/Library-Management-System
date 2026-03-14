import '../styles/BookList.css'
 
function BookList({ books, onBorrow, onReturn }) {
  return (
    <>
      <div className="lms-books-grid">
        {books.length === 0 && (
          <p className="lms-no-results">No books found.</p>
        )}
        {books.map((book) => (
          <div key={book.id} className="lms-book-card">
            <div className="lms-book-cover" style={{ background: book.cover }}>
              📖
            </div>
            <div className="lms-book-body">
              <div className="lms-book-meta">
                <span className="lms-category-badge">{book.category_name || 'General'}</span>
                <span className="lms-isbn-hint">{book.isbn}</span>
              </div>
              <div className="lms-book-title">{book.title}</div>
              <div className="lms-book-authors">
                by {book.author_list?.map(a => a.name).join(', ') || 'Unknown Author'}
              </div>
              <div className="lms-book-desc">{book.description}</div>
              
              <div className="lms-inventory-status">
                <div className="lms-inventory-bar">
                  <div 
                    className="lms-inventory-fill" 
                    style={{ width: `${(book.available_copies / book.total_copies) * 100}%` }}
                  ></div>
                </div>
                <span className="lms-inventory-text">
                  {book.available_copies} of {book.total_copies} available
                </span>
              </div>

              <div className="lms-book-footer">
                {book.available_copies > 0 ? (
                  <button className="lms-book-action-btn borrow" onClick={() => onBorrow(book.id)}>
                    Borrow →
                  </button>
                ) : (
                  <button className="lms-book-action-btn disabled" disabled>
                    Waitlist
                  </button>
                )}
                <span className={`lms-badge ${book.available_copies > 0 ? "available" : "unavailable"}`}>
                  {book.available_copies > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="lms-see-more-wrap">
        <button className="lms-see-more-btn">See More...</button>
      </div>
    </>
  )
}
 
export default BookList