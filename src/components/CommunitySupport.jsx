import React, { useState } from 'react';
import './CommunitySupport.css';

const CommunitySupport = () => {
  const [activeTab, setActiveTab] = useState('forums');
  const [selectedForum, setSelectedForum] = useState(null);

  const forums = [
    {
      id: 1,
      category: 'Visual Impairment',
      icon: '👁️',
      color: '#3b82f6',
      topics: 245,
      posts: 1823,
      members: 892,
      latestPost: 'Screen reader recommendations for Mac',
      latestTime: '5 min ago'
    },
    {
      id: 2,
      category: 'Hearing Impairment',
      icon: '👂',
      color: '#10b981',
      topics: 189,
      posts: 1456,
      members: 734,
      latestPost: 'Best captioning apps for meetings',
      latestTime: '12 min ago'
    },
    {
      id: 3,
      category: 'Mobility Support',
      icon: '♿',
      color: '#8b5cf6',
      topics: 312,
      posts: 2104,
      members: 1023,
      latestPost: 'Accessible parking tips in NYC',
      latestTime: '23 min ago'
    },
    {
      id: 4,
      category: 'Cognitive Support',
      icon: '🧠',
      color: '#f59e0b',
      topics: 156,
      posts: 987,
      members: 567,
      latestPost: 'Memory aids and organization tools',
      latestTime: '1 hour ago'
    }
  ];

  const experts = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Assistive Technology',
      verified: true,
      avatar: '👩‍⚕️',
      rating: 4.9,
      consultations: 234,
      available: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Sign Language Interpreter',
      verified: true,
      avatar: '👨‍🏫',
      rating: 4.8,
      consultations: 189,
      available: true
    },
    {
      id: 3,
      name: 'Emma Williams',
      specialty: 'Occupational Therapist',
      verified: true,
      avatar: '👩‍💼',
      rating: 5.0,
      consultations: 312,
      available: false
    },
    {
      id: 4,
      name: 'Dr. James Martinez',
      specialty: 'Accessibility Consultant',
      verified: true,
      avatar: '👨‍💻',
      rating: 4.7,
      consultations: 156,
      available: true
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Accessibility Tech Expo 2025',
      type: 'In-Person',
      date: 'Nov 15, 2025',
      time: '10:00 AM - 6:00 PM',
      location: 'San Francisco, CA',
      attendees: 234,
      icon: '🎪',
      color: '#3b82f6'
    },
    {
      id: 2,
      title: 'Virtual ASL Workshop',
      type: 'Virtual',
      date: 'Nov 8, 2025',
      time: '2:00 PM - 4:00 PM',
      location: 'Online',
      attendees: 567,
      icon: '🤟',
      color: '#10b981'
    },
    {
      id: 3,
      title: 'Inclusive Design Webinar',
      type: 'Virtual',
      date: 'Nov 12, 2025',
      time: '1:00 PM - 3:00 PM',
      location: 'Online',
      attendees: 892,
      icon: '🎨',
      color: '#8b5cf6'
    },
    {
      id: 4,
      title: 'Disability Rights Conference',
      type: 'In-Person',
      date: 'Nov 20, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'New York, NY',
      attendees: 445,
      icon: '⚖️',
      color: '#f59e0b'
    }
  ];

  const resources = [
    {
      id: 1,
      title: 'Assistive Technology Grant Program',
      category: 'Financial Assistance',
      icon: '💰',
      description: 'Funding for assistive devices and equipment',
      link: '#'
    },
    {
      id: 2,
      title: 'Local Support Services Directory',
      category: 'Services',
      icon: '🏥',
      description: 'Find accessibility services near you',
      link: '#'
    },
    {
      id: 3,
      title: 'Equipment Rental Program',
      category: 'Equipment',
      icon: '🛠️',
      description: 'Rent mobility aids and assistive devices',
      link: '#'
    },
    {
      id: 4,
      title: 'Legal Rights & Advocacy',
      category: 'Legal',
      icon: '⚖️',
      description: 'Know your rights and get legal support',
      link: '#'
    }
  ];

  const successStories = [
    {
      id: 1,
      author: 'Jessica M.',
      avatar: '👩',
      story: 'EnSync helped me find accessible routes throughout my city. I can now navigate independently with confidence!',
      achievement: 'Independent Navigator',
      likes: 234
    },
    {
      id: 2,
      author: 'David K.',
      avatar: '👨',
      story: 'The sign language learning center transformed my communication. I went from beginner to conversational in 3 months!',
      achievement: 'ASL Communicator',
      likes: 189
    },
    {
      id: 3,
      author: 'Maria S.',
      avatar: '👩‍🦽',
      story: 'The community support here is incredible. I found my local support group and made lifelong friends.',
      achievement: 'Community Builder',
      likes: 312
    }
  ];

  const renderForums = () => (
    <div className="forums-section">
      <div className="section-header">
        <h2>💬 Community Forums</h2>
        <button className="btn-new-topic">+ New Topic</button>
      </div>
      
      <div className="forums-grid">
        {forums.map(forum => (
          <div 
            key={forum.id} 
            className="forum-card"
            style={{ borderLeftColor: forum.color }}
          >
            <div className="forum-header">
              <span className="forum-icon" style={{ background: forum.color }}>
                {forum.icon}
              </span>
              <h3>{forum.category}</h3>
            </div>
            
            <div className="forum-stats">
              <div className="stat">
                <span className="stat-value">{forum.topics}</span>
                <span className="stat-label">Topics</span>
              </div>
              <div className="stat">
                <span className="stat-value">{forum.posts}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat">
                <span className="stat-value">{forum.members}</span>
                <span className="stat-label">Members</span>
              </div>
            </div>

            <div className="forum-latest">
              <p className="latest-post">{forum.latestPost}</p>
              <span className="latest-time">🕐 {forum.latestTime}</span>
            </div>

            <button className="btn-visit-forum">Visit Forum →</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExperts = () => (
    <div className="experts-section">
      <div className="section-header">
        <h2>👨‍⚕️ Expert Advice</h2>
        <p className="section-subtitle">Connect with verified professionals</p>
      </div>

      <div className="experts-grid">
        {experts.map(expert => (
          <div key={expert.id} className="expert-card">
            <div className="expert-avatar">{expert.avatar}</div>
            <div className="expert-info">
              <div className="expert-name">
                <h3>{expert.name}</h3>
                {expert.verified && <span className="verified-badge">✓</span>}
              </div>
              <p className="expert-specialty">{expert.specialty}</p>
              
              <div className="expert-stats">
                <span className="rating">⭐ {expert.rating}</span>
                <span className="consultations">💬 {expert.consultations} consultations</span>
              </div>

              <div className="expert-status">
                <span className={`status-indicator ${expert.available ? 'available' : 'busy'}`}>
                  {expert.available ? '🟢 Available' : '🔴 Busy'}
                </span>
              </div>

              <button className="btn-consult">
                {expert.available ? 'Book Consultation' : 'Join Waitlist'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="events-section">
      <div className="section-header">
        <h2>📅 Upcoming Events</h2>
        <div className="event-filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Virtual</button>
          <button className="filter-btn">In-Person</button>
        </div>
      </div>

      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-icon" style={{ background: event.color }}>
              {event.icon}
            </div>
            <div className="event-content">
              <div className="event-type-badge" style={{ background: event.color }}>
                {event.type}
              </div>
              <h3>{event.title}</h3>
              <div className="event-details">
                <p>📅 {event.date}</p>
                <p>🕐 {event.time}</p>
                <p>📍 {event.location}</p>
                <p>👥 {event.attendees} attending</p>
              </div>
              <button className="btn-register" style={{ background: event.color }}>
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="resources-section">
      <div className="section-header">
        <h2>📚 Resource Directory</h2>
        <p className="section-subtitle">Access services, equipment, and financial assistance</p>
      </div>

      <div className="resources-grid">
        {resources.map(resource => (
          <div key={resource.id} className="resource-card">
            <span className="resource-icon">{resource.icon}</span>
            <div className="resource-content">
              <span className="resource-category">{resource.category}</span>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a href={resource.link} className="btn-learn-more">Learn More →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSuccessStories = () => (
    <div className="success-section">
      <div className="section-header">
        <h2>🌟 Success Stories</h2>
        <p className="section-subtitle">Inspiring testimonials from our community</p>
      </div>

      <div className="stories-grid">
        {successStories.map(story => (
          <div key={story.id} className="story-card">
            <div className="story-header">
              <span className="story-avatar">{story.avatar}</span>
              <div className="story-author">
                <h4>{story.author}</h4>
                <span className="achievement-badge">🏆 {story.achievement}</span>
              </div>
            </div>
            <p className="story-content">{story.story}</p>
            <div className="story-footer">
              <button className="btn-like">❤️ {story.likes}</button>
              <button className="btn-share">Share</button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-share-story">Share Your Story</button>
    </div>
  );

  return (
    <div className="community-support">
      <div className="community-header">
        <h1>🤝 Community Support</h1>
        <p className="community-subtitle">Connect, learn, and grow together</p>
      </div>

      <div className="community-tabs">
        <button 
          className={`tab-btn ${activeTab === 'forums' ? 'active' : ''}`}
          onClick={() => setActiveTab('forums')}
        >
          💬 Forums
        </button>
        <button 
          className={`tab-btn ${activeTab === 'experts' ? 'active' : ''}`}
          onClick={() => setActiveTab('experts')}
        >
          👨‍⚕️ Experts
        </button>
        <button 
          className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          📅 Events
        </button>
        <button 
          className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          📚 Resources
        </button>
        <button 
          className={`tab-btn ${activeTab === 'stories' ? 'active' : ''}`}
          onClick={() => setActiveTab('stories')}
        >
          🌟 Stories
        </button>
      </div>

      <div className="community-content">
        {activeTab === 'forums' && renderForums()}
        {activeTab === 'experts' && renderExperts()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'resources' && renderResources()}
        {activeTab === 'stories' && renderSuccessStories()}
      </div>
    </div>
  );
};

export default CommunitySupport;
