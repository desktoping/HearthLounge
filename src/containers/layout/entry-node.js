import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const EntryNode = ({ user, handleLogout }) => {
  const userObjExist = user && !(Object.keys(user).length === 1 && user.constructor === Object)
  return (
    <li className="nav__list--item login">
      <Link className="nav__list--linkContainer" to={`${user ? '/dashboard' : '/sign-in'}` }>
        <div className="nav__list--link">
          {
            (user && user.avatar) && <div className="nav__list--imageWrapper">
              <img src={user.avatar} alt={`${user.username}'s profile`}/>
            </div>
          }
          {
            !(user && user.avatar) && <span className="hs-icon icon-login" />
          }

          {
            userObjExist && <div className="nav__list--labelWrapper">
              {user.username}
              <ul className="submenu">
                <li onClick={(e) => handleLogout(e)}>
                  <Link to="/">
                    <span className="hs-icon icon-logout" />
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          }

          {
            !userObjExist && <div>Sign In</div>
          }
        </div>
      </Link>
    </li>
  )
}

export default EntryNode

EntryNode.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string
  }),
  handleLogout: PropTypes.func.isRequired
}