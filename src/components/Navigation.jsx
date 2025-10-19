import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/' },
    { id: 'communication', label: 'Communication', path: '/communication' },
    { id: 'sign-speller', label: 'Sign Speller', path: '/speller' },
    { id: 'map', label: 'Map', path: '/map' },
    { id: 'learning', label: 'Learning', path: '/learning' },
    { id: 'community', label: 'Community', path: '/community' },
    { id: 'ai-assistant', label: 'AI Assistant', path: '/ai-assistant' },
    { id: 'wellness', label: 'Wellness', path: '/wellness' },
    { id: 'emergency', label: 'Emergency', path: '/emergency' },
    { id: 'settings', label: 'Settings', path: '/settings' }
  ]

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <ul className="nav-list">
          {navItems.map(item => (
            <li key={item.id} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                aria-label={item.label}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
