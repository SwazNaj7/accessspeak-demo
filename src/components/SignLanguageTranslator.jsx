import React, { useState } from 'react'
import './SignLanguageTranslator.css'

function SignLanguageTranslator() {
  const [text, setText] = useState('')
  const [selectedSign, setSelectedSign] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const commonSigns = [
    { text: 'Hello', video: '👋', description: 'Wave hand' },
    { text: 'Thank you', video: '🙏', description: 'Hands together' },
    { text: 'Yes', video: '👍', description: 'Thumbs up' },
    { text: 'No', video: '👎', description: 'Thumbs down' },
    { text: 'Help', video: '🆘', description: 'Raise hand' },
    { text: 'Water', video: '💧', description: 'Cup hand' },
    { text: 'Food', video: '🍽️', description: 'Eating motion' },
    { text: 'Bathroom', video: '🚻', description: 'Point to restroom' },
    { text: 'Good', video: '👍', description: 'Thumbs up' },
    { text: 'Bad', video: '👎', description: 'Thumbs down' }
  ]

  const translateToSign = () => {
    if (text.trim()) {
      const words = text.toLowerCase().split(' ')
      const foundSigns = words.map(word => 
        commonSigns.find(sign => sign.text.toLowerCase() === word)
      ).filter(Boolean)
      
      if (foundSigns.length > 0) {
        setSelectedSign(foundSigns[0])
      } else {
        alert('Sign not found in our database. Try common words like: Hello, Thank you, Yes, No, Help')
      }
    }
  }

  const playSignAnimation = () => {
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 2000)
  }

  return (
    <div className="sign-language-translator">
      <h2>🤟 Sign Language Translator</h2>
      
      <div className="translation-section">
        <div className="input-section">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type text to translate to sign language..."
            rows="3"
          />
          <button onClick={translateToSign} disabled={!text.trim()}>
            Translate to Sign
          </button>
        </div>

        {selectedSign && (
          <div className="sign-display">
            <h3>Sign for: "{selectedSign.text}"</h3>
            <div className={`sign-animation ${isPlaying ? 'playing' : ''}`}>
              <div className="sign-video">
                <span className="sign-emoji">{selectedSign.video}</span>
              </div>
              <p className="sign-description">{selectedSign.description}</p>
            </div>
            <button onClick={playSignAnimation} className="play-btn">
              ▶️ Play Animation
            </button>
          </div>
        )}
      </div>

      <div className="common-signs">
        <h3>📚 Common Signs Library</h3>
        <div className="signs-grid">
          {commonSigns.map((sign, index) => (
            <div 
              key={index} 
              className="sign-card"
              onClick={() => {
                setText(sign.text)
                setSelectedSign(sign)
              }}
            >
              <div className="sign-emoji">{sign.video}</div>
              <div className="sign-text">{sign.text}</div>
              <div className="sign-desc">{sign.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="learning-section">
        <h3>🎓 Learn Sign Language</h3>
        <div className="learning-tips">
          <div className="tip">
            <h4>Basic Tips:</h4>
            <ul>
              <li>Keep your hands visible and well-lit</li>
              <li>Make clear, deliberate movements</li>
              <li>Maintain eye contact when signing</li>
              <li>Practice facial expressions</li>
            </ul>
          </div>
          <div className="tip">
            <h4>Resources:</h4>
            <ul>
              <li>Jamaican Sign Language (JSL) courses</li>
              <li>American Sign Language (ASL) basics</li>
              <li>Local deaf community centers</li>
              <li>Online sign language tutorials</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignLanguageTranslator
