import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign, FaPlus } from 'react-icons/fa';
import './AddTrip.css';

const AddTrip = ({ isOpen, onClose, onSave, userLocation, locationName }) => {
  const [formData, setFormData] = useState({
    amount: '',
    days: '',
    place: locationName?.city || 'Agra',
    state: locationName?.region || 'Uttar Pradesh',
    country: locationName?.country || 'India'
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateItinerary = (tripData) => {
    const { amount, days, place, state, country } = tripData;
    const totalAmount = parseInt(amount);
    const numDays = parseInt(days);
    
    // Calculate budget distribution
    const accommodationBudget = Math.floor(totalAmount * 0.35); // 35% for accommodation
    const mealsBudget = Math.floor(totalAmount * 0.25); // 25% for meals
    const transportBudget = Math.floor(totalAmount * 0.20); // 20% for transport
    const activitiesBudget = Math.floor(totalAmount * 0.15); // 15% for activities
    const miscellaneousBudget = Math.floor(totalAmount * 0.05); // 5% for miscellaneous

    const dailyAccommodation = Math.floor(accommodationBudget / numDays);
    const dailyMeals = Math.floor(mealsBudget / numDays);
    const dailyTransport = Math.floor(transportBudget / numDays);
    const dailyActivities = Math.floor(activitiesBudget / numDays);

    // Generate itinerary for each day
    const itinerary = [];
    for (let day = 1; day <= numDays; day++) {
      const dayPlan = {
        day: day,
        date: new Date(Date.now() + (day - 1) * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
        activities: []
      };

      // Morning activities
      dayPlan.activities.push({
        time: '08:00 AM',
        title: 'Breakfast',
        type: 'meal',
        location: 'Local Restaurant',
        duration: '1 hour',
        cost: Math.floor(dailyMeals * 0.3),
        description: 'Traditional breakfast with local delicacies'
      });

      // Morning sightseeing
      dayPlan.activities.push({
        time: '09:30 AM',
        title: `Day ${day} Sightseeing`,
        type: 'activity',
        location: getRandomLocation(place),
        duration: '3 hours',
        cost: Math.floor(dailyActivities * 0.6),
        description: 'Explore famous attractions and cultural sites'
      });

      // Lunch
      dayPlan.activities.push({
        time: '12:30 PM',
        title: 'Lunch',
        type: 'meal',
        location: 'Heritage Restaurant',
        duration: '1 hour',
        cost: Math.floor(dailyMeals * 0.4),
        description: 'Authentic local cuisine experience'
      });

      // Afternoon activities
      dayPlan.activities.push({
        time: '02:00 PM',
        title: 'Cultural Experience',
        type: 'activity',
        location: getRandomLocation(place),
        duration: '2 hours',
        cost: Math.floor(dailyActivities * 0.4),
        description: 'Visit museums, temples, or cultural centers'
      });

      // Evening activities
      dayPlan.activities.push({
        time: '05:00 PM',
        title: 'Evening Exploration',
        type: 'activity',
        location: getRandomLocation(place),
        duration: '2 hours',
        cost: 0,
        description: 'Free time for shopping or local markets'
      });

      // Dinner
      dayPlan.activities.push({
        time: '07:30 PM',
        title: 'Dinner',
        type: 'meal',
        location: 'Fine Dining Restaurant',
        duration: '1.5 hours',
        cost: Math.floor(dailyMeals * 0.3),
        description: 'Special dinner with regional specialties'
      });

      itinerary.push(dayPlan);
    }

    return {
      location: `${place}, ${state}, ${country}`,
      budget: `₹${totalAmount.toLocaleString('en-IN')}`,
      duration: `${numDays} days`,
      accommodation: {
        budget: `₹${accommodationBudget.toLocaleString('en-IN')}`,
        daily: `₹${dailyAccommodation.toLocaleString('en-IN')}`,
        type: '3-4 Star Hotel'
      },
      meals: {
        budget: `₹${mealsBudget.toLocaleString('en-IN')}`,
        daily: `₹${dailyMeals.toLocaleString('en-IN')}`,
        includes: 'Breakfast, Lunch, Dinner'
      },
      transport: {
        budget: `₹${transportBudget.toLocaleString('en-IN')}`,
        daily: `₹${dailyTransport.toLocaleString('en-IN')}`,
        includes: 'Local cabs, auto-rickshaws, bikes'
      },
      activities: {
        budget: `₹${activitiesBudget.toLocaleString('en-IN')}`,
        daily: `₹${dailyActivities.toLocaleString('en-IN')}`,
        includes: 'Sightseeing, cultural experiences, entrance fees'
      },
      miscellaneous: {
        budget: `₹${miscellaneousBudget.toLocaleString('en-IN')}`,
        includes: 'Shopping, tips, emergency fund'
      },
      itinerary: itinerary
    };
  };

  const getRandomLocation = (place) => {
    const locations = {
      'Agra': ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Itmad-ud-Daulah', 'Mehtab Bagh'],
      'Delhi': ['Red Fort', 'India Gate', 'Lotus Temple', 'Qutub Minar', 'Humayun\'s Tomb'],
      'Mumbai': ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Siddhivinayak Temple', 'Juhu Beach'],
      'Jaipur': ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Jantar Mantar', 'Nahargarh Fort'],
      'Goa': ['Baga Beach', 'Calangute Beach', 'Dudhsagar Falls', 'Old Goa', 'Fort Aguada'],
      'Kerala': ['Backwaters', 'Munnar Hills', 'Kochi Fort', 'Periyar National Park', 'Varkala Beach']
    };
    
    const placeLocations = locations[place] || ['Famous Landmark', 'Cultural Site', 'Historical Monument', 'Natural Wonder', 'Local Attraction'];
    return placeLocations[Math.floor(Math.random() * placeLocations.length)];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newItinerary = generateItinerary(formData);
    onSave(newItinerary);
    setIsGenerating(false);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      amount: '',
      days: '',
      place: locationName?.city || 'Agra',
      state: locationName?.region || 'Uttar Pradesh',
      country: locationName?.country || 'India'
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="add-trip-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="add-trip-modal"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="add-trip-header">
              <h2>Plan Your Trip</h2>
              <button className="close-btn" onClick={handleClose}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="add-trip-form">
              <div className="form-group">
                <label htmlFor="amount">
                  <FaRupeeSign className="icon" />
                  Total Budget (₹)
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter your budget"
                  required
                  min="1000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="days">
                  <FaCalendarAlt className="icon" />
                  Number of Days
                </label>
                <input
                  type="number"
                  id="days"
                  name="days"
                  value={formData.days}
                  onChange={handleInputChange}
                  placeholder="Enter number of days"
                  required
                  min="1"
                  max="30"
                />
              </div>

              <div className="form-group">
                <label htmlFor="place">
                  <FaMapMarkerAlt className="icon" />
                  Destination
                </label>
                <input
                  type="text"
                  id="place"
                  name="place"
                  value={formData.place}
                  onChange={handleInputChange}
                  placeholder="Enter destination city"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter country"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="generate-btn" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <div className="spinner"></div>
                      Generating Itinerary...
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      Generate Itinerary
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTrip;
