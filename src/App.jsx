import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import SplashScreen from './components/SplashScreen'
import OnboardingFlow from './components/OnboardingFlow'
import Header from './components/Header'
import Navigation from './components/Navigation'
import EnhancedDashboard from './components/EnhancedDashboard'
import SpeechTranslator from './components/SpeechTranslator'
import AccessibilityMap from './components/AccessibilityMap'
import SignLanguageTranslator from './components/SignLanguageTranslator'
import SignLanguageSpeller from './components/SignLanguageSpeller'
import CommunityReviews from './components/CommunityReviews'
import CommunitySupport from './components/CommunitySupport'
import LearningCenter from './components/LearningCenter'
import AIAssistant from './components/AIAssistant'
import WellnessTracker from './components/WellnessTracker'
import EmergencyAssistance from './components/EmergencyAssistance'
import AccessibilitySettings from './components/AccessibilitySettings'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largeText: false,
    easyRead: false,
    voiceNavigation: false,
    screenReader: false
  })

  useEffect(() => {
    // Check if user has completed onboarding
    const savedProfile = localStorage.getItem('userProfile')
    const hasCompletedOnboarding = localStorage.getItem('onboardingComplete')
    
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
      setIsAuthenticated(true)
    }
    
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  const handleOnboardingComplete = (data) => {
    const profile = {
      ...data.userInfo,
      disabilities: data.disabilities,
      name: data.userInfo.name || 'Friend'
    }
    
    setUserProfile(profile)
    setIsAuthenticated(true)
    setShowOnboarding(false)
    
    localStorage.setItem('userProfile', JSON.stringify(profile))
    localStorage.setItem('onboardingComplete', 'true')
  }

  const handleProfileUpdate = (updates) => {
    const updatedProfile = { ...userProfile, ...updates }
    setUserProfile(updatedProfile)
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile))
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />
  }

  return (
    <Router>
      <div className={`app ${accessibilitySettings.highContrast ? 'high-contrast' : ''} ${accessibilitySettings.largeText ? 'large-text' : ''} ${accessibilitySettings.easyRead ? 'easy-read' : ''}`}>
        <Header userProfile={userProfile} />
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <EnhancedDashboard 
                userProfile={userProfile} 
                onProfileUpdate={handleProfileUpdate}
              />
            } />
            <Route path="/dashboard" element={
              <EnhancedDashboard 
                userProfile={userProfile} 
                onProfileUpdate={handleProfileUpdate}
              />
            } />
            <Route path="/speech" element={<SpeechTranslator />} />
            <Route path="/communication" element={<SpeechTranslator />} />
            <Route path="/map" element={<AccessibilityMap />} />
            <Route path="/sign-language" element={<SignLanguageTranslator />} />
            <Route path="/sign" element={<SignLanguageTranslator />} />
            <Route path="/speller" element={<SignLanguageSpeller />} />
            <Route path="/community-reviews" element={<CommunityReviews />} />
            <Route path="/community" element={<CommunitySupport />} />
            <Route path="/learning" element={<LearningCenter />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/wellness" element={<WellnessTracker />} />
            <Route path="/emergency" element={<EmergencyAssistance />} />
            <Route path="/settings" element={
              <AccessibilitySettings 
                settings={accessibilitySettings} 
                onSettingsChange={setAccessibilitySettings} 
              />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
