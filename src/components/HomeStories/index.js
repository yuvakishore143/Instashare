import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import './index.css'
import Failure from '../Failure'

class HomeStories extends Component {
  state = {stories: [], status: ''}

  componentDidMount() {
    this.fetching()
  }

  settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  }

  fetching = async () => {
    this.setState({status: 'Loading'})
    const token = Cookies.get('jwt_token')
    const obj = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    let response = await fetch('https://apis.ccbp.in/insta-share/stories', obj)
    if (response.ok === true) {
      response = await response.json()
      this.setState({stories: response.users_stories, status: 'Success'})
    } else {
      this.setState({status: 'Failure'})
    }
  }

  render() {
    const {stories, status} = this.state
    return (
      <div className="story-cont">
        {(() => {
          switch (status) {
            case 'Success':
              return (
                <ul>
                  <Slider {...this.settings}>
                    {stories.map(story => (
                      <li
                        id={story.user_id}
                        className="slick-item"
                        key={story.user_id}
                      >
                        <img
                          className="story-image"
                          src={story.story_url}
                          alt="user story"
                        />
                        <p>{story.user_name}</p>
                      </li>
                    ))}
                  </Slider>
                </ul>
              )
            case 'Failure':
              return <Failure func={this.fetching} />
            case 'Loading':
              return (
                <div className="loader-container stories-loader">
                  <Loader
                    type="TailSpin"
                    color="#4094EF"
                    height={50}
                    width={50}
                  />
                </div>
              )

            default:
              return null
          }
        })()}
      </div>
    )
  }
}
export default HomeStories
