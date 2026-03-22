import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Login from './components/Login'
import Home from './components/Home'
import Reports from './components/Reports'
import NotFound from './components/NotFound'

import {initialMonthsList} from './data'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      monthsData: initialMonthsList.map(m => ({
        ...m,
        dates: m.dates.map(d => ({...d})),
      })),
    }
  }

  updateMonthsData = monthsData => {
    this.setState({monthsData})
  }

  renderHome = props => {
    const {monthsData} = this.state
    return (
      <Home
        {...props}
        monthsData={monthsData}
        updateMonthsData={this.updateMonthsData}
      />
    )
  }

  renderReports = props => {
    const {monthsData} = this.state
    return <Reports {...props} monthsData={monthsData} />
  }

  render() {
    const token = Cookies.get('jwt_token')
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/"
          render={props =>
            token !== undefined ? (
              this.renderHome(props)
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/reports"
          render={props =>
            token !== undefined ? (
              this.renderReports(props)
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    )
  }
}

export default App
