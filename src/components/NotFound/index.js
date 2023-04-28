import './index.css'
import {Link} from 'react-router-dom'

const NotFound = props => {
  const {history} = props

  return (
    <div className="not-found">
      <img
        src="https://res.cloudinary.com/dxqbhqv2h/image/upload/v1682578281/erroring_1_fzk4jc.png"
        alt="page not found"
      />
      <h1>PAGE NOT FOUND</h1>
      <p>we are sorry, the page you requested could not be found</p>
      <p>Please go back to the homepage</p>
      <Link to="/" className="link">
        <button className="button" type="button">
          Home Page
        </button>
      </Link>
    </div>
  )
}

export default NotFound
