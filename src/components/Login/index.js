import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', error: ''}

  componentDidMount() {
    const {history} = this.props
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      history.replace('/')
    }
  }

  onLogin = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const data = {username, password}
    const object = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    let response = await fetch('https://apis.ccbp.in/login', object)
    console.log(response)
    if (response.ok === true) {
      response = await response.json()
      this.onLoginSuccess(response)
    } else {
      response = await response.json()
      this.setState({error: response.error_msg})
    }
  }

  onLoginSuccess = res => {
    const {history} = this.props
    const token = res.jwt_token
    console.log(token)
    Cookies.set('jwt_token', token, {expires: 3})
    history.replace('/')
  }

  render() {
    const {username, password, error} = this.state
    return (
      <div className="login-page">
        <div className="login-min-page">
          <div className="login-first-cont">
            <img
              src="https://res.cloudinary.com/dxqbhqv2h/image/upload/v1682483852/Layer_2_tm2yfv.png"
              alt="website login"
            />
          </div>
          <div className="login-second-cont">
            <div className="login-second-min-cont">
              <div className="login-logo-cont">
                <img
                  src="https://res.cloudinary.com/dxqbhqv2h/image/upload/v1682483752/Standard_Collection_8_lf1cwh.png"
                  alt="website logo"
                  className="login-logo"
                />
                <h1>Insta Share</h1>
              </div>
              <form className="login-form" onSubmit={this.onLogin}>
                <div className="login-credential-box">
                  <label htmlFor="usernameId">USERNAME</label>
                  <input
                    id="usernameId"
                    value={username}
                    type="text"
                    onChange={e => this.setState({username: e.target.value})}
                  />
                </div>
                <div className="login-credential-box">
                  <label htmlFor="passwordId">PASSWORD</label>
                  <input
                    id="passwordId"
                    value={password}
                    type="password"
                    onChange={e => this.setState({password: e.target.value})}
                  />
                </div>
                {error && <p className="err">{error}</p>}
                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
