import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-logo">
          <div className="logo-circle">
            <span className="logo-icon">♿</span>
          </div>
          <h1 className="app-title">EnSync</h1>
        </div>
        <p className="splash-tagline">Speak, Move, Stay EnSync</p>
        <div className="splash-features">
          <span className="feature-badge">🗣️ Communication</span>
          <span className="feature-badge">🗺️ Navigation</span>
          <span className="feature-badge">🤝 Community</span>
        </div>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
