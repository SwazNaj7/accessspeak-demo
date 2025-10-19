import React, { useState, useEffect } from 'react'
import './SpeechTranslator.css'

function SpeechTranslator() {
  const [text, setText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [savedPhrases, setSavedPhrases] = useState([
    'Hello, how are you?',
    'Thank you very much',
    'Can you help me?',
    'Where is the bathroom?'
  ])

  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const speechRecognition = recognition ? new recognition() : null

  useEffect(() => {
    if (speechRecognition) {
      speechRecognition.continuous = false
      speechRecognition.interimResults = false
      speechRecognition.lang = 'en-US'

      speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setText(transcript)
        setIsListening(false)
      }

      speechRecognition.onerror = () => {
        setIsListening(false)
      }
    }
  }, [speechRecognition])

  const startListening = () => {
    if (speechRecognition) {
      setIsListening(true)
      speechRecognition.start()
    } else {
      alert('Speech recognition not supported in this browser')
    }
  }

  const stopListening = () => {
    if (speechRecognition) {
      speechRecognition.stop()
      setIsListening(false)
    }
  }

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    } else {
      alert('Speech synthesis not supported in this browser')
    }
  }

  const savePhrase = () => {
    if (text.trim()) {
      setSavedPhrases(prev => [...prev, text.trim()])
      setText('')
    }
  }

  const usePhrase = (phrase) => {
    setText(phrase)
  }

  return (
    <div className="speech-translator">
      <h2>🗣️ Speech & Text Communication</h2>
      
      <div className="speech-controls">
        <div className="text-area">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message here or use speech recognition..."
            rows="4"
          />
        </div>
        
        <div className="control-buttons">
          <button 
            className={`listen-btn ${isListening ? 'listening' : ''}`}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? '🛑 Stop Listening' : '🎤 Start Listening'}
          </button>
          
          <button 
            className={`speak-btn ${isSpeaking ? 'speaking' : ''}`}
            onClick={speakText}
            disabled={!text.trim()}
          >
            {isSpeaking ? '🔊 Speaking...' : '🔊 Speak Text'}
          </button>
          
          <button 
            className="save-btn"
            onClick={savePhrase}
            disabled={!text.trim()}
          >
            💾 Save Phrase
          </button>
        </div>
      </div>

      <div className="saved-phrases">
        <h3>💾 Saved Phrases</h3>
        <div className="phrases-grid">
          {savedPhrases.map((phrase, index) => (
            <button
              key={index}
              className="phrase-btn"
              onClick={() => usePhrase(phrase)}
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpeechTranslator
