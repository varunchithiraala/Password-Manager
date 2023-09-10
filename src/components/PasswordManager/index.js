import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const colors = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5',
  'color6',
  'color7',
  'color8',
]

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    searchInput: '',
    showPasswords: false,
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onAddPasswordItem = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const randomColor = colors[Math.ceil(Math.random() * colors.length - 1)]
    if (websiteInput !== '' && usernameInput !== '' && passwordInput !== '') {
      const passwordDetails = {
        id: v4(),
        website: websiteInput,
        username: usernameInput,
        password: passwordInput,
        bgColor: randomColor,
      }
      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, passwordDetails],
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
      }))
    }
  }

  onClickDeletePassword = id => {
    const {passwordsList} = this.state
    const updatedPasswords = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordsList: updatedPasswords})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getPasswordsList = () => {
    const {passwordsList, searchInput} = this.state
    const updatedPasswordsList = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return updatedPasswordsList
  }

  onChangePasswordView = () => {
    this.setState(prevState => ({
      showPasswords: !prevState.showPasswords,
    }))
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      showPasswords,
    } = this.state
    const updatedPasswordsList = this.getPasswordsList()
    const passwordsCount = updatedPasswordsList.length
    return (
      <div className="password-manager-app-container">
        <div className="password-manager-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            className="password-manager-app-logo"
            alt="app logo"
          />
          <div className="password-manager-top-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              className="password-manager-small-image"
              alt="password manager"
            />
            <form
              className="password-manager-form-container"
              onSubmit={this.onAddPasswordItem}
            >
              <h1 className="add-new-password">Add New Password</h1>
              <div className="input-container">
                <div className="input-logo-icon">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    className="input-logo"
                    alt="website"
                  />
                </div>
                <div className="input-element">
                  <input
                    type="text"
                    className="form-input"
                    onChange={this.onChangeWebsiteInput}
                    value={websiteInput}
                    placeholder="Enter Website"
                  />
                </div>
              </div>
              <div className="input-container">
                <div className="input-logo-icon">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    className="input-logo"
                    alt="username"
                  />
                </div>
                <div className="input-element">
                  <input
                    type="text"
                    className="form-input"
                    onChange={this.onChangeUsernameInput}
                    value={usernameInput}
                    placeholder="Enter Username"
                  />
                </div>
              </div>
              <div className="input-container">
                <div className="input-logo-icon">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    className="input-logo"
                    alt="password"
                  />
                </div>
                <div className="input-element">
                  <input
                    type="password"
                    className="form-input"
                    onChange={this.onChangePasswordInput}
                    value={passwordInput}
                    placeholder="Enter Password"
                  />
                </div>
              </div>
              <div className="add-button-container">
                <button type="submit" className="form-add-button">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              className="password-manager-large-image"
              alt="password-manager"
            />
          </div>
          <div className="password-manager-bottom-container">
            <div className="passwords-header">
              <div className="passwords-count-container">
                <h1 className="your-passwords">Your Passwords</h1>
                <div className="passwords-counter">
                  <p className="passwords-count">{passwordsCount}</p>
                </div>
              </div>
              <div className="input-container input-search-element-container">
                <div className="input-logo-icon">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    className="input-logo"
                    alt="search"
                  />
                </div>
                <div className="input-element">
                  <input
                    type="search"
                    className="search-input"
                    onChange={this.onChangeSearchInput}
                    value={searchInput}
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
            <hr className="hr-line" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="check"
                className="checkbox"
                value={showPasswords}
                onChange={this.onChangePasswordView}
              />
              <label htmlFor="check" className="show-passwords">
                Show Passwords
              </label>
            </div>
            {updatedPasswordsList.length === 0 ? (
              <div className="no-passwords-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-image"
                />
                <p className="no-passwords">No Passwords</p>
              </div>
            ) : (
              <ul className="passwords-container">
                {updatedPasswordsList.map(eachPassword => (
                  <PasswordItem
                    key={eachPassword.id}
                    passwordDetails={eachPassword}
                    deletePassword={this.onClickDeletePassword}
                    showPasswords={showPasswords}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
