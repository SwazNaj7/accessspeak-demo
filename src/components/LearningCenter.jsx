import React, { useState } from 'react';
import './LearningCenter.css';

const LearningCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userProgress, setUserProgress] = useState({
    'asl-basics': 45,
    'navigation-skills': 70,
    'communication-tips': 30
  });

  const categories = [
    { id: 'all', name: 'All Courses', icon: '📚' },
    { id: 'sign-language', name: 'Sign Language', icon: '🤟' },
    { id: 'navigation', name: 'Navigation', icon: '🗺️' },
    { id: 'communication', name: 'Communication', icon: '💬' },
    { id: 'technology', name: 'Assistive Tech', icon: '🔧' }
  ];

  const courses = [
    {
      id: 'asl-basics',
      title: 'American Sign Language Basics',
      category: 'sign-language',
      difficulty: 'Beginner',
      duration: '4 weeks',
      lessons: 24,
      icon: '🤟',
      color: '#10b981',
      description: 'Learn fundamental ASL signs and grammar',
      achievements: ['First Sign', '10 Signs Mastered', 'Week 1 Complete']
    },
    {
      id: 'navigation-skills',
      title: 'Accessible Navigation Mastery',
      category: 'navigation',
      difficulty: 'Intermediate',
      duration: '3 weeks',
      lessons: 18,
      icon: '🗺️',
      color: '#3b82f6',
      description: 'Master accessible route planning and mapping',
      achievements: ['Route Planner', 'Location Scout', 'Navigator Pro']
    },
    {
      id: 'communication-tips',
      title: 'Effective Communication Strategies',
      category: 'communication',
      difficulty: 'Beginner',
      duration: '2 weeks',
      lessons: 12,
      icon: '💬',
      color: '#8b5cf6',
      description: 'Enhance your communication skills',
      achievements: ['Communicator', 'Phrase Master']
    },
    {
      id: 'screen-reader',
      title: 'Screen Reader Proficiency',
      category: 'technology',
      difficulty: 'Advanced',
      duration: '5 weeks',
      lessons: 30,
      icon: '🔊',
      color: '#f59e0b',
      description: 'Become a screen reader power user',
      achievements: ['Tech Savvy', 'Shortcut Master', 'Efficiency Expert']
    },
    {
      id: 'braille-intro',
      title: 'Introduction to Braille',
      category: 'sign-language',
      difficulty: 'Beginner',
      duration: '6 weeks',
      lessons: 36,
      icon: '⠃',
      color: '#ef4444',
      description: 'Learn to read and write Braille',
      achievements: ['First Letter', 'Alphabet Complete', 'Reader']
    },
    {
      id: 'voice-commands',
      title: 'Voice Command Mastery',
      category: 'technology',
      difficulty: 'Intermediate',
      duration: '3 weeks',
      lessons: 15,
      icon: '🎤',
      color: '#ec4899',
      description: 'Control your devices with voice',
      achievements: ['Voice Activated', 'Command Expert']
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <div className="learning-center">
      <div className="learning-header">
        <h1>🎓 Learning Center</h1>
        <p className="learning-subtitle">Expand your skills with interactive tutorials and courses</p>
      </div>

      {/* User Stats */}
      <div className="learning-stats">
        <div className="stat-card">
          <span className="stat-icon">🏆</span>
          <div className="stat-info">
            <h3>12</h3>
            <p>Achievements</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📈</span>
          <div className="stat-info">
            <h3>48%</h3>
            <p>Overall Progress</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⏱️</span>
          <div className="stat-info">
            <h3>24h</h3>
            <p>Learning Time</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <div className="stat-info">
            <h3>7</h3>
            <p>Day Streak</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-header" style={{ background: course.color }}>
              <span className="course-icon">{course.icon}</span>
              <span 
                className="difficulty-badge"
                style={{ background: getDifficultyColor(course.difficulty) }}
              >
                {course.difficulty}
              </span>
            </div>
            
            <div className="course-content">
              <h3>{course.title}</h3>
              <p className="course-description">{course.description}</p>
              
              <div className="course-meta">
                <span>⏱️ {course.duration}</span>
                <span>📝 {course.lessons} lessons</span>
              </div>

              {userProgress[course.id] && (
                <div className="course-progress">
                  <div className="progress-header">
                    <span>Progress</span>
                    <span>{userProgress[course.id]}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${userProgress[course.id]}%`,
                        background: course.color
                      }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="course-achievements">
                {course.achievements.slice(0, 3).map((achievement, idx) => (
                  <span key={idx} className="achievement-badge">
                    🏅 {achievement}
                  </span>
                ))}
              </div>

              <button 
                className="btn-course"
                style={{ background: course.color }}
              >
                {userProgress[course.id] ? 'Continue Learning' : 'Start Course'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Practice Section */}
      <div className="practice-section">
        <h2>🎯 Daily Practice</h2>
        <div className="practice-cards">
          <div className="practice-card">
            <span className="practice-icon">🤟</span>
            <h3>Sign of the Day</h3>
            <p>Learn "Thank You" in ASL</p>
            <button className="btn-practice">Practice Now</button>
          </div>
          <div className="practice-card">
            <span className="practice-icon">🧩</span>
            <h3>Quick Quiz</h3>
            <p>Test your knowledge</p>
            <button className="btn-practice">Take Quiz</button>
          </div>
          <div className="practice-card">
            <span className="practice-icon">🎮</span>
            <h3>Challenge</h3>
            <p>Complete today's challenge</p>
            <button className="btn-practice">Start Challenge</button>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="resources-section">
        <h2>📚 Downloadable Resources</h2>
        <div className="resources-grid">
          <div className="resource-item">
            <span className="resource-icon">📄</span>
            <div className="resource-info">
              <h4>ASL Alphabet Chart</h4>
              <p>PDF • 2.3 MB</p>
            </div>
            <button className="btn-download">⬇️ Download</button>
          </div>
          <div className="resource-item">
            <span className="resource-icon">🎥</span>
            <div className="resource-info">
              <h4>Video Tutorials Collection</h4>
              <p>ZIP • 45 MB</p>
            </div>
            <button className="btn-download">⬇️ Download</button>
          </div>
          <div className="resource-item">
            <span className="resource-icon">📱</span>
            <div className="resource-info">
              <h4>Mobile Practice App</h4>
              <p>APK • 12 MB</p>
            </div>
            <button className="btn-download">⬇️ Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;
