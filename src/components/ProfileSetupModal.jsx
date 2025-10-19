import React, { useState } from 'react';
import './ProfileSetupModal.css';

const ProfileSetupModal = ({ onComplete, onSkip, currentDisabilities = [] }) => {
  const [selectedDisabilities, setSelectedDisabilities] = useState(currentDisabilities);

  const disabilities = [
    { 
      id: 'visual', 
      name: 'Visual Impairment', 
      icon: '👁️',
      description: 'Screen readers, high contrast, voice navigation',
      color: '#3b82f6'
    },
    { 
      id: 'hearing', 
      name: 'Hearing Impairment', 
      icon: '👂',
      description: 'Sign language, visual alerts, captions',
      color: '#10b981'
    },
    { 
      id: 'mobility', 
      name: 'Mobility Impairment', 
      icon: '♿',
      description: 'Voice commands, switch control, accessible routes',
      color: '#8b5cf6'
    },
    { 
      id: 'cognitive', 
      name: 'Cognitive Disability', 
      icon: '🧠',
      description: 'Easy read mode, task reminders, simplified UI',
      color: '#f59e0b'
    },
    { 
      id: 'speech', 
      name: 'Speech Impairment', 
      icon: '🗣️',
      description: 'Text-to-speech, communication boards, saved phrases',
      color: '#ef4444'
    },
    { 
      id: 'multiple', 
      name: 'Multiple Disabilities', 
      icon: '🌟',
      description: 'Comprehensive support for multiple needs',
      color: '#ec4899'
    }
  ];

  const toggleDisability = (id) => {
    setSelectedDisabilities(prev => 
      prev.includes(id) 
        ? prev.filter(d => d !== id)
        : [...prev, id]
    );
  };

  const handleSave = () => {
    onComplete(selectedDisabilities);
  };

  return (
    <div className="modal-overlay">
      <div className="profile-modal">
        <div className="modal-header">
          <h2>Update Your Accessibility Profile</h2>
          <p className="modal-subtitle">Select one or more that apply to you</p>
        </div>

        <div className="disabilities-grid">
          {disabilities.map(disability => (
            <button
              key={disability.id}
              className={`disability-card ${selectedDisabilities.includes(disability.id) ? 'selected' : ''}`}
              onClick={() => toggleDisability(disability.id)}
              style={{
                borderColor: selectedDisabilities.includes(disability.id) ? disability.color : '#e2e8f0'
              }}
            >
              <div 
                className="disability-icon" 
                style={{ 
                  background: selectedDisabilities.includes(disability.id) ? disability.color : '#f3f4f6'
                }}
              >
                {disability.icon}
              </div>
              <h3>{disability.name}</h3>
              <p>{disability.description}</p>
              {selectedDisabilities.includes(disability.id) && (
                <span className="check-icon">✓</span>
              )}
            </button>
          ))}
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onSkip}>
            Cancel
          </button>
          <button 
            className="btn-save" 
            onClick={handleSave}
            disabled={selectedDisabilities.length === 0}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupModal;
