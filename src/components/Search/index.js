import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import HomePost from '../HomePost'
import InstaContext from '../../Context/InstaContext'
import Failure from '../Failure'
import './index.css'

class Search extends Component {
  state = {status: '', search: '', posts: []}

  render() {
    const {posts, search, status} = this.state
    return (
      <InstaContext.Consumer>
        {value => {
          const {searchPosts, searchStatus} = value
          console.log(searchPosts)
          return (
            <div>
              {(() => {
                switch (searchStatus) {
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
                      <div className="search-page">
                        <h1>Search Results</h1>
                        {searchPosts.length === 0 ? (
                          <div className="no-search-found">
                            <img
                              src="https://res.cloudinary.com/dxqbhqv2h/image/upload/v1682579953/Group_rtfv7v.png"
                              alt="no search found"
                            />
                            <h1>Search Not Found</h1>
                            <p>Try different keyword or search again</p>
                          </div>
                        ) : (
                          <ul>
                            {searchPosts.map(item => (
                              <HomePost
                                id={item.post_id}
                                key={item.post_id}
                                post={item}
                              />
                            ))}
                          </ul>
                        )}
                      </div>
                    )

                  case 'Failure':
                    return <Failure />

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
