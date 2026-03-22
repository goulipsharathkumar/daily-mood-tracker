import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
    showError: false,
  }

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onToggleShowPassword = () => {
    this.setState(prev => ({showPassword: !prev.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showError: true})
  }

  onSubmitForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
    })
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showPassword, errorMsg, showError} = this.state
    if (Cookies.get('jwt_token') !== undefined) return <Redirect to="/" />
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-slides/monthly-emojis-bg.png"
              alt="Daily Mood Tracker"
              className="login-logo-img"
            />
            <h1 className="login-title">Daily Mood Tracker</h1>
            <p className="login-subtitle">Track your daily emotions</p>
          </div>
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="form-input"
                value={username}
                onChange={this.onChangeUsername}
                placeholder="Enter your username"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-input"
                value={password}
                onChange={this.onChangePassword}
                placeholder="Enter your password"
              />
            </div>
            <div className="show-password-container">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={this.onToggleShowPassword}
                className="checkbox-input"
              />
              <label htmlFor="showPassword" className="show-password-label">
                Show Password
              </label>
            </div>
            {showError && <p className="error-message">*{errorMsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
