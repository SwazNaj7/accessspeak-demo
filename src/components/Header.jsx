import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import ensyncLogo from '../assets/ensync logo.jpg'

function Header({ userProfile }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const notifications = [
    { id: 1, text: 'New accessibility feature available', time: '5m ago', unread: true },
    { id: 2, text: 'Community event starting soon', time: '1h ago', unread: true },
    { id: 3, text: 'Weekly progress report ready', time: '2h ago', unread: false }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="header" role="banner">
      <div className="header-container">
        <Link to="/" className="logo" aria-label="EnSync Home">
          <img src={ensyncLogo} alt="EnSync Logo" className="logo-icon" />
          <div className="logo-text">
            <h1 className="app-title">EnSync</h1>
            <p className="app-tagline">Speak, Move, Stay EnSync</p>
          </div>
        </Link>

        <div className="header-actions">
          {/* Quick Accessibility Toggle */}
          <button 
            className="header-btn accessibility-toggle"
            aria-label="Toggle accessibility menu"
            title="Accessibility Options"
          >
            <span className="btn-icon">👁️</span>
          </button>

          {/* Notifications */}
          <div className="notification-wrapper">
            <button 
              className="header-btn notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
              title="Notifications"
            >
              <span className="btn-icon">🔔</span>
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>

            {showNotifications && (
              <div className="notification-dropdown">
                <div className="dropdown-header">
                  <h3>Notifications</h3>
                  <button className="btn-mark-read">Mark all read</button>
                </div>
                <div className="notification-list">
                  {notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`notification-item ${notif.unread ? 'unread' : ''}`}
                    >
                      <p>{notif.text}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  ))}
                </div>
                <Link to="/notifications" className="view-all-link">
                  View All Notifications
                </Link>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="user-menu-wrapper">
            <button 
              className="header-btn user-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="User menu"
              title="User Profile"
            >
              <span className="user-avatar">
                {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : '👤'}
              </span>
              <span className="user-name">{userProfile?.name || 'Guest'}</span>
            </button>

            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <div className="user-avatar-large">
                    {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : '👤'}
                  </div>
                  <div>
                    <p className="user-name-large">{userProfile?.name || 'Guest'}</p>
                    <p className="user-email">{userProfile?.email || 'guest@accessspeak.com'}</p>
                  </div>
                </div>
                <div className="user-menu-divider"></div>
                <Link to="/settings" className="user-menu-item">
                  <span>⚙️</span> Settings
                </Link>
                <Link to="/profile" className="user-menu-item">
                  <span>👤</span> My Profile
                </Link>
                <Link to="/help" className="user-menu-item">
                  <span>❓</span> Help & Support
                </Link>
                <div className="user-menu-divider"></div>
                <button className="user-menu-item logout">
                  <span>🚪</span> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
