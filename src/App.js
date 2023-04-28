import {Component} from 'react'
import Cookies from 'js-cookie'
import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'
import ProtectedRoute from './ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import NotFound from './components/NotFound'
import InstaContext from './Context/InstaContext'

class App extends Component {
  state = {searchPosts: [], searchVal: '', searchView: false}

  onSearchFetching = val => {
    if (val === '') {
      this.setState({searchView: false})
    } else {
      this.setState({searchView: true, searchVal: val})
    }
  }

  render() {
    const {searchPosts, searchVal, searchView} = this.state
    console.log(searchPosts)
    return (
      <InstaContext.Provider
        value={{
          searchPosts,
          onSearchFetching: this.onSearchFetching,
          searchView,
          searchVal,
        }}
      >
        <div className="app">
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/my-profile" component={MyProfile} />
            <ProtectedRoute exact path="/users/:id" component={UserProfile} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </InstaContext.Provider>
    )
  }
}

export default App
