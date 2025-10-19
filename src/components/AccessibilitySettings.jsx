import React from 'react'
import './AccessibilitySettings.css'

function AccessibilitySettings({ settings, onSettingsChange }) {
  const handleSettingChange = (setting, value) => {
    onSettingsChange(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  return (
    <div className="accessibility-settings">
      <h2>⚙️ Accessibility Settings</h2>
      
      <div className="settings-section">
        <h3>👁️ Visual Settings</h3>
        
        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
            />
            <span className="setting-text">High Contrast Mode</span>
          </label>
          <p className="setting-description">
            Increases contrast between text and background for better visibility
          </p>
        </div>

        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={settings.largeText}
              onChange={(e) => handleSettingChange('largeText', e.target.checked)}
            />
            <span className="setting-text">Large Text Mode</span>
          </label>
          <p className="setting-description">
            Increases font size throughout the application
          </p>
        </div>

        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={settings.easyRead}
              onChange={(e) => handleSettingChange('easyRead', e.target.checked)}
            />
            <span className="setting-text">Easy Read Mode</span>
          </label>
          <p className="setting-description">
            Simplifies language and adds icons for easier understanding
          </p>
        </div>
      </div>

      <div className="settings-section">
        <h3>🔊 Audio Settings</h3>
        
        <div className="setting-item">
          <label className="setting-label">
            <span className="setting-text">Speech Rate</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            defaultValue="1"
            className="slider"
          />
          <p className="setting-description">
            Adjust the speed of text-to-speech
          </p>
        </div>

        <div className="setting-item">
          <label className="setting-label">
            <span className="setting-text">Volume</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="slider"
          />
          <p className="setting-description">
            Adjust the volume of audio feedback
          </p>
        </div>
      </div>

      <div className="settings-section">
        <h3>🎯 Interaction Settings</h3>
        
        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              defaultChecked
            />
            <span className="setting-text">Voice Navigation</span>
          </label>
          <p className="setting-description">
            Provides audio descriptions of interface elements
          </p>
        </div>

        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              defaultChecked
            />
            <span className="setting-text">Haptic Feedback</span>
          </label>
          <p className="setting-description">
            Provides vibration feedback for interactions
          </p>
        </div>

        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
            />
            <span className="setting-text">Auto-scroll</span>
          </label>
          <p className="setting-description">
            Automatically scrolls content for easier reading
          </p>
        </div>
      </div>

      <div className="settings-section">
        <h3>🌐 Language Settings</h3>
        
        <div className="setting-item">
          <label className="setting-label">
            <span className="setting-text">Primary Language</span>
          </label>
          <select className="language-select">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="pt">Portuguese</option>
          </select>
        </div>

        <div className="setting-item">
          <label className="setting-label">
            <span className="setting-text">Sign Language</span>
          </label>
          <select className="language-select">
            <option value="asl">American Sign Language (ASL)</option>
            <option value="jsl">Jamaican Sign Language (JSL)</option>
            <option value="bsl">British Sign Language (BSL)</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h3>💾 Data & Privacy</h3>
        
        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              defaultChecked
            />
            <span className="setting-text">Save Preferences</span>
          </label>
          <p className="setting-description">
            Remember your accessibility settings
          </p>
        </div>

        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
            />
            <span className="setting-text">Share Usage Data</span>
          </label>
          <p className="setting-description">
            Help improve the app by sharing anonymous usage data
          </p>
        </div>
      </div>

      <div className="settings-actions">
        <button className="reset-btn">Reset to Defaults</button>
        <button className="export-btn">Export Settings</button>
        <button className="import-btn">Import Settings</button>
      </div>

      <div className="help-section">
        <h3>❓ Need Help?</h3>
        <div className="help-links">
          <a href="#" className="help-link">📖 User Guide</a>
          <a href="#" className="help-link">🎥 Video Tutorials</a>
          <a href="#" className="help-link">💬 Contact Support</a>
          <a href="#" className="help-link">🐛 Report Issue</a>
        </div>
      </div>
    </div>
  )
}

export default AccessibilitySettings
