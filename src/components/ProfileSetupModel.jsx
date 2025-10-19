import React, { useState } from 'react';
import './ProfileSetupModal.css';

const ProfileSetupModal = ({ disabilities, onComplete, onSkip }) => {
  const [selectedDisabilities, setSelectedDisabilities] = useState([]);
  const [step, setStep] = useState(1);

  const toggleDisability = (disabilityId) => {
    setSelectedDisabilities(prev =>
      prev.includes(disabilityId)
        ? prev.filter(id => id !== disabilityId)
        : [...prev, disabilityId]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="profile-setup-modal">
        <div className="modal-header">
          <h2>🎨 Customize Your Experience</h2>
          <p>Select all that apply to personalize your dashboard</p>
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <div className="disability-selection">
            <h3>What accessibility features do you need?</h3>
            <div className="disability-options">
              {disabilities.map(disability => (
                <button
                  key={disability.id}
                  className={`disability-option ${
                    selectedDisabilities.includes(disability.id) ? 'selected' : ''
                  }`}
                  onClick={() => toggleDisability(disability.id)}
                  style={{
                    borderColor: selectedDisabilities.includes(disability.id) 
                      ? disability.color 
                      : '#e5e7eb'
                  }}
                >
                  <span className="option-icon">{disability.icon}</span>
                  <span className="option-name">{disability.name}</span>
                  {selectedDisabilities.includes(disability.id) && (
                    <span className="check-mark">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="confirmation-step">
            <h3>✅ Your Selected Profiles</h3>
            <div className="selected-summary">
              {selectedDisabilities.map(id => {
                const disability = disabilities.find(d => d.id === id);
                return (
                  <div key={id} className="summary-item" style={{ background: disability.color }}>
                    <span>{disability.icon}</span>
                    <span>{disability.name}</span>
                  </div>
                );
              })}
            </div>
            <p className="summary-text">
              Your dashboard will be customized with tools and features for these needs.
            </p>
          </div>
        )}

        <div className="modal-actions">
          {step === 1 ? (
            <>
              <button className="btn-secondary" onClick={onSkip}>
                Skip for now
              </button>
              <button 
                className="btn-primary"
                onClick={() => setStep(2)}
                disabled={selectedDisabilities.length === 0}
              >
                Continue →
              </button>
            </>
          ) : (
            <>
              <button className="btn-secondary" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button 
                className="btn-primary"
                onClick={() => onComplete(selectedDisabilities)}
              >
                Complete Setup ✓
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupModal;