import React, { useState } from 'react';
import './AIAssistant.css';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      text: 'Hi! I\'m your AI accessibility assistant. How can I help you today?',
      time: '10:30 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const quickActions = [
    { id: 1, text: 'Find accessible routes nearby', icon: '🗺️' },
    { id: 2, text: 'Translate sign language', icon: '🤟' },
    { id: 3, text: 'Read this text aloud', icon: '🔊' },
    { id: 4, text: 'Help with documentation', icon: '📄' },
    { id: 5, text: 'Emergency assistance', icon: '🚨' },
    { id: 6, text: 'Schedule a task', icon: '📅' }
  ];

  const suggestions = [
    'How do I use the sign language translator?',
    'Find wheelchair accessible restaurants',
    'Help me navigate to the nearest hospital',
    'What accessibility features are available?'
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'assistant',
        text: getAIResponse(inputText),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('route') || lowerQuery.includes('navigate')) {
      return 'I can help you find accessible routes! I\'ve found 3 wheelchair-accessible paths to your destination. Would you like me to show you the route with the fewest obstacles?';
    } else if (lowerQuery.includes('sign language')) {
      return 'The sign language translator is available in the Communication Hub. You can use your camera to translate sign language to text in real-time, or convert text to sign language animations.';
    } else if (lowerQuery.includes('emergency')) {
      return 'For emergencies, tap the red emergency button on your dashboard. This will immediately share your location with your emergency contacts and alert local services. Would you like to set up your emergency contacts now?';
    } else if (lowerQuery.includes('task') || lowerQuery.includes('help')) {
      return 'I can help you request assistance! What kind of help do you need? For example: documentation pickup, transportation assistance, or personal care support.';
    } else {
      return 'I\'m here to help! I can assist with navigation, communication, learning resources, and connecting you with community support. What would you like to do?';
    }
  };

  const handleQuickAction = (action) => {
    setInputText(action.text);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input functionality would be implemented here
  };

  return (
    <div className="ai-assistant">
      <div className="ai-header">
        <div className="ai-avatar">
          <span className="avatar-icon">🤖</span>
          <span className="status-dot"></span>
        </div>
        <div className="ai-info">
          <h2>AI Assistant</h2>
          <p className="ai-status">Online • Ready to help</p>
        </div>
        <div className="ai-actions">
          <button className="btn-icon" title="Voice Settings">🔊</button>
          <button className="btn-icon" title="Settings">⚙️</button>
        </div>
      </div>

      <div className="ai-features">
        <div className="feature-badge">
          <span>🧠</span> Smart Suggestions
        </div>
        <div className="feature-badge">
          <span>🗣️</span> Voice Enabled
        </div>
        <div className="feature-badge">
          <span>🌍</span> Multi-language
        </div>
      </div>

      <div className="quick-actions-section">
        <h3>Quick Actions</h3>
        <div className="quick-actions-grid">
          {quickActions.map(action => (
            <button
              key={action.id}
              className="quick-action-btn"
              onClick={() => handleQuickAction(action)}
            >
              <span className="action-icon">{action.icon}</span>
              <span className="action-text">{action.text}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="chat-container">
        <div className="messages-area">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.type}`}>
              {message.type === 'assistant' && (
                <div className="message-avatar">🤖</div>
              )}
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
              {message.type === 'user' && (
                <div className="message-avatar user">👤</div>
              )}
            </div>
          ))}
        </div>

        <div className="suggestions-area">
          <p className="suggestions-label">Suggested questions:</p>
          <div className="suggestions-list">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                className="suggestion-chip"
                onClick={() => setInputText(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="input-area">
          <button 
            className={`btn-voice ${isListening ? 'listening' : ''}`}
            onClick={toggleVoiceInput}
            title="Voice Input"
          >
            {isListening ? '🔴' : '🎤'}
          </button>
          <input
            type="text"
            placeholder="Type your message or use voice input..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            aria-label="Message input"
          />
          <button 
            className="btn-send"
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
          >
            Send ➤
          </button>
        </div>
      </div>

      <div className="ai-capabilities">
        <h3>What I Can Do</h3>
        <div className="capabilities-grid">
          <div className="capability-card">
            <span className="capability-icon">🗺️</span>
            <h4>Navigation</h4>
            <p>Find accessible routes and locations</p>
          </div>
          <div className="capability-card">
            <span className="capability-icon">💬</span>
            <h4>Communication</h4>
            <p>Translate and assist with communication</p>
          </div>
          <div className="capability-card">
            <span className="capability-icon">📚</span>
            <h4>Learning</h4>
            <p>Personalized learning recommendations</p>
          </div>
          <div className="capability-card">
            <span className="capability-icon">🤝</span>
            <h4>Support</h4>
            <p>Connect with community and experts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
