import React from 'react'
import {Link} from 'react-router-dom'
import _ from 'lodash'

export default ({title, width, icon, children}) =>{
  return (
      <li className={`home__block ${icon} block-width-${width || 1}`}>
        <div className="home__block--header">
          <Link to={`/${icon}`}>
            <span className={`hs-icon icon-${icon}`}></span>
            <p>{_.upperCase(title || icon)}</p>
          </Link>
        </div>
        <div className="home__block--body">
          {children}
        </div>
      </li>
  )
}
