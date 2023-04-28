import {FaRegComment} from 'react-icons/fa'
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import './index.css'

class HomePost extends Component {
  state = {liked: false, postCount: 0}

  componentDidMount() {
    const {post} = this.props
    this.setState({postCount: post.likes_count})
  }

  onLike = async () => {
    const {post} = this.props
    const token = Cookies.get('jwt_token')
    const {liked} = this.state
    const data = {like_status: !liked}
    const obj = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts/${post.post_id}/like`,
      obj,
    )
    if (response.ok === true) {
      if (liked === false) {
        this.setState(prevState => ({
          postCount: prevState.postCount + 1,
          liked: !prevState.liked,
        }))
      } else {
        this.setState(prevState => ({
          postCount: prevState.postCount - 1,
          liked: !prevState.liked,
        }))
      }
    }
  }

  render() {
    const {post, history} = this.props
    const {liked, postCount} = this.state
    return (
      <li key={post.user_id} className="post-item">
        <div className="post-header">
          <img
            src={post.profile_pic}
            alt="post author profile"
            className="profile-pic-p"
          />
          <Link to={`/users/${post.user_id}`} className="link">
            <p className="username-p">{post.user_name}</p>
          </Link>
        </div>
        <div className="post-img-cont">
          <img src={post.post_details.image_url} alt="post" />
        </div>
        <div>
          <div className="post-icons">
            {liked ? (
              <button
                className="like-btn"
                // testid="unLikeIcon"
                type="button"
                onClick={this.onLike}
              >
                <FcLike className="react-image" />
              </button>
            ) : (
              <button
                className="like-btn"
                // testid="likeIcon"
                type="button"
                onClick={this.onLike}
              >
                <BsHeart className="react-image" />
              </button>
            )}
            <button className="button-reacts" type="button">
              <FaRegComment className="react-image" />
            </button>
            <button className="button-reacts" type="button">
              <BiShareAlt className="react-image" />
            </button>
          </div>
          <div className="post-info">
            <p className="post-likes-count">{`${postCount} Likes`}</p>
            <p className="post-caption">{post.post_details.caption}</p>
            <ul className="post-comments">
              {post.comments.map(each => (
                <li className="comment" key={each.userId}>
                  <p>
                    <span className="comment-name">{each.user_name}</span>
                    {each.comment}
                  </p>
                </li>
              ))}
            </ul>
            <p className="post-created-at">{post.created_at}</p>
          </div>
        </div>
      </li>
    )
  }
}
export default withRouter(HomePost)
