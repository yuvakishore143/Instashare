import {HiOutlineChevronUp} from 'react-icons/hi'
import {FaSearch} from 'react-icons/fa'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const DropDown = props => {
  const {location, fetchFunc, changeFunc, searchVal, onLogout, onClose} = props

  const onSearchClick = () => {
    const mobileSearch = document.querySelector('.mobile-search-cont')
    mobileSearch.classList.toggle('mobile-search-cont-show')
  }

  return (
    <>
      <div className="burger-cont">
        <ul>
          <li>
            <Link
              exact
              className={`${
                location.pathname === '/' ? 'active' : ''
              } header-links`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              exact
              className={`${
                location.pathname === '/my-profile' ? 'active' : ''
              } header-links`}
              to="/my-profile"
            >
              Profile
            </Link>
          </li>
          <li>
            <button
              className="mobile-search-btn"
              onClick={onSearchClick}
              type="button"
            >
              Search
            </button>
          </li>

          <li>
            <button className="logout-btn" type="button" onClick={onLogout}>
              Logout
            </button>
          </li>
          <li>
            <button className="close-btn" type="button" onClick={onClose}>
              <HiOutlineChevronUp className="close-icon" />
            </button>
          </li>
        </ul>
      </div>
      <div className="mobile-search-cont  header-search-cont">
        <input
          onChange={e => {
            changeFunc(e.target.value)
          }}
          type="search"
          value={searchVal}
          placeholder="Search Caption"
        />
        <button
          onClick={() => {
            fetchFunc()
          }}
          className="header-search-btn"
          type="button"
          // testid="searchIcon"
        >
          <FaSearch />
        </button>
      </div>
    </>
  )
}

export default withRouter(DropDown)
