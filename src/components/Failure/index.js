import './index.css'

const Failure = props => {
  const {func} = props
  return (
    <div className="failure-page">
      <img
        src="https://res.cloudinary.com/dxqbhqv2h/image/upload/v1682599709/alert-triangle_pdwfab.png"
        alt="failure view"
      />
      <p>Something Went wrong, Please try again.</p>
      <button type="button" onClick={func}>
        Try Again
      </button>
    </div>
  )
}

export default Failure
