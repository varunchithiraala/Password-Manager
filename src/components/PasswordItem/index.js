import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePassword, showPasswords} = props
  const {id, website, username, password, bgColor} = passwordDetails
  const initialLetter = website.slice(0, 1).toUpperCase()

  const onDeletePassword = () => {
    deletePassword(id)
  }

  return (
    <li className="password-item">
      <div className="password-details-container">
        <div className={`password-item-initial-container ${bgColor}`}>
          <p className="password-item-initial-text">{initialLetter}</p>
        </div>
        <div className="password-item-details">
          <p className="password-item-name">{website}</p>
          <p className="password-item-name">{username}</p>
          {showPasswords ? (
            <p className="password-item-name">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="password-item-stars-image"
            />
          )}
        </div>
      </div>

      <button
        className="password-item-delete-button"
        type="button"
        data-testid="delete"
        onClick={onDeletePassword}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="password-item-delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
