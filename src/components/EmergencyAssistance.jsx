import React, { useState } from 'react'
import './EmergencyAssistance.css'

function EmergencyAssistance() {
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: 'Emergency Services', phone: '119', type: 'emergency' },
    { id: 2, name: 'Disability Services Jamaica', phone: '+1-876-555-0123', type: 'support' },
    { id: 3, name: 'Family Contact', phone: '+1-876-555-0456', type: 'family' }
  ])

  const [newContact, setNewContact] = useState({ name: '', phone: '', type: 'family' })
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [emergencyMessage, setEmergencyMessage] = useState('')

  const addContact = () => {
    if (newContact.name.trim() && newContact.phone.trim()) {
      const contact = {
        id: emergencyContacts.length + 1,
        ...newContact
      }
      setEmergencyContacts(prev => [...prev, contact])
      setNewContact({ name: '', phone: '', type: 'family' })
    }
  }

  const removeContact = (id) => {
    setEmergencyContacts(prev => prev.filter(contact => contact.id !== id))
  }

  const triggerEmergency = () => {
    setIsEmergencyActive(true)
    
    // Simulate emergency alert
    setTimeout(() => {
      alert('Emergency alert sent to all contacts!')
      setIsEmergencyActive(false)
    }, 2000)
  }

  const callContact = (phone) => {
    // In a real app, this would initiate a phone call
    alert(`Calling ${phone}...`)
  }

  return (
    <div className="emergency-assistance">
      <h2>🚨 Emergency Assistance</h2>
      
      <div className="emergency-panel">
        <div className="sos-section">
          <h3>🆘 Emergency SOS</h3>
          <div className="sos-controls">
            <textarea
              value={emergencyMessage}
              onChange={(e) => setEmergencyMessage(e.target.value)}
              placeholder="Add emergency message (optional)..."
              rows="3"
            />
            <button 
              className={`sos-button ${isEmergencyActive ? 'active' : ''}`}
              onClick={triggerEmergency}
              disabled={isEmergencyActive}
            >
              {isEmergencyActive ? '🚨 ALERT SENT!' : '🚨 EMERGENCY SOS'}
            </button>
          </div>
          <p className="sos-note">
            This will send your location and message to all emergency contacts
          </p>
        </div>

        <div className="contacts-section">
          <h3>📞 Emergency Contacts</h3>
          
          <div className="contacts-list">
            {emergencyContacts.map(contact => (
              <div key={contact.id} className={`contact-card ${contact.type}`}>
                <div className="contact-info">
                  <h4>{contact.name}</h4>
                  <p className="contact-phone">{contact.phone}</p>
                  <span className={`contact-type ${contact.type}`}>
                    {contact.type === 'emergency' ? '🚨' : 
                     contact.type === 'support' ? '🆘' : '👨‍👩‍👧‍👦'}
                    {contact.type}
                  </span>
                </div>
                <div className="contact-actions">
                  <button 
                    className="call-btn"
                    onClick={() => callContact(contact.phone)}
                  >
                    📞 Call
                  </button>
                  <button 
                    className="remove-btn"
                    onClick={() => removeContact(contact.id)}
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="add-contact-section">
            <h4>➕ Add New Contact</h4>
            <div className="add-contact-form">
              <input
                type="text"
                placeholder="Contact name..."
                value={newContact.name}
                onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
              />
              <input
                type="tel"
                placeholder="Phone number..."
                value={newContact.phone}
                onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
              />
              <select
                value={newContact.type}
                onChange={(e) => setNewContact(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="family">👨‍👩‍👧‍👦 Family</option>
                <option value="support">🆘 Support</option>
                <option value="emergency">🚨 Emergency</option>
              </select>
              <button 
                onClick={addContact}
                disabled={!newContact.name.trim() || !newContact.phone.trim()}
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>

        <div className="resources-section">
          <h3>🆘 Emergency Resources</h3>
          <div className="resources-grid">
            <div className="resource-card">
              <h4>🚨 Emergency Services</h4>
              <p>Police, Fire, Ambulance</p>
              <p className="resource-number">119</p>
            </div>
            <div className="resource-card">
              <h4>🏥 Hospital</h4>
              <p>Kingston Public Hospital</p>
              <p className="resource-number">+1-876-922-0210</p>
            </div>
            <div className="resource-card">
              <h4>♿ Disability Services</h4>
              <p>Ministry of Labour & Social Security</p>
              <p className="resource-number">+1-876-922-8000</p>
            </div>
            <div className="resource-card">
              <h4>🚕 Accessible Transport</h4>
              <p>Jamaica Association for the Deaf</p>
              <p className="resource-number">+1-876-924-0055</p>
            </div>
          </div>
        </div>

        <div className="safety-tips">
          <h3>💡 Safety Tips</h3>
          <ul>
            <li>Keep emergency contacts updated</li>
            <li>Share your location with trusted contacts</li>
            <li>Carry identification and medical information</li>
            <li>Know your local emergency numbers</li>
            <li>Have a backup communication method</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EmergencyAssistance
