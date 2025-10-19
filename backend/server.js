const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;
const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:5001';

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Increase limit for image data

// Mock data for demo
let locations = [
  {
    id: '1',
    name: 'Kingston Mall',
    address: 'Kingston, Jamaica',
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
        comment: 'Great accessibility features!',
        date: '2024-01-15'
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
        comment: 'Limited accessibility options',
        date: '2024-01-10'
      }
    ]
  }
];

let emergencyContacts = [
  {
    id: '1',
    name: 'Emergency Services',
    phone: '119',
    type: 'emergency'
  },
  {
    id: '2',
    name: 'Disability Services Jamaica',
    phone: '+1-876-555-0123',
    type: 'support'
  }
];

// Routes

// Get all locations
app.get('/api/locations', (req, res) => {
  res.json(locations);
});

// Get location by ID
app.get('/api/locations/:id', (req, res) => {
  const location = locations.find(loc => loc.id === req.params.id);
  if (!location) {
    return res.status(404).json({ error: 'Location not found' });
  }
  res.json(location);
});

// Add new location
app.post('/api/locations', (req, res) => {
  const newLocation = {
    id: uuidv4(),
    ...req.body,
    rating: 0,
    reviews: []
  };
  locations.push(newLocation);
  res.status(201).json(newLocation);
});

// Add review to location
app.post('/api/locations/:id/reviews', (req, res) => {
  const location = locations.find(loc => loc.id === req.params.id);
  if (!location) {
    return res.status(404).json({ error: 'Location not found' });
  }
  
  const newReview = {
    id: uuidv4(),
    ...req.body,
    date: new Date().toISOString().split('T')[0]
  };
  
  location.reviews.push(newReview);
  
  // Update rating
  const totalRating = location.reviews.reduce((sum, review) => sum + review.rating, 0);
  location.rating = totalRating / location.reviews.length;
  
  res.status(201).json(newReview);
});

// Get emergency contacts
app.get('/api/emergency-contacts', (req, res) => {
  res.json(emergencyContacts);
});

// Add emergency contact
app.post('/api/emergency-contacts', (req, res) => {
  const newContact = {
    id: uuidv4(),
    ...req.body
  };
  emergencyContacts.push(newContact);
  res.status(201).json(newContact);
});

// Emergency alert endpoint
app.post('/api/emergency-alert', (req, res) => {
  const { location, message, contacts } = req.body;
  
  // In a real app, this would send SMS/email notifications
  console.log('Emergency Alert:', {
    location,
    message,
    contacts,
    timestamp: new Date().toISOString()
  });
  
  res.json({ 
    success: true, 
    message: 'Emergency alert sent',
    alertId: uuidv4()
  });
});

// Sign Language Recognition Routes

// Predict sign language from image
app.post('/api/sign-language/predict', async (req, res) => {
  try {
    const response = await axios.post(`${PYTHON_SERVICE_URL}/api/sign-language/predict`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Sign language prediction error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Sign language service unavailable'
    });
  }
});

// Clear prediction history
app.post('/api/sign-language/clear-history', async (req, res) => {
  try {
    const response = await axios.post(`${PYTHON_SERVICE_URL}/api/sign-language/clear-history`);
    res.json(response.data);
  } catch (error) {
    console.error('Clear history error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Sign language service unavailable'
    });
  }
});

// Get word suggestions
app.post('/api/sign-language/suggestions', async (req, res) => {
  try {
    const response = await axios.post(`${PYTHON_SERVICE_URL}/api/sign-language/suggestions`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Suggestions error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Sign language service unavailable'
    });
  }
});

// Get supported alphabet
app.get('/api/sign-language/alphabet', async (req, res) => {
  try {
    const response = await axios.get(`${PYTHON_SERVICE_URL}/api/sign-language/alphabet`);
    res.json(response.data);
  } catch (error) {
    console.error('Alphabet error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Sign language service unavailable'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`AccessSpeak+ Backend running on port ${PORT}`);
});
