import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import HomePost from '../HomePost'
import InstaContext from '../../Context/InstaContext'
import Failure from '../Failure'
import './index.css'

class Search extends Component {
  state = {status: '', posts: []}

  componentDidMount() {
    this.onSearchFetching()
  }

  onSearchFetching = async () => {
    const {val} = this.props
    this.setState({status: 'Loading'})
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
        status: 'Success',
        posts: response.posts,
      })
    } else {
      this.setState({status: 'Failure'})
    }
  }

  render() {
    const {posts, search, status} = this.state
    console.log(posts)
    return (
      <InstaContext.Consumer>
        {value => {
          const {searchPosts, searchStatus} = value

          return (
            <div className="search-page">
              {(() => {
                switch (status) {
                  case 'Loading':
                    return (
                      <div className="loader-container">
                        <Loader
                          type="TailSpin"
                          color="#4094EF"
                          height={50}
                          width={50}
                        />
                      </div>
                    )
                  case 'Success':
                    return (
                      <div className="search-cont">
                        <h1>Search Results</h1>
                        {posts.length === 0 ? (
                          <div className="no-search-found">
                            <img
                              src="https://res.cloudinary.com/dxqbhqv2h/image/upload/v1682579953/Group_rtfv7v.png"
                              alt="no search found"
                            />
                            <h1>Search Not Found</h1>
                            <p>Try different keyword or search again</p>
                          </div>
                        ) : (
                          <ul className="Posts-container-search">
                            {posts.map(each => (
                              <HomePost post={each} key={each.postId} />
                            ))}
                          </ul>
                        )}
                      </div>
                    )
                  case 'Failure':
                    return (
                      <Failure
                        func={() => {
                          this.onSearchFetching(search)
                        }}
                      />
                    )

                  default:
                    return null
                }
              })()}
            </div>
          )
        }}
      </InstaContext.Consumer>
    )
  }
}

export default Search
