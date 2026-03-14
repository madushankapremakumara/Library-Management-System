import '../styles/Footer.css'
 
const links = ["About", "Contact", "Support"]
 
function Footer() {
  return (
    <footer className="lms-footer">
      <div className="lms-footer-links">
        {links.map((link) => (
          <a key={link} className="lms-footer-link" href="#">{link}</a>
        ))}
      </div>
      <p className="lms-footer-copy">Library Management System © 2026 All Rights Reserved</p>
    </footer>
  )
}
 
export default Footer