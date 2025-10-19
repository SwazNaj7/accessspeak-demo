import React, { useState } from 'react';
import './TaskRequestModal.css';

const TaskRequestModal = ({ onClose, onSubmit }) => {
  const [taskType, setTaskType] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [location, setLocation] = useState('');

  const taskTypes = [
    { id: 'documentation', name: 'Documentation Help', icon: '📄', description: 'Forms, paperwork, applications' },
    { id: 'transportation', name: 'Transportation', icon: '🚗', description: 'Ride assistance, pickup/dropoff' },
    { id: 'shopping', name: 'Shopping Assistance', icon: '🛒', description: 'Grocery shopping, errands' },
    { id: 'medical', name: 'Medical Support', icon: '⚕️', description: 'Appointment assistance, prescriptions' },
    { id: 'technology', name: 'Technology Help', icon: '💻', description: 'Device setup, troubleshooting' },
    { id: 'communication', name: 'Communication', icon: '💬', description: 'Translation, interpretation' },
    { id: 'other', name: 'Other', icon: '❓', description: 'Custom assistance request' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      taskType,
      description,
      urgency,
      location,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="task-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🆘 Request Assistance</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label>What do you need help with?</label>
            <div className="task-type-grid">
              {taskTypes.map(type => (
                <button
                  key={type.id}
                  type="button"
                  className={`task-type-option ${taskType === type.id ? 'selected' : ''}`}
                  onClick={() => setTaskType(type.id)}
                >
                  <span className="type-icon">{type.icon}</span>
                  <span className="type-name">{type.name}</span>
                  <span className="type-desc">{type.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label htmlFor="description">Describe your request</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide details about what you need help with..."
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-section">
              <label htmlFor="urgency">Urgency Level</label>
              <select
                id="urgency"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
              >
                <option value="low">🟢 Low - Can wait</option>
                <option value="normal">🟡 Normal - Soon</option>
                <option value="high">🟠 High - Today</option>
                <option value="urgent">🔴 Urgent - ASAP</option>
              </select>
            </div>

            <div className="form-section">
              <label htmlFor="location">Location (Optional)</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where do you need help?"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={!taskType || !description}
            >
              Submit Request 📤
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskRequestModal;