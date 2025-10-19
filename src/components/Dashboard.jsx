import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ userProfile, onProfileUpdate }) => {
  const navigate = useNavigate();
  const [showProfileSetup, setShowProfileSetup] = useState(!userProfile?.disabilities?.length);
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const disabilities = [
    { 
      id: 'visual', 
      name: 'Visual Impairment', 
      icon: '👁️',
      color: '#3b82f6',
      features: ['Screen Reader', 'High Contrast', 'Voice Navigation']
    },
    { 
      id: 'hearing', 
      name: 'Hearing Impairment', 
      icon: '👂',
      color: '#10b981',
      features: ['Sign Language Translator', 'Visual Alerts', 'Captions']
    },
    { 
      id: 'mobility', 
      name: 'Mobility Impairment', 
      icon: '♿',
      color: '#8b5cf6',
      features: ['Voice Commands', 'Switch Control', 'Accessibility Map']
    },
    { 
      id: 'cognitive', 
      name: 'Cognitive Disability', 
      icon: '🧠',
      color: '#f59e0b',
      features: ['Easy Read Mode', 'Task Reminders', 'Simplified Interface']
    },
    { 
      id: 'speech', 
      name: 'Speech Impairment', 
      icon: '🗣️',
      color: '#ef4444',
      features: ['Text-to-Speech', 'Communication Board', 'Saved Phrases']
    }
  ];

  const quickActions = {
    visual: [
      { id: 'screen-reader', name: 'Screen Reader', icon: '🔊', path: '/screen-reader' },
      { id: 'magnifier', name: 'Magnifier', icon: '🔍', path: '/magnifier' }
    ],
    hearing: [
      { id: 'sign-language', name: 'Sign Language', icon: '🤟', path: '/sign-language' },
      { id: 'live-caption', name: 'Live Caption', icon: '💬', path: '/captions' }
    ],
    mobility: [
      { id: 'voice-control', name: 'Voice Control', icon: '🎤', path: '/voice-control' },
      { id: 'accessibility-map', name: 'Accessibility Map', icon: '🗺️', path: '/map' }
    ],
    cognitive: [
      { id: 'easy-read', name: 'Easy Read', icon: '📖', path: '/easy-read' },
      { id: 'task-helper', name: 'Task Helper', icon: '✅', path: '/tasks' }
    ],
    speech: [
      { id: 'text-to-speech', name: 'Text-to-Speech', icon: '💬', path: '/tts' },
      { id: 'communication-board', name: 'Communication', icon: '📋', path: '/communication' }
    ]
  };

  const getPersonalizedActions = () => {
    if (!userProfile?.disabilities) return [];
    
    const actions = [];
    userProfile.disabilities.forEach(disabilityId => {
      if (quickActions[disabilityId]) {
        actions.push(...quickActions[disabilityId]);
      }
    });
    return actions;
  };

  useEffect(() => {
    // Load user tasks from localStorage or API
    const savedTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');
    setTasks(savedTasks);
  }, []);

  return (
    <div className="dashboard-container">
      {showProfileSetup && (
        <ProfileSetupModal
          disabilities={disabilities}
          onComplete={(selectedDisabilities) => {
            onProfileUpdate({ disabilities: selectedDisabilities });
            setShowProfileSetup(false);
          }}
          onSkip={() => setShowProfileSetup(false)}
        />
      )}

      <div className="dashboard-header">
        <h1>Welcome back! 👋</h1>
        <p className="dashboard-subtitle">Your personalized accessibility hub</p>
      </div>

      {/* Disability Profile Cards */}
      <div className="profile-section">
        <div className="section-header">
          <h2>🎯 Your Accessibility Profile</h2>
          <button 
            className="btn-edit"
            onClick={() => setShowProfileSetup(true)}
          >
            ✏️ Edit Profile
          </button>
        </div>
        
        <div className="disability-cards">
          {userProfile?.disabilities?.length > 0 ? (
            userProfile.disabilities.map(disabilityId => {
              const disability = disabilities.find(d => d.id === disabilityId);
              return disability ? (
                <div 
                  key={disability.id} 
                  className="disability-card"
                  style={{ borderColor: disability.color }}
                >
                  <div className="card-icon" style={{ background: disability.color }}>
                    {disability.icon}
                  </div>
                  <h3>{disability.name}</h3>
                  <ul className="feature-list">
                    {disability.features.map(feature => (
                      <li key={feature}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
              ) : null;
            })
          ) : (
            <div className="empty-profile">
              <p>🎨 Customize your experience by selecting your accessibility needs</p>
              <button 
                className="btn-primary"
                onClick={() => setShowProfileSetup(true)}
              >
                Set Up Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2>⚡ Quick Actions</h2>
        <div className="action-grid">
          {getPersonalizedActions().map(action => (
            <button
              key={action.id}
              className="action-card"
              onClick={() => navigate(action.path)}
            >
              <span className="action-icon">{action.icon}</span>
              <span className="action-name">{action.name}</span>
            </button>
          ))}
          
          {/* Universal Actions */}
          <button
            className="action-card highlight"
            onClick={() => setShowTaskModal(true)}
          >
            <span className="action-icon">🆘</span>
            <span className="action-name">Request Help</span>
          </button>
        </div>
      </div>

      {/* Active Tasks */}
      <TaskSection 
        tasks={tasks}
        onTaskUpdate={setTasks}
        onNewTask={() => setShowTaskModal(true)}
      />

      {/* Emergency Button */}
      <button className="emergency-button">
        🚨 Emergency Assistance
      </button>

      {showTaskModal && (
        <TaskRequestModal
          onClose={() => setShowTaskModal(false)}
          onSubmit={(newTask) => {
            const updatedTasks = [...tasks, { ...newTask, id: Date.now(), status: 'pending' }];
            setTasks(updatedTasks);
            localStorage.setItem('userTasks', JSON.stringify(updatedTasks));
            setShowTaskModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;