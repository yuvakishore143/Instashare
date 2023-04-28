import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ProfileBody from '../ProfileBody'
import Failure from '../Failure'

class UserProfile extends Component {
  state = {status: '', details: {}}

  componentDidMount() {
    this.onFetching()
  }

  onFetching = async () => {
    this.setState({status: 'Loading'})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/users/${id}`,
      options,
    )
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        profile: {
          id: data.user_details.id,
          userId: data.user_details.user_id,
          userName: data.user_details.user_name,
          profilePic: data.user_details.profile_pic,
          followersCount: data.user_details.followers_count,
          followingCount: data.user_details.following_count,
          userBio: data.user_details.user_bio,
          postsCount: data.user_details.posts_count,
          posts: data.user_details.posts,
          stories: data.user_details.stories,
        },
      }

      this.setState({
        details: updatedData.profile,
        status: 'Success',
      })
    } else {
      this.setState({status: 'Failure'})
    }
  }

  render() {
    const {details, status} = this.state
    return (
      <div>
        {(() => {
          switch (status) {
            case 'Success':
              return <ProfileBody val="user" details={details} />
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

export default UserProfile
