import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaCompass, 
  FaCamera, 
  FaUtensils, 
  FaHotel, 
  FaCar, 
  FaClock, 
  FaDollarSign,
  FaStar,
  FaHeart,
  FaShare,
  FaDownload,
  FaFilter,
  FaSearch,
  FaSignOutAlt,
  FaUser,
  FaPlus,
  FaBell,
  FaLocationArrow,
  FaPlane,
  FaHeart as FaWishlist
} from 'react-icons/fa';
import { locationService } from './LocationService';
import AddTrip from './AddTrip';
import EditProfile from './EditProfile';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [filterType, setFilterType] = useState('all');
  const [showLocationDetails, setShowLocationDetails] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAddTrip, setShowAddTrip] = useState(false);
  const [itineraryData, setItineraryData] = useState({
    location: "Agra, India",
    duration: "5 days",
    budget: "₹2,00,000",
    itinerary: [
      {
        day: 1,
        date: "2024-01-15",
        title: "Arrival & City Introduction",
        activities: [
          {
            time: "10:00 AM",
            title: "Hotel Check-in",
            type: "accommodation",
            location: "The Oberoi Amarvilas",
            duration: "1 hour",
            cost: 0,
            description: "Luxury hotel with Taj Mahal view",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"
          },
          {
            time: "11:30 AM",
            title: "Taj Mahal Visit",
            type: "activity",
            location: "Taj Mahal",
            duration: "3 hours",
            cost: 1500,
            description: "Visit the iconic white marble mausoleum",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400"
          },
          {
            time: "03:00 PM",
            title: "Lunch at Pinch Of Spice",
            type: "meal",
            location: "Pinch Of Spice",
            duration: "1 hour",
            cost: 1800,
            description: "Authentic North Indian cuisine",
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400"
          },
          {
            time: "05:00 PM",
            title: "Agra Fort Exploration",
            type: "activity",
            location: "Agra Fort",
            duration: "2 hours",
            cost: 1200,
            description: "Explore the red sandstone fort",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400"
          },
          {
            time: "07:30 PM",
            title: "Dinner at Peshawri",
            type: "meal",
            location: "ITC Mughal",
            duration: "1.5 hours",
            cost: 3200,
            description: "Fine dining with Mughlai specialties",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400"
          }
        ]
      },
      {
        day: 2,
        date: "2024-01-16",
        title: "Fatehpur Sikri & Local Culture",
        activities: [
          {
            time: "08:00 AM",
            title: "Breakfast at Hotel",
            type: "meal",
            location: "The Oberoi Amarvilas",
            duration: "1 hour",
            cost: 1500,
            description: "Continental breakfast with local specialties",
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400"
          },
          {
            time: "09:30 AM",
            title: "Fatehpur Sikri Tour",
            type: "activity",
            location: "Fatehpur Sikri",
            duration: "4 hours",
            cost: 2000,
            description: "Visit the abandoned Mughal city",
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400"
          },
          {
            time: "02:00 PM",
            title: "Lunch at Shankara Vegis",
            type: "meal",
            location: "Shankara Vegis",
            duration: "1 hour",
            cost: 1200,
            description: "Pure vegetarian restaurant",
            rating: 4.3,
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400"
          },
          {
            time: "04:00 PM",
            title: "Krishna Janmabhoomi Temple",
            type: "activity",
            location: "Krishna Janmabhoomi",
            duration: "2 hours",
            cost: 500,
            description: "Spiritual visit to Krishna birthplace",
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400"
          },
          {
            time: "07:00 PM",
            title: "Dinner at Dasaprakash",
            type: "meal",
            location: "Dasaprakash",
            duration: "1.5 hours",
            cost: 1500,
            description: "South Indian cuisine",
            rating: 4.2,
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400"
          }
        ]
      },
      {
        day: 3,
        date: "2024-01-17",
        title: "Vrindavan & Mathura",
        activities: [
          {
            time: "08:00 AM",
            title: "Breakfast at Hotel",
            type: "meal",
            location: "The Oberoi Amarvilas",
            duration: "1 hour",
            cost: 1500,
            description: "Traditional Indian breakfast",
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400"
          },
          {
            time: "09:30 AM",
            title: "Vrindavan Temple Tour",
            type: "activity",
            location: "Vrindavan",
            duration: "3 hours",
            cost: 1000,
            description: "Visit famous Krishna temples",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400"
          },
          {
            time: "01:00 PM",
            title: "Lunch at Brijwasi Mithai Wala",
            type: "meal",
            location: "Brijwasi Mithai Wala",
            duration: "1 hour",
            cost: 800,
            description: "Traditional sweets and snacks",
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400"
          },
          {
            time: "03:00 PM",
            title: "Mathura Heritage Walk",
            type: "activity",
            location: "Mathura",
            duration: "2 hours",
            cost: 600,
            description: "Explore the ancient city of Mathura",
            rating: 4.3,
            image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400"
          },
          {
            time: "06:00 PM",
            title: "Evening Aarti at Banke Bihari",
            type: "activity",
            location: "Banke Bihari Temple",
            duration: "1 hour",
            cost: 300,
            description: "Spiritual evening prayer ceremony",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400"
          },
          {
            time: "08:00 PM",
            title: "Farewell Dinner at Pind Balluchi",
            type: "meal",
            location: "Pind Balluchi",
            duration: "1.5 hours",
            cost: 2500,
            description: "Traditional Punjabi cuisine",
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400"
          }
        ]
      }
    ]
  });
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    emergencyNumber: '',
    emergencyRelation: '',
    profilePhoto: '',
    traveledLocations: [],
    wishlist: [],
    activities: []
  });


  useEffect(() => {
    // Load user profile data from localStorage
    const savedProfile = localStorage.getItem('wanderly_user_profile');
    if (savedProfile) {
      try {
        setUserData(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    }

    // Get user location using our location service
    const getLocation = async () => {
      try {
        const location = await locationService.getCurrentLocation();
        setUserLocation({
          lat: location.latitude,
          lng: location.longitude,
          accuracy: location.accuracy
        });
        
        // Get location name
        const locationNameData = await locationService.getLocationName(
          location.latitude, 
          location.longitude
        );
        setLocationName(locationNameData);
        console.log('Current location:', locationNameData.fullName);
      } catch (error) {
        console.log('Location access denied or unavailable:', error.message);
        // Fallback to default location for demo
        setUserLocation({
          lat: 27.1767,
          lng: 78.0081,
          accuracy: 0
        });
        setLocationName({
          city: 'Agra',
          country: 'India',
          region: 'Uttar Pradesh',
          fullName: 'Agra, India'
        });
      }
    };

    getLocation();
  }, []);

  const handleSaveProfile = (profileData) => {
    setUserData(profileData);
    // In a real app, you would save this to a backend
    localStorage.setItem('wanderly_user_profile', JSON.stringify(profileData));
  };

  const handleSaveTrip = (tripData) => {
    setItineraryData(tripData);
    // In a real app, you would save this to a backend
    localStorage.setItem('wanderly_trip_data', JSON.stringify(tripData));
  };

  const toggleFavorite = (activityId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(activityId)) {
      newFavorites.delete(activityId);
    } else {
      newFavorites.add(activityId);
    }
    setFavorites(newFavorites);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'accommodation': return <FaHotel />;
      case 'dining': return <FaUtensils />;
      case 'attraction': return <FaCamera />;
      case 'activity': return <FaCompass />;
      case 'transport': return <FaCar />;
      default: return <FaMapMarkerAlt />;
    }
  };

  const filteredActivities = filterType === 'all' 
    ? itineraryData.itinerary[selectedDay].activities
    : itineraryData.itinerary[selectedDay].activities.filter(activity => activity.type === filterType);

  return (
    <div className="dashboard">
      {/* Header */}
      <motion.header 
        className="dashboard-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <div className="header-left">
            <motion.div 
              className="logo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCompass className="logo-icon" />
              <span>Wanderly</span>
            </motion.div>
            <div className="location-info">
              <FaMapMarkerAlt className="location-icon" />
              <motion.div 
                className="location-name-container"
                onClick={() => userLocation && setShowLocationDetails(!showLocationDetails)}
                whileHover={userLocation ? { scale: 1.02 } : {}}
                whileTap={userLocation ? { scale: 0.98 } : {}}
                style={{ cursor: userLocation ? 'pointer' : 'default' }}
              >
                <span className="location-name">
                  {locationName ? locationName.fullName : itineraryData.location}
                </span>
                {userLocation && (
                  <div className="location-indicator">
                    <FaLocationArrow className="indicator-icon" />
                    <span className="indicator-text">Click for details</span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
          <div className="header-right">
            <button 
              className="header-btn add-trip-btn"
              onClick={() => setShowAddTrip(true)}
              title="Plan New Trip"
            >
              <FaPlus />
              <span>Add Trip</span>
            </button>
            <button className="header-btn">
              <FaBell />
            </button>
            <button 
              className="header-btn user-profile-btn"
              onClick={() => setShowEditProfile(true)}
              title={userData.name ? `Edit ${userData.name}'s profile` : 'Edit Profile'}
            >
              {userData.profilePhoto ? (
                <img 
                  src={userData.profilePhoto} 
                  alt="Profile" 
                  className="profile-photo-small"
                />
              ) : (
                <FaUser />
              )}
              {userData.name && <span className="user-name">{userData.name}</span>}
            </button>
            <button 
              className="logout-btn"
              onClick={() => navigate('/')}
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Location Details Panel */}
      <AnimatePresence>
        {showLocationDetails && userLocation && (
          <motion.div 
            className="location-details-panel"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="location-panel-content">
              <div className="location-panel-header">
                <h3>Your Current Location</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowLocationDetails(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="location-data-grid">
                <div className="location-data-item">
                  <div className="data-label">
                    <FaMapMarkerAlt />
                    <span>Coordinates</span>
                  </div>
                  <div className="data-value">
                    <div className="coordinate">
                      <strong>Latitude:</strong> {userLocation.lat.toFixed(6)}
                    </div>
                    <div className="coordinate">
                      <strong>Longitude:</strong> {userLocation.lng.toFixed(6)}
                    </div>
                  </div>
                </div>

                <div className="location-data-item">
                  <div className="data-label">
                    <FaCompass />
                    <span>Location Details</span>
                  </div>
                  <div className="data-value">
                    <div className="location-detail">
                      <strong>City:</strong> {locationName?.city || 'Unknown'}
                    </div>
                    <div className="location-detail">
                      <strong>Region:</strong> {locationName?.region || 'Unknown'}
                    </div>
                    <div className="location-detail">
                      <strong>Country:</strong> {locationName?.country || 'Unknown'}
                    </div>
                  </div>
                </div>

                <div className="location-data-item">
                  <div className="data-label">
                    <FaLocationArrow />
                    <span>Accuracy</span>
                  </div>
                  <div className="data-value">
                    <div className="accuracy-info">
                      <div className="accuracy-value">
                        {userLocation.accuracy > 0 ? `${Math.round(userLocation.accuracy)}m` : 'Unknown'}
                      </div>
                      <div className="accuracy-bar">
                        <div 
                          className="accuracy-fill"
                          style={{ 
                            width: `${Math.min(100, Math.max(0, 100 - (userLocation.accuracy / 100)))}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="location-data-item">
                  <div className="data-label">
                    <FaClock />
                    <span>Detection Time</span>
                  </div>
                  <div className="data-value">
                    <div className="timestamp">
                      {new Date().toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="location-actions">
                <button 
                  className="action-btn"
                  onClick={() => {
                    const mapsUrl = `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`;
                    window.open(mapsUrl, '_blank');
                  }}
                >
                  <FaMapMarkerAlt />
                  Open in Maps
                </button>
                <button 
                  className="action-btn"
                  onClick={() => {
                    const shareText = `I'm currently at ${locationName?.fullName || 'Unknown Location'} (${userLocation.lat.toFixed(6)}, ${userLocation.lng.toFixed(6)})`;
                    if (navigator.share) {
                      navigator.share({
                        title: 'My Location',
                        text: shareText,
                        url: `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`
                      });
                    } else {
                      navigator.clipboard.writeText(shareText);
                      alert('Location copied to clipboard!');
                    }
                  }}
                >
                  <FaShare />
                  Share Location
                </button>
                <button 
                  className="action-btn"
                  onClick={async () => {
                    try {
                      const location = await locationService.getCurrentLocation();
                      setUserLocation({
                        lat: location.latitude,
                        lng: location.longitude,
                        accuracy: location.accuracy
                      });
                      
                      const locationNameData = await locationService.getLocationName(
                        location.latitude, 
                        location.longitude
                      );
                      setLocationName(locationNameData);
                    } catch (error) {
                      console.log('Error refreshing location:', error.message);
                    }
                  }}
                >
                  <FaCompass />
                  Refresh Location
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <motion.aside 
          className="sidebar"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* User Profile Section */}
          {userData.name && (
            <div className="user-profile-section">
              <div className="user-profile-header">
                {userData.profilePhoto ? (
                  <img 
                    src={userData.profilePhoto} 
                    alt="Profile" 
                    className="profile-photo-large"
                  />
                ) : (
                  <div className="profile-photo-placeholder">
                    <FaUser />
                  </div>
                )}
                <h3>Welcome back, {userData.name}!</h3>
              </div>
              <div className="user-info">
                {userData.age && <div className="user-detail">Age: {userData.age}</div>}
                {userData.gender && <div className="user-detail">Gender: {userData.gender}</div>}
                {userData.contact && <div className="user-detail">Contact: {userData.contact}</div>}
              </div>
            </div>
          )}

          <div className="trip-summary">
            <h3>Trip Summary</h3>
            <div className="summary-item">
              <FaClock />
              <span>{itineraryData.duration}</span>
            </div>
            <div className="summary-item">
              <FaDollarSign />
              <span>{itineraryData.budget}</span>
            </div>
            <div className="summary-item">
              <FaMapMarkerAlt />
              <span>{itineraryData.location}</span>
            </div>
          </div>

          {/* User Travel Stats */}
          {(userData.traveledLocations.length > 0 || userData.wishlist.length > 0 || userData.activities.length > 0) && (
            <div className="user-travel-stats">
              <h3>Your Travel Profile</h3>
              
              {userData.traveledLocations.length > 0 && (
                <div className="stat-section">
                  <h4><FaPlane /> Visited Places</h4>
                  <div className="stat-items">
                    {userData.traveledLocations.slice(0, 3).map((location, index) => (
                      <span key={index} className="stat-item">{location}</span>
                    ))}
                    {userData.traveledLocations.length > 3 && (
                      <span className="stat-item">+{userData.traveledLocations.length - 3} more</span>
                    )}
                  </div>
                </div>
              )}

              {userData.wishlist.length > 0 && (
                <div className="stat-section">
                  <h4><FaWishlist /> Wishlist</h4>
                  <div className="stat-items">
                    {userData.wishlist.slice(0, 3).map((item, index) => (
                      <span key={index} className="stat-item">{item}</span>
                    ))}
                    {userData.wishlist.length > 3 && (
                      <span className="stat-item">+{userData.wishlist.length - 3} more</span>
                    )}
                  </div>
                </div>
              )}

              {userData.activities.length > 0 && (
                <div className="stat-section">
                  <h4><FaCamera /> Interests</h4>
                  <div className="stat-items">
                    {userData.activities.slice(0, 3).map((activity, index) => (
                      <span key={index} className="stat-item">{activity}</span>
                    ))}
                    {userData.activities.length > 3 && (
                      <span className="stat-item">+{userData.activities.length - 3} more</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="day-selector">
            <h3>Itinerary Days</h3>
            {itineraryData.itinerary.map((day, index) => (
              <motion.button
                key={day.day}
                className={`day-btn ${selectedDay === index ? 'active' : ''}`}
                onClick={() => setSelectedDay(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="day-number">Day {day.day}</div>
                <div className="day-date">{day.date}</div>
                <div className="day-title">{day.title}</div>
              </motion.button>
            ))}
          </div>

          <div className="action-buttons">
            <button className="action-btn">
              <FaDownload />
              Download Itinerary
            </button>
            <button className="action-btn">
              <FaShare />
              Share Trip
            </button>
          </div>
        </motion.aside>

        {/* Main Itinerary */}
        <motion.main 
          className="main-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Day Header */}
          <div className="day-header">
            <h1>{itineraryData.itinerary[selectedDay].title}</h1>
            <p>Day {itineraryData.itinerary[selectedDay].day} • {itineraryData.itinerary[selectedDay].date}</p>
          </div>

          {/* Filters */}
          <div className="filters">
            <div className="filter-group">
              <FaFilter />
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Activities</option>
                <option value="attraction">Attractions</option>
                <option value="dining">Dining</option>
                <option value="accommodation">Accommodation</option>
                <option value="activity">Activities</option>
                <option value="transport">Transport</option>
              </select>
            </div>
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Search activities..." />
            </div>
          </div>

          {/* Activities List */}
          <div className="activities-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDay}
                className="activities-list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {filteredActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    className="activity-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                  >
                    <div className="activity-image">
                      <img src={activity.image} alt={activity.title} />
                      <div className="activity-type">
                        {getActivityIcon(activity.type)}
                      </div>
                      <button 
                        className={`favorite-btn ${favorites.has(activity.id) ? 'active' : ''}`}
                        onClick={() => toggleFavorite(activity.id)}
                      >
                        <FaHeart />
                      </button>
                    </div>
                    
                    <div className="activity-content">
                      <div className="activity-header">
                        <h3>{activity.title}</h3>
                        <div className="activity-rating">
                          <FaStar />
                          <span>{activity.rating}</span>
                        </div>
                      </div>
                      
                      <div className="activity-details">
                        <div className="detail-item">
                          <FaClock />
                          <span>{activity.time}</span>
                        </div>
                        <div className="detail-item">
                          <FaMapMarkerAlt />
                          <span>{activity.location}</span>
                        </div>
                        <div className="detail-item">
                          <FaDollarSign />
                          <span>{activity.price}</span>
                        </div>
                        <div className="detail-item">
                          <FaClock />
                          <span>{activity.duration}</span>
                        </div>
                      </div>
                      
                      <p className="activity-description">{activity.description}</p>
                      
                      <div className="activity-actions">
                        <button className="btn-primary">View Details</button>
                        <button className="btn-secondary">Add to Favorites</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.main>
      </div>

      {/* Edit Profile Modal */}
      <EditProfile
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={handleSaveProfile}
        userData={userData}
      />

      {/* Add Trip Modal */}
      <AddTrip
        isOpen={showAddTrip}
        onClose={() => setShowAddTrip(false)}
        onSave={handleSaveTrip}
        userLocation={userLocation}
        locationName={locationName}
      />
    </div>
  );
};

export default Dashboard;
