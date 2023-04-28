import Slider from 'react-slick'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Header from '../Header'
import './index.css'

const ProfileBody = props => {
  const {details, val} = props

  console.log(details)

  const settings = {
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
  const {
    userId,
    userName,
    profilePic,
    posts,
    userBio,
    stories,
    followersCount,
    followingCount,
    postsCount,
  } = details

  const ItemList = () => (
    <ul className="data-lists">
      <li>
        <p>
          <span>{postsCount}</span> Posts
        </p>
      </li>
      <li>
        <p>
          <span>{followersCount}</span> Followers
        </p>
      </li>
      <li>
        <p>
          <span>{followingCount}</span> Following
        </p>
      </li>
    </ul>
  )

  return (
    <li className="profile-body">
      <div className="mobile-view">
        <h1 className="profile-name ">{userName}</h1>
        <div className="profile-first-cont ">
          <div className="profile-img-cont">
            <img src={profilePic} alt={`${val} profile`} />
          </div>
          {ItemList()}
        </div>
        <div className="profile-second-cont">
          <p>{userId}</p>
          <p>{userBio}</p>
        </div>
      </div>

      <div className="desktop-profile-view ">
        <div className="profile-first-cont">
          <div className="profile-img-cont ">
            <img src={profilePic} alt={`${val} profile`} />
          </div>
          <div className="desktop-right-view">
            <h1 className="profile-name">{userName}</h1>
            {ItemList()}
            <div className="profile-second-cont">
              <h1>{userId}</h1>
              <p>{userBio}</p>
            </div>
          </div>
        </div>
      </div>
      <ul className="profile-third-cont">
        <Slider {...settings}>
          {stories.map(story => (
            <li className="slick-profile-item" key={story.id}>
              <img
                className="profile-story-image"
                src={story.image}
                alt={`${val} story`}
              />
            </li>
          ))}
        </Slider>
      </ul>
      <hr />
      <div className="profile-fourth-cont">
        <div className="profile-posts-heading-box">
          <BsGrid3X3 />
          <h1>Posts</h1>
        </div>

        {posts.length === 0 ? (
          <div>
            <BiCamera />
            <h1>No posts</h1>
          </div>
        ) : (
          <ul>
            {details.posts.map(item => (
              <li key={item.id}>
                <img
                  className="profile-post-img"
                  src={item.image}
                  alt={`${val} post`}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

export default ProfileBody
