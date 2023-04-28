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
  state = {searchPosts: [], searchStatus: '', searchView: false}

  onSearchFetching = async val => {
    if (val === '') {
      this.setState({searchView: false})
    } else {
      this.setState({searchStatus: 'Loading', searchView: true})
      const token = Cookies.get('jwt_token')
      const object = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      let response = await fetch(
        `https://apis.ccbp.in/insta-share/posts?search=${val}`,
        object,
      )

      if (response.ok === true) {
        response = await response.json()
        this.setState({
          searchStatus: 'Success',
          searchPosts: response.posts,
          searchView: true,
        })
      } else {
        this.setState({searchStatus: 'Failure', searchView: true})
      }
    }
  }

  //   onSearchFetching = () => {
  //     this.setState({searchView: true})
  //   }

  render() {
    const {searchPosts, searchStatus, searchView} = this.state
    console.log(searchPosts)
    return (
      <InstaContext.Provider
        value={{
          searchPosts,
          onSearchFetching: this.onSearchFetching,
          searchStatus,
          searchView,
        }}
      >
        <div>
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
