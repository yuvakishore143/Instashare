import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import HomeStories from '../HomeStories'

import HomePost from '../HomePost'
import './index.css'
import Failure from '../Failure'
import Search from '../Search'
import InstaContext from '../../Context/InstaContext'

class Home extends Component {
  state = {status: '', posts: [], search: '', searchView: false}

  componentDidMount() {
    this.onPostsFetching()
  }

  onPostsFetching = async () => {
    this.setState({status: 'Loading'})
    const token = Cookies.get('jwt_token')
    const object = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    let response = await fetch(`https://apis.ccbp.in/insta-share/posts`, object)

    if (response.ok === true) {
      response = await response.json()
      this.setState({status: 'Success', posts: response.posts})
    } else {
      this.setState({status: 'Failure'})
    }
  }

  //   onSearchValChange = val => {
  //     this.setState({search: val})
  //     console.log(val)
  //   }

  statusChecker = () => {
    const {status} = this.state

    switch (status) {
      case 'Loading':
        return (
          <div className="loader-container">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )
      case 'Success':
        return this.successView()
      case 'Failure':
        return <Failure func={this.onPostsFetching} />

      default:
        return null
    }
  }

  successView = () => {
    const {posts} = this.state
    return (
      <ul>
        {posts.map(item => (
          <HomePost id={item.post_id} key={item.post_id} post={item} />
        ))}
      </ul>
    )
  }

  //   searchStatusChange = val => {
  //     this.setState({searchView: val})
  //   }

  render() {
    const {search} = this.state
    return (
      <InstaContext.Consumer>
        {value => {
          const {searchView, searchPosts} = value
          return (
            <div className="home-page">
              <div className="home-min-page">
                <Header />
                <div className="home-body">
                  {searchView === false ? (
                    <>
                      <div className="stories-cont">
                        <HomeStories />
                      </div>
                      <div className="home-body">{this.statusChecker()}</div>
                    </>
                  ) : (
                    <div>
                      <Search />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </InstaContext.Consumer>
    )
  }
}

export default Home
