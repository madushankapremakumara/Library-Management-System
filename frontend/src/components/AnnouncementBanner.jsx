import { useState, useEffect } from 'react'
import { announcements } from '../data/data'
import '../styles/AnnouncementBanner.css'
 
function AnnouncementBanner() {
  const [current, setCurrent] = useState(0)
 
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])
 
  const ann = announcements[current]
 
  return (
    <div className="lms-announcement">
      <div>
        <div className="lms-announcement-tag">{ann.tag}</div>
        <div className="lms-announcement-title">{ann.title}</div>
        <div className="lms-announcement-body">{ann.body}</div>
      </div>
      <div className="lms-announcement-footer">
        <div className="lms-announcement-dots">
          {announcements.map((_, i) => (
            <button
              key={i}
              className={`lms-announcement-dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        <div className="lms-announcement-navs">
          <button
            className="lms-announcement-nav"
            onClick={() => setCurrent((prev) => (prev - 1 + announcements.length) % announcements.length)}
          >←</button>
          <button
            className="lms-announcement-nav"
            onClick={() => setCurrent((prev) => (prev + 1) % announcements.length)}
          >→</button>
        </div>
      </div>
    </div>
  )
}
 
export default AnnouncementBanner