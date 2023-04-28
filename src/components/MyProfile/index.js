import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Header from '../Header'
import Failure from '../Failure'
import ProfileBody from '../ProfileBody'
import './index.css'

class MyProfile extends Component {
  state = {status: '', details: {}}

  componentDidMount = async () => {
    this.onFetching()
  }

  onFetching = async () => {
    this.setState({status: 'Loading'})
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    let response = await fetch(
      `https://apis.ccbp.in/insta-share/my-profile`,
      options,
    )

    if (response.ok === true) {
      response = await response.json()

      const updatedDetails = {
        userId: response.profile.user_id,
        userName: response.profile.user_name,
        profilePic: response.profile.profile_pic,
        followersCount: response.profile.followers_count,
        followingCount: response.profile.following_count,
        postsCount: response.profile.posts_count,
        posts: response.profile.posts,
        userBio: response.profile.user_bio,
        stories: response.profile.stories,
      }
      this.setState({status: 'Success', details: updatedDetails})
    } else {
      this.setState({status: 'Failure'})
    }
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

  successView = () => {
    const {details} = this.state

    return (
      <div>
        <Header />
        <ProfileBody details={details} val="my" />
      </div>
    )
  }

  render() {
    const {details, status} = this.state
    console.log(details)
    return (
      <div>
        {(() => {
          switch (status) {
            case 'Success':
              return this.successView()
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
            case 'Failure':
              return <Failure func={this.onFetching} />

            default:
              return null
          }
        })()}
      </div>
    )
  }
}

export default MyProfile
