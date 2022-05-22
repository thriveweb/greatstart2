import React, { Component } from 'react'
import Link from 'gatsby-link'
import { User, Menu, X } from 'react-feather'
import _get from 'lodash/get'
import _kebabCase from 'lodash/kebabCase'

import Logo from './Logo'
import Button from './Button'
import NavLink from './NavLink'

import { ICONArrowDown } from './Icons.js'

import './Nav.css'

export default class Nav extends Component {
  state = {
    active: false,
    menuItemActive: false
  }

  toggleActive = () =>
    this.setState({
      active: !this.state.active
    })

  render() {
    const { allPages, header } = this.props
    const { active, menuItemActive } = this.state

    const menuItems = _get(header, 'menu') || []

    return (
      <nav className="Nav">
        <div className="Nav--Container container">
          <Link to="/">
            <Logo />
          </Link>
          <button
            className="Nav--MenuButton Button-blank"
            onClick={this.toggleActive}
          >
            {active ? <X /> : <Menu />}
          </button>
          <div className={`Nav--Container--Links ${active ? 'active' : ''}`}>
            {menuItems.map((menuItem, index) => {
              const { title, url, subMenu } = menuItem

              return <div key={`menu-${index}`} className={`NavLinkGroup ${menuItemActive === index ? 'menu-active' : ''}`}>
                <li className='NavLink'>
                  {url
                    ? <Link
                      to={url}
                      onClick={this.toggleActive}
                      >
                        {title}
                      </Link>
                  : `${title}`}
                </li>
                {subMenu &&
                  <div key={`subMenu-${index}`} className='SubNav'>
                    {subMenu.map((subMenuItem, index) => {
                      const { title, url } = subMenuItem

                      return <li
                          className='NavLink'
                          key={index}
                          onClick={this.toggleActive}
                        >
                            <Link to={url}>{title}</Link>
                          </li>
                    })}
                  </div>
                }
                {subMenu &&
                  <span
                  className={`MenuToggle`}
                  onClick={() => this.setState({ menuItemActive: menuItemActive === index ? false : index })}
                  >
                    <ICONArrowDown/>
                  </span>
                }
              </div>
            })}

            <div className="Nav--Container--Sep" />
            <NavLink
              href="https://www.qkenhanced.com.au/webui/Account/Embeddable/?databaseId=5583"
              target="_blank"
              rel="nofollow"
              className="primary"
            >
              <User />
              My Family Lounge
            </NavLink>
            <Link
              className="Button hasShadowHover"
              to="/enrolments/enrolling-great-start-early-learing-centre/"
              onClick={() => this.setState({ menuItemActive: menuItemActive === index ? false : index })}
            >
              Enrol Now
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}
