import React, { useState, useEffect, useRef } from 'react'
import './AccessibilityMap.css'

function AccessibilityMap() {
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    // Mock data with expanded locations
    setLocations([
      {
        id: '1',
        name: 'Kingston Mall',
        address: '30 Dominica Dr, Kingston, Jamaica',
        lat: 18.0179,
        lng: -76.8099,
        accessibility: {
          wheelchairAccessible: true,
          hasElevator: true,
          hasRamp: true,
          accessibleRestroom: true,
          accessibleParking: true
        },
        rating: 4.5,
        reviews: [
          {
            id: '1',
            userId: 'user1',
            rating: 5,
            comment: 'Great accessibility features! Wide aisles and automatic doors.',
            date: '2024-01-15'
          },
          {
            id: '1b',
            userId: 'user5',
            rating: 4,
            comment: 'Excellent parking spaces and elevator access to all floors.',
            date: '2024-02-01'
          }
        ]
      },
      {
        id: '2',
        name: 'Devon House',
        address: '26 Hope Rd, Kingston, Jamaica',
        lat: 18.0208,
        lng: -76.7894,
        accessibility: {
          wheelchairAccessible: false,
          hasElevator: false,
          hasRamp: false,
          accessibleRestroom: false,
          accessibleParking: true
        },
        rating: 2.0,
        reviews: [
          {
            id: '2',
            userId: 'user2',
            rating: 2,
            comment: 'Limited accessibility options. Historic building with stairs.',
            date: '2024-01-10'
          }
        ]
      },
      {
        id: '3',
        name: 'National Gallery of Jamaica',
        address: '12 Ocean Blvd, Kingston, Jamaica',
        lat: 17.9686,
        lng: -76.7936,
        accessibility: {
          wheelchairAccessible: true,
          hasElevator: true,
          hasRamp: true,
          accessibleRestroom: true,
          accessibleParking: true
        },
        rating: 4.8,
        reviews: [
          {
            id: '3a',
            userId: 'user3',
            rating: 5,
            comment: 'Fully accessible museum with wheelchair-friendly exhibits and staff assistance.',
            date: '2024-02-20'
          },
          {
            id: '3b',
            userId: 'user8',
            rating: 5,
            comment: 'Excellent accessibility! Ramps throughout and accessible audio guides available.',
            date: '2024-03-05'
          }
        ]
      },
      {
        id: '4',
        name: 'Emancipation Park',
        address: 'Knutsford Blvd, Kingston, Jamaica',
        lat: 18.0089,
        lng: -76.7831,
        accessibility: {
          wheelchairAccessible: true,
          hasElevator: false,
          hasRamp: true,
          accessibleRestroom: true,
          accessibleParking: true
        },
        rating: 4.3,
        reviews: [
          {
            id: '4a',
            userId: 'user4',
            rating: 4,
            comment: 'Beautiful park with paved pathways. Some areas have slight inclines.',
            date: '2024-02-15'
          },
          {
            id: '4b',
            userId: 'user9',
            rating: 5,
            comment: 'Great outdoor space! Smooth paths and accessible restrooms near the entrance.',
            date: '2024-03-10'
          }
        ]
      },
      {
        id: '5',
        name: 'University Hospital of the West Indies',
        address: 'Mona, Kingston, Jamaica',
        lat: 18.0056,
        lng: -76.7472,
        accessibility: {
          wheelchairAccessible: true,
          hasElevator: true,
          hasRamp: true,
          accessibleRestroom: true,
          accessibleParking: true
        },
        rating: 4.7,
        reviews: [
          {
            id: '5a',
            userId: 'user6',
            rating: 5,
            comment: 'Fully accessible hospital with excellent facilities for persons with disabilities.',
            date: '2024-01-25'
          },
          {
            id: '5b',
            userId: 'user10',
            rating: 4,
            comment: 'Good accessibility features. Elevators can be slow during peak hours.',
            date: '2024-02-28'
          }
        ]
      },
      {
        id: '6',
        name: 'Sovereign Centre',
        address: '106 Hope Rd, Kingston, Jamaica',
        lat: 18.0156,
        lng: -76.7853,
        accessibility: {
          wheelchairAccessible: true,
          hasElevator: true,
          hasRamp: true,
          accessibleRestroom: true,
          accessibleParking: true
        },
        rating: 4.6,
        reviews: [
          {
            id: '6a',
            userId: 'user7',
            rating: 5,
            comment: 'Modern shopping center with excellent accessibility throughout.',
            date: '2024-03-01'
          },
          {
            id: '6b',
            userId: 'user11',
            rating: 4,
            comment: 'Wide corridors and accessible parking. Food court is fully accessible.',
            date: '2024-03-15'
          }
        ]
      },
      {
        id: '7',
        name: 'Bob Marley Museum',
        address: '56 Hope Rd, Kingston, Jamaica',
        lat: 18.0178,
        lng: -76.7826,
        accessibility: {
          wheelchairAccessible: false,
          hasElevator: false,
          hasRamp: false,
          accessibleRestroom: false,
          accessibleParking: true
        },
        rating: 2.5,
        reviews: [
          {
            id: '7a',
            userId: 'user12',
            rating: 3,
            comment: 'Historic home with limited accessibility. Staff is helpful but many stairs.',
            date: '2024-02-10'
          },
          {
            id: '7b',
            userId: 'user13',
            rating: 2,
            comment: 'Difficult for wheelchair users. Ground floor only accessible.',
            date: '2024-03-08'
          }
        ]
      },
      {
        id: '8',
        name: 'Half Way Tree Transport Centre',
        address: 'Half Way Tree Rd, Kingston, Jamaica',
        lat: 18.0125,
        lng: -76.7972,
        accessibility: {
          wheelchairAccessible: true,
          hasElevator: false,
          hasRamp: true,
          accessibleRestroom: true,
          accessibleParking: false
        },
        rating: 3.5,
        reviews: [
          {
            id: '8a',
            userId: 'user14',
            rating: 4,
            comment: 'Busy transport hub with ramps. Can be crowded during peak hours.',
            date: '2024-02-22'
          },
          {
            id: '8b',
            userId: 'user15',
            rating: 3,
            comment: 'Accessible but needs better signage for accessible routes.',
            date: '2024-03-12'
          }
        ]
      },
      {
        id: '9',
        name: 'Jamaica Conference Centre',
        address: '14-20 Port Royal St, Kingston, Jamaica',
        lat: 17.9717,
        lng: -76.7911,
        accessibility: {
          wheelchairAccessible: true,
          hasElevator: true,
          hasRamp: true,
          accessibleRestroom: true,
          accessibleParking: true
        },
        rating: 4.9,
        reviews: [
          {
            id: '9a',
            userId: 'user16',
            rating: 5,
            comment: 'State-of-the-art facility with complete accessibility features.',
            date: '2024-01-30'
          },
          {
            id: '9b',
            userId: 'user17',
            rating: 5,
            comment: 'Best accessible venue in Kingston! Elevators, ramps, and accessible seating.',
            date: '2024-03-18'
          }
        ]
      },
      {
        id: '10',
        name: 'Liguanea Plaza',
        address: 'Liguanea, Kingston, Jamaica',
        lat: 18.0089,
        lng: -76.7694,
        accessibility: {
          wheelchairAccessible: true,
          hasElevator: false,
          hasRamp: true,
          accessibleRestroom: true,
          accessibleParking: true
        },
        rating: 4.2,
        reviews: [
          {
            id: '10a',
            userId: 'user18',
            rating: 4,
            comment: 'Good shopping plaza with accessible parking and ramps to all stores.',
            date: '2024-02-18'
          },
          {
            id: '10b',
            userId: 'user19',
            rating: 4,
            comment: 'Mostly accessible. Some shops have small steps but overall good.',
            date: '2024-03-20'
          }
        ]
      }
    ])

    // Load Leaflet CSS and JS
    loadLeaflet()
  }, [])

  const loadLeaflet = () => {
    // Load Leaflet CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
    link.crossOrigin = ''
    document.head.appendChild(link)

    // Load Leaflet JS
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
    script.crossOrigin = ''
    script.onload = () => {
      initializeMap()
    }
    document.head.appendChild(script)
  }

  const initializeMap = () => {
    if (mapRef.current && window.L) {
      // Initialize map centered on Kingston, Jamaica
      const map = window.L.map(mapRef.current).setView([18.0179, -76.8099], 12)
      mapInstanceRef.current = map

      // Add OpenStreetMap tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map)

      // Add markers for each location
      locations.forEach(location => {
        const marker = window.L.marker([location.lat, location.lng])
          .addTo(map)
          .bindPopup(`
            <div class="map-popup">
              <h4>${location.name}</h4>
              <p>${location.address}</p>
              <div class="accessibility-summary">
                ${location.accessibility.wheelchairAccessible ? '♿' : '❌'} 
                ${location.accessibility.hasElevator ? '🛗' : '❌'} 
                ${location.accessibility.hasRamp ? '🛤️' : '❌'}
              </div>
              <div class="rating">${'★'.repeat(Math.floor(location.rating))}${'☆'.repeat(5 - Math.floor(location.rating))}</div>
            </div>
          `)

        // Add click handler to select location
        marker.on('click', () => {
          setSelectedLocation(location)
        })
      })

      setMapLoaded(true)
    }
  }

  // Re-initialize map when locations change
  useEffect(() => {
    if (mapLoaded && mapInstanceRef.current && locations.length > 0) {
      // Clear existing markers
      mapInstanceRef.current.eachLayer(layer => {
        if (layer instanceof window.L.Marker) {
          mapInstanceRef.current.removeLayer(layer)
        }
      })

      // Add new markers
      locations.forEach(location => {
        const marker = window.L.marker([location.lat, location.lng])
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div class="map-popup">
              <h4>${location.name}</h4>
              <p>${location.address}</p>
              <div class="accessibility-summary">
                ${location.accessibility.wheelchairAccessible ? '♿' : '❌'} 
                ${location.accessibility.hasElevator ? '🛗' : '❌'} 
                ${location.accessibility.hasRamp ? '🛤️' : '❌'}
              </div>
              <div class="rating">${'★'.repeat(Math.floor(location.rating))}${'☆'.repeat(5 - Math.floor(location.rating))}</div>
            </div>
          `)

        marker.on('click', () => {
          setSelectedLocation(location)
        })
      })
    }
  }, [locations, mapLoaded])

  const submitReview = () => {
    if (selectedLocation && newReview.comment.trim()) {
      const review = {
        id: Date.now().toString(),
        userId: 'current-user',
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      }
      
      setLocations(prev => prev.map(loc => 
        loc.id === selectedLocation.id 
          ? { ...loc, reviews: [...loc.reviews, review] }
          : loc
      ))
      
      setNewReview({ rating: 5, comment: '' })
    }
  }

  return (
    <div className="accessibility-map">
      <h2>♿ Accessibility Map</h2>
      
      <div className="map-container">
        <div className="map-header">
          <h3>🗺️ Interactive Accessibility Map</h3>
          <p className="map-subtitle">Powered by OpenStreetMap</p>
        </div>
        
        <div className="map-wrapper">
          <div 
            ref={mapRef} 
            className="leaflet-map"
            style={{ height: '400px', width: '100%' }}
          >
            {!mapLoaded && (
              <div className="map-loading">
                <div className="loading-spinner"></div>
                <p>Loading map...</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-icon accessible">♿</span>
            <span>Wheelchair Accessible</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon elevator">🛗</span>
            <span>Has Elevator</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon ramp">🛤️</span>
            <span>Has Ramp</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon not-accessible">❌</span>
            <span>Limited Access</span>
          </div>
        </div>
      </div>

      <div className="locations-list">
        <h3>📍 Nearby Locations</h3>
        {locations.map(location => (
          <div 
            key={location.id} 
            className={`location-card ${selectedLocation?.id === location.id ? 'selected' : ''}`}
            onClick={() => setSelectedLocation(location)}
          >
            <div className="location-header">
              <h4>{location.name}</h4>
              <div className="rating">
                {'★'.repeat(Math.floor(location.rating))}
                {'☆'.repeat(5 - Math.floor(location.rating))}
                <span className="rating-number">({location.rating})</span>
              </div>
            </div>
            
            <p className="location-address">{location.address}</p>
            
            <div className="accessibility-features">
              <div className={`feature ${location.accessibility.wheelchairAccessible ? 'available' : 'unavailable'}`}>
                ♿ Wheelchair Accessible
              </div>
              <div className={`feature ${location.accessibility.hasElevator ? 'available' : 'unavailable'}`}>
                🛗 Elevator
              </div>
              <div className={`feature ${location.accessibility.hasRamp ? 'available' : 'unavailable'}`}>
                🛤️ Ramp
              </div>
              <div className={`feature ${location.accessibility.accessibleRestroom ? 'available' : 'unavailable'}`}>
                🚻 Accessible Restroom
              </div>
              <div className={`feature ${location.accessibility.accessibleParking ? 'available' : 'unavailable'}`}>
                🅿️ Accessible Parking
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedLocation && (
        <div className="review-section">
          <h3>📝 Add Review for {selectedLocation.name}</h3>
          <div className="review-form">
            <div className="rating-input">
              <label>Rating:</label>
              <select 
                value={newReview.rating} 
                onChange={(e) => setNewReview(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
              >
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </select>
            </div>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Share your accessibility experience..."
              rows="3"
            />
            <button onClick={submitReview} disabled={!newReview.comment.trim()}>
              Submit Review
            </button>
          </div>
          
          <div className="existing-reviews">
            <h4>Recent Reviews</h4>
            {selectedLocation.reviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <span className="review-rating">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </span>
                  <span className="review-date">{review.date}</span>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AccessibilityMap
