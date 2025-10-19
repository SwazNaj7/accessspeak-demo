import React, { useState } from 'react';
import './EnhancedDashboard.css';
import ProfileSetupModal from './ProfileSetupModal';

const EnhancedDashboard = ({ userProfile, onProfileUpdate }) => {
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const newsItems = [
    {
      id: 1,
      title: 'New Accessibility Features Released',
      category: 'Update',
      icon: '🎉',
      time: '2 hours ago',
      color: '#3b82f6'
    },
    {
      id: 2,
      title: 'Community Event: Virtual ASL Workshop',
      category: 'Event',
      icon: '📅',
      time: '5 hours ago',
      color: '#10b981'
    },
    {
      id: 3,
      title: 'Accessibility Grant Applications Open',
      category: 'News',
      icon: '💰',
      time: '1 day ago',
      color: '#f59e0b'
    }
  ];

  const connectedDevices = [
    { id: 1, name: 'Screen Reader', status: 'active', icon: '🔊', battery: 100 },
    { id: 2, name: 'Hearing Aid', status: 'active', icon: '👂', battery: 85 },
    { id: 3, name: 'Smart Wheelchair', status: 'standby', icon: '♿', battery: 92 }
  ];

  const quickAccessTiles = [
    {
      id: 'communication',
      title: 'Communication Hub',
      icon: '💬',
      color: '#3b82f6',
      description: 'Translate & communicate',
      path: '/communication'
    },
    {
      id: 'map',
      title: 'Accessibility Map',
      icon: '🗺️',
      color: '#10b981',
      description: 'Find accessible routes',
      path: '/map'
    },
    {
      id: 'learning',
      title: 'Learning Center',
      icon: '🎓',
      color: '#8b5cf6',
      description: 'Expand your skills',
      path: '/learning'
    },
    {
      id: 'community',
      title: 'Community',
      icon: '🤝',
      color: '#f59e0b',
      description: 'Connect & support',
      path: '/community'
    },
    {
      id: 'ai-assistant',
      title: 'AI Assistant',
      icon: '🤖',
      color: '#ec4899',
      description: 'Get instant help',
      path: '/ai-assistant'
    },
    {
      id: 'tasks',
      title: 'Task Requests',
      icon: '📋',
      color: '#ef4444',
      description: 'Request assistance',
      path: '/tasks'
    }
  ];

  const achievements = [
    { id: 1, title: '7 Day Streak', icon: '🔥', unlocked: true },
    { id: 2, title: 'First Route', icon: '🗺️', unlocked: true },
    { id: 3, title: 'Community Helper', icon: '🤝', unlocked: true },
    { id: 4, title: 'Learning Master', icon: '🎓', unlocked: false }
  ];

  const todayStats = {
    stepsCompleted: 8234,
    tasksCompleted: 5,
    learningMinutes: 45,
    communityPosts: 3
  };

  return (
    <div className="enhanced-dashboard">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1>Welcome back, {userProfile?.name || 'Friend'}! 👋</h1>
          <p className="welcome-subtitle">Here's what's happening today</p>
        </div>
        <div className="welcome-actions">
          <button className="btn-profile" onClick={() => setShowProfileSetup(true)}>
            ⚙️ Settings
          </button>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-info">
            <h3>{todayStats.tasksCompleted}</h3>
            <p>Tasks Done</p>
          </div>
          <div className="stat-trend up">↑ 25%</div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <h3>{todayStats.learningMinutes}m</h3>
            <p>Learning Time</p>
          </div>
          <div className="stat-trend up">↑ 8%</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💬</span>
          <div className="stat-info">
            <h3>{todayStats.communityPosts}</h3>
            <p>Community Posts</p>
          </div>
          <div className="stat-trend">→ 0%</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Quick Access Tiles */}
        <div className="section quick-access">
          <h2>⚡ Quick Access</h2>
          <div className="tiles-grid">
            {quickAccessTiles.map(tile => (
              <button
                key={tile.id}
                className="access-tile"
                style={{ borderColor: tile.color }}
                onClick={() => onNavigate && onNavigate(tile.path)}
              >
                <div className="tile-icon" style={{ background: tile.color }}>
                  {tile.icon}
                </div>
                <h3>{tile.title}</h3>
                <p>{tile.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Connected Devices */}
        <div className="section devices-section">
          <h2>🔌 Connected Devices</h2>
          <div className="devices-list">
            {connectedDevices.map(device => (
              <div key={device.id} className="device-item">
                <span className="device-icon">{device.icon}</span>
                <div className="device-info">
                  <h4>{device.name}</h4>
                  <span className={`device-status ${device.status}`}>
                    {device.status === 'active' ? '🟢 Active' : '🟡 Standby'}
                  </span>
                </div>
                <div className="device-battery">
                  <div className="battery-bar">
                    <div 
                      className="battery-fill"
                      style={{ width: `${device.battery}%` }}
                    ></div>
                  </div>
                  <span>{device.battery}%</span>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-add-device">+ Add Device</button>
        </div>

        {/* News Feed */}
        <div className="section news-feed">
          <h2>📰 Latest Updates</h2>
          <div className="news-list">
            {newsItems.map(item => (
              <div key={item.id} className="news-item">
                <div className="news-icon" style={{ background: item.color }}>
                  {item.icon}
                </div>
                <div className="news-content">
                  <span className="news-category">{item.category}</span>
                  <h4>{item.title}</h4>
                  <span className="news-time">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-view-all">View All Updates →</button>
        </div>

        {/* Achievements */}
        <div className="section achievements-section">
          <h2>🏆 Achievements</h2>
          <div className="achievements-grid">
            {achievements.map(achievement => (
              <div 
                key={achievement.id} 
                className={`achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}`}
              >
                <span className="achievement-icon">{achievement.icon}</span>
                <p>{achievement.title}</p>
                {!achievement.unlocked && <div className="lock-overlay">🔒</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Button - Always Visible */}
      <button className="emergency-fab" title="Emergency Assistance">
        🚨
      </button>

      {/* Voice Assistant FAB */}
      <button className="voice-fab" title="Voice Assistant">
        🎤
      </button>

      {/* Profile Setup Modal */}
      {showProfileSetup && (
        <ProfileSetupModal
          currentDisabilities={userProfile?.disabilities || []}
          onComplete={(disabilities) => {
            onProfileUpdate({ disabilities });
            setShowProfileSetup(false);
          }}
          onSkip={() => setShowProfileSetup(false)}
        />
      )}
    </div>
  );
};

export default EnhancedDashboard;
