import React, { useState } from 'react';
import './OnboardingFlow.css';

const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDisabilities, setSelectedDisabilities] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    authMethod: 'email'
  });

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

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({
        disabilities: selectedDisabilities,
        userInfo
      });
    }
  };

  const handleSkip = () => {
    onComplete({
      disabilities: [],
      userInfo: { skipped: true }
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="onboarding-step">
            <div className="step-header">
              <h1>Welcome to EnSync 👋</h1>
              <p className="step-subtitle">Let's personalize your experience in just a few steps</p>
            </div>
            
            <div className="welcome-features">
              <div className="welcome-card">
                <span className="welcome-icon">🎯</span>
                <h3>Personalized</h3>
                <p>Tailored to your unique needs</p>
              </div>
              <div className="welcome-card">
                <span className="welcome-icon">🌍</span>
                <h3>Inclusive</h3>
                <p>Built for everyone, everywhere</p>
              </div>
              <div className="welcome-card">
                <span className="welcome-icon">🚀</span>
                <h3>Powerful</h3>
                <p>Advanced accessibility tools</p>
              </div>
            </div>

            <button className="btn-primary" onClick={handleNext}>
              Get Started →
            </button>
          </div>
        );

      case 1:
        return (
          <div className="onboarding-step">
            <div className="step-header">
              <h1>Select Your Accessibility Needs</h1>
              <p className="step-subtitle">Choose one or more that apply to you (you can change this later)</p>
            </div>

            <div className="disability-grid">
              {disabilities.map(disability => (
                <button
                  key={disability.id}
                  className={`disability-option ${selectedDisabilities.includes(disability.id) ? 'selected' : ''}`}
                  onClick={() => toggleDisability(disability.id)}
                  style={{
                    borderColor: selectedDisabilities.includes(disability.id) ? disability.color : '#e5e7eb'
                  }}
                >
                  <div className="disability-icon" style={{ 
                    background: selectedDisabilities.includes(disability.id) ? disability.color : '#f3f4f6'
                  }}>
                    {disability.icon}
                  </div>
                  <h3>{disability.name}</h3>
                  <p>{disability.description}</p>
                  {selectedDisabilities.includes(disability.id) && (
                    <span className="check-mark">✓</span>
                  )}
                </button>
              ))}
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={handleSkip}>
                Skip for now
              </button>
              <button 
                className="btn-primary" 
                onClick={handleNext}
                disabled={selectedDisabilities.length === 0}
              >
                Continue →
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="onboarding-step">
            <div className="step-header">
              <h1>Create Your Account</h1>
              <p className="step-subtitle">Quick and secure authentication</p>
            </div>

            <div className="auth-container">
              <div className="auth-methods">
                <button 
                  className={`auth-method ${userInfo.authMethod === 'email' ? 'active' : ''}`}
                  onClick={() => setUserInfo({...userInfo, authMethod: 'email'})}
                >
                  📧 Email
                </button>
                <button 
                  className={`auth-method ${userInfo.authMethod === 'google' ? 'active' : ''}`}
                  onClick={() => setUserInfo({...userInfo, authMethod: 'google'})}
                >
                  🔍 Google
                </button>
                <button 
                  className={`auth-method ${userInfo.authMethod === 'biometric' ? 'active' : ''}`}
                  onClick={() => setUserInfo({...userInfo, authMethod: 'biometric'})}
                >
                  👆 Biometric
                </button>
              </div>

              {userInfo.authMethod === 'email' && (
                <div className="auth-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                      aria-label="Full Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      aria-label="Email Address"
                    />
                  </div>
                </div>
              )}

              {userInfo.authMethod === 'google' && (
                <div className="social-auth">
                  <button className="btn-social google">
                    <span>🔍</span> Continue with Google
                  </button>
                </div>
              )}

              {userInfo.authMethod === 'biometric' && (
                <div className="biometric-auth">
                  <div className="biometric-icon">👆</div>
                  <p>Touch the sensor to authenticate</p>
                  <button className="btn-biometric">Authenticate</button>
                </div>
              )}
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={() => setCurrentStep(1)}>
                ← Back
              </button>
              <button className="btn-primary" onClick={handleNext}>
                Complete Setup ✓
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
          ></div>
        </div>
        <p className="progress-text">Step {currentStep + 1} of 3</p>
      </div>

      {renderStep()}
    </div>
  );
};

export default OnboardingFlow;
