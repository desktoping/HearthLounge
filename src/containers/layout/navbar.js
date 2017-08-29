import React from 'react'
import { Link } from 'react-router-dom'
import {navItems} from '../../data/nav'
import EntryNode from './entry-node'

const Navbar = ({handleLogout, user={}, playerClass}) => {
  const dropdown = (el, index) => Object.keys(el).includes('submenu') ? 
    (
      <ul className="submenu">
        {
          navItems[index].submenu.map((item, id) => (
            <li className={el.submenu[id].url} key={`menu-${id}`}>
              <Link to={`/${el.url}/${item.url}/overview`}>
                <span className={`submenu__icon hs-icon icon-${el.submenu[id].url}`} />
                <div className="icon-label">{el.submenu[id].name}</div>
              </Link>
            </li>
          ))
        }
      </ul>
    ) : 
    ( <div /> )

  return (
    <nav>
      <ul className="nav__list">
        <li className="nav__list--item logo">
          <div className="logo-wrapper">
            <span className="hs-icon icon-hl-logo"></span>
            <div className="text-wrapper">
              <p>Hearth</p>
              <p>Lounge</p>
            </div>
          </div>
        </li>
        {navItems.map((element, index) =>
            <li key={index} className={`nav__list--item ${element.url}`}>
              <Link className="nav__list--linkContainer"
                    to={element.url === 'create-deck'
                        ? playerClass
                            ? `/${element.url}/${playerClass}`
                            : `/${element.url}`
                        : `/${element.url}`} activeClassName="active">
                <div className="nav__list--link">
                  <span className={`hs-icon ${element.icon}`}></span>
                  <div>{element.name}</div>
                  {dropdown(element, index)}
                </div>
              </Link>
            </li>
        )}
        <EntryNode handleLogout={handleLogout} user={user}/>
      </ul>
    </nav>
  )
}


Navbar.propTypes = {
  user: React.PropTypes.object
}

export default Navbar