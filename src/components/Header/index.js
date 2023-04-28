import {Component} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaSearch} from 'react-icons/fa'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'
import DropDown from '../DropDown'
import InstaContext from '../../Context/InstaContext'

class Header extends Component {
  state = {search: ''}

  onLogout = () => {
    const {location, history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onView = () => {
    const mobileSearch = document.querySelector('.mobile-search-cont')
    const bar = document.querySelector('.dropDown-cont')

    bar.classList.add('dropDown-cont-show')
    mobileSearch.classList.remove('mobile-search-cont-show')
  }

  onClose = () => {
    const bar = document.querySelector('.dropDown-cont')
    bar.classList.remove('dropDown-cont-show')
  }

  searchValUpdate = val => {
    this.setState({search: val})
  }

  render() {
    const {search} = this.state
    const {location, history} = this.props
    return (
      <InstaContext.Consumer>
        {value => {
          const {searchStatus, onSearchFetching} = value
          return (
            <>
              <div className="header">
                <div className="header-first-part">
                  <Link className="header-logo-cont header-links" exact to="/">
                    <img
                      src="https://res.cloudinary.com/dxqbhqv2h/image/upload/v1682483752/Standard_Collection_8_lf1cwh.png"
                      alt="website logo"
                      className="header-logo"
                      onClick={() => {
                        onSearchFetching('')
                      }}
                    />
                  </Link>
                  <h1>Insta Share</h1>
                </div>
                <div className="header-second-part">
                  <ul className="desktop-view">
                    <li className="header-search-cont">
                      <input
                        onChange={e => {
                          this.setState({search: e.target.value})
                        }}
                        type="search"
                        value={search}
                        placeholder="Search Caption"
                      />
                      <button
                        onClick={() => {
                          onSearchFetching(search)
                        }}
                        className="header-search-btn"
                        type="button"
                        // testid="searchIcon"
                      >
                        <FaSearch />
                      </button>
                    </li>
                    <li>
                      <Link
                        exact
                        className={`${
                          location.pathname === '/' ? 'active' : ''
                        } header-links`}
                        to="/"
                        onClick={() => {
                          onSearchFetching('')
                        }}
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
                        className="logout-btn"
                        type="button"
                        onClick={this.onLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                  <button
                    onClick={this.onView}
                    type="button"
                    className="mobile-view"
                  >
                    <GiHamburgerMenu className="burger-icon" />
                  </button>
                </div>
              </div>
              <div className="dropDown-cont">
                <DropDown
                  onLogout={this.onLogout}
                  fetchFunc={() => {
                    onSearchFetching(search)
                  }}
                  changeFunc={this.searchValUpdate}
                  searchVal={search}
                  onClose={this.onClose}
                />
              </div>
            </>
          )
        }}
      </InstaContext.Consumer>
    )
  }
}

export default withRouter(Header)
