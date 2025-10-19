import React, { useState, useRef, useEffect, useCallback } from 'react'
import './SignLanguageSpeller.css'

function SignLanguageSpeller() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcribedText, setTranscribedText] = useState('')
  const [currentLetter, setCurrentLetter] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [suggestions, setSuggestions] = useState([])
  const [error, setError] = useState('')
  const [videoReady, setVideoReady] = useState(false)
  const [debugInfo, setDebugInfo] = useState('')
  const [apiConnected, setApiConnected] = useState(false)
  
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const intervalRef = useRef(null)

  // Check API connection on mount
  useEffect(() => {
    checkApiConnection()
    return () => {
      stopRecording()
    }
  }, [])

  const checkApiConnection = async () => {
    try {
      const response = await fetch('http://localhost:5001/health')
      if (response.ok) {
        setApiConnected(true)
        setDebugInfo('✅ Connected to Python API')
      } else {
        setApiConnected(false)
        setDebugInfo('❌ Python API not responding')
      }
    } catch (error) {
      setApiConnected(false)
      setDebugInfo('❌ Cannot connect to Python API. Make sure it\'s running on port 5001')
    }
  }

  const startRecording = async () => {
    try {
      setError('')
      console.log('🔄 Starting camera...')
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      })
      
      console.log('✅ Camera access granted')
      streamRef.current = stream
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        
        videoRef.current.onloadedmetadata = () => {
          console.log('✅ Video loaded, dimensions:', videoRef.current.videoWidth, 'x', videoRef.current.videoHeight)
          setVideoReady(true)
          setIsRecording(true)
          
          // Start processing frames every 1 second
          intervalRef.current = setInterval(processFrame, 1000)
        }
        
        videoRef.current.onerror = (e) => {
          console.error('❌ Video error:', e)
          setError('Video playback error')
        }
      }
      
    } catch (error) {
      console.error('❌ Camera access error:', error)
      setError('Unable to access camera. Please check permissions and try again.')
    }
  }

  const processFrame = useCallback(async () => {
    if (!videoRef.current || !isRecording || !apiConnected) return
    
    try {
      const canvas = canvasRef.current
      const video = videoRef.current
      
      if (!canvas || !video || video.videoWidth === 0) return
      
      // Draw current video frame to canvas
      const ctx = canvas.getContext('2d')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      // Convert canvas to base64
      const imageData = canvas.toDataURL('image/jpeg', 0.8)
      
      // Send to Python API
      const response = await fetch('http://localhost:5001/api/sign-language/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          image: imageData.split(',')[1] // Remove data:image/jpeg;base64, prefix
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log('🔍 API Response:', result)
        
        if (result.success) {
          setCurrentLetter(result.letter)
          setConfidence(result.confidence)
          setDebugInfo(`Python API: ${result.letter} (${Math.round(result.confidence * 100)}%)`)
          
          // Handle special commands
          if (result.letter === ' ') {
            setTranscribedText(prev => prev + ' ')
          } else if (result.letter === 'Backspace') {
            setTranscribedText(prev => prev.slice(0, -1))
          } else if (result.letter === 'Clear') {
            setTranscribedText('')
          } else if (result.letter !== 'UNKNOWN' && result.letter !== 'next') {
            setTranscribedText(prev => prev + result.letter)
          }
        } else {
          setCurrentLetter('')
          setConfidence(0)
          setDebugInfo(`API: ${result.message}`)
        }
      } else {
        setDebugInfo('❌ API request failed')
      }
      
    } catch (error) {
      console.error('Frame processing error:', error)
      setDebugInfo('❌ Processing error')
    }
  }, [isRecording, apiConnected])

  const stopRecording = () => {
    console.log('🛑 Stopping recording...')
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    setIsRecording(false)
    setVideoReady(false)
    setCurrentLetter('')
    setConfidence(0)
    setDebugInfo('')
  }

  const getWordSuggestions = (text) => {
    const commonWords = [
      'HELLO', 'WORLD', 'THANK', 'YOU', 'PLEASE', 'SORRY', 'YES', 'NO',
      'HELP', 'WATER', 'FOOD', 'BATHROOM', 'GOOD', 'BAD', 'LOVE', 'FAMILY',
      'FRIEND', 'WORK', 'HOME', 'SCHOOL', 'HOSPITAL', 'DOCTOR', 'NURSE'
    ]
    
    const suggestions = commonWords.filter(word => 
      word.startsWith(text.toUpperCase()) && word !== text.toUpperCase()
    ).slice(0, 4)
    
    setSuggestions(suggestions)
  }

  const handleSuggestionClick = (suggestion) => {
    setTranscribedText(suggestion)
    setSuggestions([])
  }

  const handleManualTextChange = (e) => {
    setTranscribedText(e.target.value)
    getWordSuggestions(e.target.value)
  }

  const clearText = () => {
    setTranscribedText('')
  }

  const testApiConnection = async () => {
    await checkApiConnection()
  }

  return (
    <div className="sign-language-speller">
      <h2>🤟 Sign Language Speller</h2>
      <p className="subtitle">Real-time recognition with your trained Python model</p>
      
      <div className="speller-container">
        {/* Camera Section */}
        <div className="camera-section">
          <div className="video-container">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="camera-video"
            />
            <canvas
              ref={canvasRef}
              style={{ display: 'none' }}
            />
            
            <div className={`recording-indicator ${isRecording ? 'recording' : ''}`}>
              <div className="recording-dot"></div>
              <span>
                {!videoReady ? 'Initializing...' : 
                 isRecording ? 'Processing...' : 'Stopped'}
              </span>
            </div>
          </div>
          
          <div className="camera-controls">
            {!isRecording ? (
              <button 
                onClick={startRecording} 
                className="start-btn"
                disabled={!apiConnected}
              >
                🐍 Start Python Recognition
              </button>
            ) : (
              <button onClick={stopRecording} className="stop-btn">
                ⏹️ Stop Recognition
              </button>
            )}
            
            <button onClick={testApiConnection} className="test-btn">
              🔄 Test Connection
            </button>
            
            <div className="debug-info">
              <small>
                Video: {videoReady ? '✅' : '❌'} | 
                Python API: {apiConnected ? '✅' : '❌'} | 
                Processing: {isRecording ? '✅' : '❌'}
              </small>
              <br />
              <small className="debug-text">{debugInfo}</small>
            </div>
          </div>
        </div>

        {/* Recognition Results */}
        <div className="recognition-results">
          <div className="current-detection">
            <h3>Python Model Detection</h3>
            <div className="detection-display">
              <div className="detected-letter">
                {currentLetter && (
                  <>
                    <span className="letter">{currentLetter}</span>
                    <span className="confidence">
                      {Math.round(confidence * 100)}% confidence
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="transcribed-text">
            <h3>Transcribed Text</h3>
            <textarea
              value={transcribedText}
              onChange={handleManualTextChange}
              placeholder="Your transcribed text will appear here..."
              className="text-output"
              rows="4"
            />
            
            <div className="text-controls">
              <button onClick={clearText} className="clear-btn">
                🗑️ Clear Text
              </button>
            </div>
            
            {suggestions.length > 0 && (
              <div className="suggestions">
                <h4>Word Suggestions:</h4>
                <div className="suggestion-buttons">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="suggestion-btn"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="supported-alphabet">
        <h3>Supported Signs</h3>
        <div className="alphabet-grid">
          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'SPACE', 'DELETE', 'CLEAR'].map((letter) => (
            <div key={letter} className="alphabet-item">
              <span className="letter-value">{letter}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="instructions">
        <h3>How to Use</h3>
        <div className="instruction-list">
          <div className="instruction">
            <strong>1. Start Python API:</strong> Run your Python service on port 5001
          </div>
          <div className="instruction">
            <strong>2. Test Connection:</strong> Click "Test Connection" to verify API is running
          </div>
          <div className="instruction">
            <strong>3. Start Recognition:</strong> Click "Start Python Recognition" to begin
          </div>
          <div className="instruction">
            <strong>4. Sign Letters:</strong> Make sign language gestures for individual letters
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <span>⚠️ {error}</span>
        </div>
      )}

      <div className="service-status">
        <h4>Service Status</h4>
        <p>🐍 Python API: {apiConnected ? 'Connected' : 'Not Connected'}</p>
        <p>📹 Camera: {videoReady ? 'Ready' : 'Not Ready'}</p>
        <p>🔄 Processing: {isRecording ? 'Active' : 'Stopped'}</p>
        <p>💡 Make sure to run: <code>python sign_language_simple.py</code></p>
      </div>
    </div>
  )
}

export default SignLanguageSpeller