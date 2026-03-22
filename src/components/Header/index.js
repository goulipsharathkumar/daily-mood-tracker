import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = ({history}) => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.push('/login')
  }
  return (
    <nav className="header-nav">
      <div className="header-content">
        <Link to="/" className="header-logo-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/monthly-emojis-bg.png"
            alt="Daily Mood Tracker"
            className="header-logo-img"
          />
          <h1 className="header-brand">Daily Mood Tracker</h1>
        </Link>
        <div className="header-links">
          <Link to="/" className="header-link">
            Home
          </Link>
          <Link to="/reports" className="header-link">
            Reports
          </Link>
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
