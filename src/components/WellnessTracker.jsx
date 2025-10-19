import React, { useState } from 'react';
import './WellnessTracker.css';

const WellnessTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moodToday, setMoodToday] = useState(null);

  const moods = [
    { id: 'great', emoji: '😄', label: 'Great', color: '#10b981' },
    { id: 'good', emoji: '🙂', label: 'Good', color: '#3b82f6' },
    { id: 'okay', emoji: '😐', label: 'Okay', color: '#f59e0b' },
    { id: 'bad', emoji: '😔', label: 'Not Good', color: '#ef4444' }
  ];

  const wellnessMetrics = [
    {
      id: 'physical',
      title: 'Physical Health',
      icon: '💪',
      score: 85,
      color: '#10b981',
      activities: [
        { name: 'Steps Today', value: '8,234', target: '10,000' },
        { name: 'Active Minutes', value: '45', target: '60' },
        { name: 'Water Intake', value: '6', target: '8 glasses' }
      ]
    },
    {
      id: 'mental',
      title: 'Mental Wellness',
      icon: '🧘',
      score: 78,
      color: '#3b82f6',
      activities: [
        { name: 'Meditation', value: '15 min', target: '20 min' },
        { name: 'Mood Check-ins', value: '3', target: '3' },
        { name: 'Stress Level', value: 'Low', target: 'Low' }
      ]
    },
    {
      id: 'social',
      title: 'Social Connection',
      icon: '🤝',
      score: 92,
      color: '#8b5cf6',
      activities: [
        { name: 'Community Posts', value: '5', target: '3' },
        { name: 'Messages Sent', value: '12', target: '10' },
        { name: 'Events Attended', value: '2', target: '2' }
      ]
    },
    {
      id: 'learning',
      title: 'Personal Growth',
      icon: '📚',
      score: 88,
      color: '#f59e0b',
      activities: [
        { name: 'Learning Time', value: '45 min', target: '30 min' },
        { name: 'Courses Active', value: '3', target: '2' },
        { name: 'Achievements', value: '12', target: '10' }
      ]
    }
  ];

  const weeklyProgress = [
    { day: 'Mon', score: 75 },
    { day: 'Tue', score: 82 },
    { day: 'Wed', score: 78 },
    { day: 'Thu', score: 85 },
    { day: 'Fri', score: 88 },
    { day: 'Sat', score: 92 },
    { day: 'Sun', score: 86 }
  ];

  const healthTips = [
    {
      id: 1,
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily for optimal health',
      icon: '💧',
      category: 'Physical'
    },
    {
      id: 2,
      title: 'Practice Mindfulness',
      description: 'Take 10 minutes daily for meditation or deep breathing',
      icon: '🧘',
      category: 'Mental'
    },
    {
      id: 3,
      title: 'Connect with Others',
      description: 'Engage with the community to boost social wellness',
      icon: '💬',
      category: 'Social'
    }
  ];

  const challenges = [
    {
      id: 1,
      title: '7-Day Wellness Streak',
      progress: 5,
      total: 7,
      reward: '🏆 100 points',
      icon: '🔥'
    },
    {
      id: 2,
      title: 'Community Contributor',
      progress: 8,
      total: 10,
      reward: '⭐ Special Badge',
      icon: '🤝'
    },
    {
      id: 3,
      title: 'Learning Champion',
      progress: 3,
      total: 5,
      reward: '📚 Unlock Course',
      icon: '🎓'
    }
  ];

  return (
    <div className="wellness-tracker">
      <div className="wellness-header">
        <h1>🌟 Wellness Tracker</h1>
        <p className="wellness-subtitle">Your holistic health companion</p>
      </div>

      {/* Mood Check-in */}
      <div className="mood-section">
        <h2>How are you feeling today?</h2>
        <div className="mood-selector">
          {moods.map(mood => (
            <button
              key={mood.id}
              className={`mood-btn ${moodToday === mood.id ? 'selected' : ''}`}
              onClick={() => setMoodToday(mood.id)}
              style={{
                borderColor: moodToday === mood.id ? mood.color : '#e2e8f0'
              }}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overall Wellness Score */}
      <div className="wellness-score-card">
        <div className="score-content">
          <h2>Overall Wellness Score</h2>
          <div className="score-display">
            <div className="score-circle">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="score-bg" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  className="score-progress"
                  style={{
                    strokeDasharray: `${86 * 2.827}, 282.7`,
                    stroke: '#667eea'
                  }}
                />
              </svg>
              <div className="score-value">86%</div>
            </div>
            <div className="score-info">
              <p className="score-status">Excellent!</p>
              <p className="score-description">You're doing great this week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wellness Metrics */}
      <div className="metrics-grid">
        {wellnessMetrics.map(metric => (
          <div key={metric.id} className="metric-card">
            <div className="metric-header">
              <span className="metric-icon">{metric.icon}</span>
              <h3>{metric.title}</h3>
            </div>
            <div className="metric-score">
              <div className="score-bar">
                <div 
                  className="score-fill"
                  style={{ 
                    width: `${metric.score}%`,
                    background: metric.color
                  }}
                ></div>
              </div>
              <span className="score-percentage">{metric.score}%</span>
            </div>
            <div className="metric-activities">
              {metric.activities.map((activity, idx) => (
                <div key={idx} className="activity-item">
                  <span className="activity-name">{activity.name}</span>
                  <span className="activity-value">
                    {activity.value} / {activity.target}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Progress Chart */}
      <div className="weekly-progress">
        <h2>📊 Weekly Progress</h2>
        <div className="progress-chart">
          {weeklyProgress.map((day, idx) => (
            <div key={idx} className="chart-bar">
              <div 
                className="bar-fill"
                style={{ height: `${day.score}%` }}
              >
                <span className="bar-value">{day.score}</span>
              </div>
              <span className="bar-label">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Challenges */}
      <div className="challenges-section">
        <h2>🎯 Active Challenges</h2>
        <div className="challenges-grid">
          {challenges.map(challenge => (
            <div key={challenge.id} className="challenge-card">
              <span className="challenge-icon">{challenge.icon}</span>
              <h3>{challenge.title}</h3>
              <div className="challenge-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {challenge.progress} / {challenge.total}
                </span>
              </div>
              <div className="challenge-reward">{challenge.reward}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Tips */}
      <div className="tips-section">
        <h2>💡 Health Tips for You</h2>
        <div className="tips-grid">
          {healthTips.map(tip => (
            <div key={tip.id} className="tip-card">
              <span className="tip-icon">{tip.icon}</span>
              <div className="tip-content">
                <span className="tip-category">{tip.category}</span>
                <h4>{tip.title}</h4>
                <p>{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="wellness-actions">
        <button className="action-btn primary">
          📝 Log Activity
        </button>
        <button className="action-btn secondary">
          📊 View Full Report
        </button>
        <button className="action-btn secondary">
          ⚙️ Set Goals
        </button>
      </div>
    </div>
  );
};

export default WellnessTracker;
