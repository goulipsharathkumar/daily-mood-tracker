import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-page">
    <div className="not-found-content">
      <div className="not-found-emoji">😕</div>
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-heading">Page Not Found</h2>
      <p className="not-found-text">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link to="/" className="not-found-btn">
        Go to Home
      </Link>
    </div>
  </div>
)

export default NotFound
