import React, { useState } from 'react'
import './CommunityReviews.css'

function CommunityReviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      location: 'Kingston Mall',
      user: 'Sarah M.',
      rating: 5,
      comment: 'Excellent accessibility! The mall has wide corridors, accessible restrooms, and helpful staff.',
      date: '2024-01-15',
      helpful: 12
    },
    {
      id: 2,
      location: 'Devon House',
      user: 'Michael R.',
      rating: 2,
      comment: 'Beautiful place but very limited accessibility. No ramps and stairs everywhere.',
      date: '2024-01-10',
      helpful: 8
    },
    {
      id: 3,
      location: 'Emancipation Park',
      user: 'Lisa K.',
      rating: 4,
      comment: 'Great park with accessible pathways. Some areas could use better lighting.',
      date: '2024-01-08',
      helpful: 15
    }
  ])

  const [newReview, setNewReview] = useState({
    location: '',
    rating: 5,
    comment: ''
  })

  const [filterRating, setFilterRating] = useState('all')

  const submitReview = () => {
    if (newReview.location.trim() && newReview.comment.trim()) {
      const review = {
        id: reviews.length + 1,
        ...newReview,
        user: 'You',
        date: new Date().toISOString().split('T')[0],
        helpful: 0
      }
      setReviews(prev => [review, ...prev])
      setNewReview({ location: '', rating: 5, comment: '' })
    }
  }

  const markHelpful = (reviewId) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ))
  }

  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating >= parseInt(filterRating))

  return (
    <div className="community-reviews">
      <h2>👥 Community Reviews</h2>
      
      <div className="review-filters">
        <label>Filter by rating:</label>
        <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="1">1+ Stars</option>
        </select>
      </div>

      <div className="add-review-section">
        <h3>📝 Share Your Experience</h3>
        <div className="review-form">
          <input
            type="text"
            placeholder="Location name..."
            value={newReview.location}
            onChange={(e) => setNewReview(prev => ({ ...prev, location: e.target.value }))}
          />
          
          <div className="rating-input">
            <label>Rating:</label>
            <select 
              value={newReview.rating} 
              onChange={(e) => setNewReview(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
            >
              <option value={1}>1 Star - Poor</option>
              <option value={2}>2 Stars - Fair</option>
              <option value={3}>3 Stars - Good</option>
              <option value={4}>4 Stars - Very Good</option>
              <option value={5}>5 Stars - Excellent</option>
            </select>
          </div>
          
          <textarea
            placeholder="Share your accessibility experience..."
            value={newReview.comment}
            onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
            rows="4"
          />
          
          <button 
            onClick={submitReview} 
            disabled={!newReview.location.trim() || !newReview.comment.trim()}
          >
            Submit Review
          </button>
        </div>
      </div>

      <div className="reviews-list">
        <h3>📋 Community Reviews</h3>
        {filteredReviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="review-location">
                <h4>📍 {review.location}</h4>
                <div className="review-rating">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <div className="review-meta">
                <span className="review-user">👤 {review.user}</span>
                <span className="review-date">📅 {review.date}</span>
              </div>
            </div>
            
            <p className="review-comment">{review.comment}</p>
            
            <div className="review-actions">
              <button 
                className="helpful-btn"
                onClick={() => markHelpful(review.id)}
              >
                👍 Helpful ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="community-stats">
        <h3>📊 Community Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{reviews.length}</div>
            <div className="stat-label">Total Reviews</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
            </div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {reviews.filter(r => r.rating >= 4).length}
            </div>
            <div className="stat-label">Positive Reviews</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityReviews
