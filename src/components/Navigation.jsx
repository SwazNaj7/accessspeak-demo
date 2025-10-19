import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/', icon: '🏠' },
    { id: 'communication', label: 'Communication', path: '/communication', icon: '💬' },
    { id: 'sign-speller', label: 'Sign Speller', path: '/speller', icon: '✋' },
    { id: 'map', label: 'Map', path: '/map', icon: '🗺️' },
    { id: 'learning', label: 'Learning', path: '/learning', icon: '🎓' },
    { id: 'community', label: 'Community', path: '/community', icon: '🤝' },
    { id: 'ai-assistant', label: 'AI Assistant', path: '/ai-assistant', icon: '🤖' },
    { id: 'wellness', label: 'Wellness', path: '/wellness', icon: '💪' },
    { id: 'emergency', label: 'Emergency', path: '/emergency', icon: '🚨' },
    { id: 'settings', label: 'Settings', path: '/settings', icon: '⚙️' }
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
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
