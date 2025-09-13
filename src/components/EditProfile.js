import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaPlane, 
  FaSwimmingPool, 
  FaMountain, 
  FaCamera, 
  FaUtensils, 
  FaTimes,
  FaSave,
  FaEdit
} from 'react-icons/fa';
import './EditProfile.css';

const EditProfile = ({ isOpen, onClose, onSave, userData = {} }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    name: userData.name || '',
    age: userData.age || '',
    gender: userData.gender || '',
    contact: userData.contact || '',
    emergencyNumber: userData.emergencyNumber || '',
    emergencyRelation: userData.emergencyRelation || '',
    profilePhoto: userData.profilePhoto || '',
    
    // Travel Information
    traveledLocations: userData.traveledLocations || [],
    wishlist: userData.wishlist || [],
    activities: userData.activities || [],
    
    // New entries
    newLocation: '',
    newWishlist: '',
    newActivity: ''
  });

  const [activeTab, setActiveTab] = useState('personal');

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const emergencyRelations = [
    { value: 'family', label: 'Family' },
    { value: 'friend', label: 'Friend' },
    { value: 'spouse', label: 'Spouse' },
    { value: 'partner', label: 'Partner' },
    { value: 'other', label: 'Other' }
  ];

  const activityCategories = [
    { icon: <FaSwimmingPool />, category: 'Water Sports', activities: ['Swimming', 'Scuba Diving', 'Surfing', 'Kayaking', 'Sailing', 'Water Skiing'] },
    { icon: <FaMountain />, category: 'Adventure', activities: ['Paragliding', 'Rock Climbing', 'Hiking', 'Bungee Jumping', 'Skydiving', 'Mountain Biking'] },
    { icon: <FaCamera />, category: 'Photography', activities: ['Landscape Photography', 'Wildlife Photography', 'Street Photography', 'Portrait Photography'] },
    { icon: <FaUtensils />, category: 'Culinary', activities: ['Cooking Classes', 'Food Tours', 'Wine Tasting', 'Local Cuisine'] },
    { icon: <FaPlane />, category: 'Travel', activities: ['Solo Travel', 'Group Travel', 'Backpacking', 'Luxury Travel'] }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Create a new image to handle orientation
        const img = new Image();
        img.onload = () => {
          // Create canvas to fix orientation
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set canvas dimensions
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw image with proper orientation
          ctx.drawImage(img, 0, 0);
          
          // Convert to data URL
          const dataURL = canvas.toDataURL('image/jpeg', 0.8);
          
          setFormData(prev => ({
            ...prev,
            profilePhoto: dataURL
          }));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      profilePhoto: ''
    }));
  };

  const handleAddItem = (type) => {
    const newItem = formData[`new${type}`].trim();
    if (newItem) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], newItem],
        [`new${type}`]: ''
      }));
    }
  };

  const handleRemoveItem = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const renderPersonalInfo = () => (
    <div className="form-section">
      <h3>Personal Information</h3>
      
      {/* Profile Photo Section */}
      <div className="form-group profile-photo-section">
        <label>
          <FaCamera />
          Profile Photo
        </label>
        <div className="photo-upload-container">
          {formData.profilePhoto ? (
            <div className="photo-preview">
              <img src={formData.profilePhoto} alt="Profile preview" />
              <button
                type="button"
                className="remove-photo-btn"
                onClick={removePhoto}
                title="Remove photo"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <div className="photo-upload-placeholder">
              <FaCamera className="upload-icon" />
              <span>Click to upload photo</span>
            </div>
          )}
          <input
            type="file"
            id="profile-photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="photo-input"
          />
          <label htmlFor="profile-photo" className="photo-upload-btn">
            {formData.profilePhoto ? 'Change Photo' : 'Upload Photo'}
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label>
          <FaUser />
          Full Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            placeholder="Age"
            min="1"
            max="120"
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
          >
            <option value="">Select Gender</option>
            {genderOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>
          <FaPhone />
          Contact Number
        </label>
        <input
          type="tel"
          value={formData.contact}
          onChange={(e) => handleInputChange('contact', e.target.value)}
          placeholder="+91 9876543210"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Emergency Contact</label>
          <input
            type="tel"
            value={formData.emergencyNumber}
            onChange={(e) => handleInputChange('emergencyNumber', e.target.value)}
            placeholder="Emergency contact number"
          />
        </div>

        <div className="form-group">
          <label>Relation</label>
          <select
            value={formData.emergencyRelation}
            onChange={(e) => handleInputChange('emergencyRelation', e.target.value)}
          >
            <option value="">Select Relation</option>
            {emergencyRelations.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderTravelInfo = () => (
    <div className="form-section">
      <h3>Travel Information</h3>
      
      {/* Traveled Locations */}
      <div className="form-group">
        <label>
          <FaMapMarkerAlt />
          Places You've Traveled
        </label>
        <div className="list-container">
          {formData.traveledLocations.map((location, index) => (
            <div key={index} className="list-item">
              <span>{location}</span>
              <button
                type="button"
                onClick={() => handleRemoveItem('traveledLocations', index)}
                className="remove-btn"
              >
                <FaTimes />
              </button>
            </div>
          ))}
          <div className="add-item">
            <input
              type="text"
              value={formData.newLocation}
              onChange={(e) => handleInputChange('newLocation', e.target.value)}
              placeholder="Add a location you've visited"
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem('traveledLocations')}
            />
            <button
              type="button"
              onClick={() => handleAddItem('traveledLocations')}
              className="add-btn"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Wishlist */}
      <div className="form-group">
        <label>
          <FaHeart />
          Travel Wishlist
        </label>
        <div className="list-container">
          {formData.wishlist.map((item, index) => (
            <div key={index} className="list-item">
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveItem('wishlist', index)}
                className="remove-btn"
              >
                <FaTimes />
              </button>
            </div>
          ))}
          <div className="add-item">
            <input
              type="text"
              value={formData.newWishlist}
              onChange={(e) => handleInputChange('newWishlist', e.target.value)}
              placeholder="Add a destination to your wishlist"
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem('wishlist')}
            />
            <button
              type="button"
              onClick={() => handleAddItem('wishlist')}
              className="add-btn"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="form-group">
        <label>
          <FaPlane />
          Activities & Interests
        </label>
        <div className="activities-grid">
          {activityCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="activity-category">
              <h4>{category.icon} {category.category}</h4>
              <div className="activity-options">
                {category.activities.map((activity, activityIndex) => (
                  <label key={activityIndex} className="activity-option">
                    <input
                      type="checkbox"
                      checked={formData.activities.includes(activity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleInputChange('activities', [...formData.activities, activity]);
                        } else {
                          handleInputChange('activities', formData.activities.filter(a => a !== activity));
                        }
                      }}
                    />
                    <span>{activity}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="add-item">
          <input
            type="text"
            value={formData.newActivity}
            onChange={(e) => handleInputChange('newActivity', e.target.value)}
            placeholder="Add custom activity"
            onKeyPress={(e) => e.key === 'Enter' && handleAddItem('activities')}
          />
          <button
            type="button"
            onClick={() => handleAddItem('activities')}
            className="add-btn"
          >
            Add Custom
          </button>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="edit-profile-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="edit-profile-modal"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>
              <FaEdit />
              Edit Profile
            </h2>
            <button className="close-btn" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className="modal-tabs">
            <button
              className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <FaUser />
              Personal Info
            </button>
            <button
              className={`tab-btn ${activeTab === 'travel' ? 'active' : ''}`}
              onClick={() => setActiveTab('travel')}
            >
              <FaPlane />
              Travel Info
            </button>
          </div>

          <form onSubmit={handleSubmit} className="edit-profile-form">
            <div className="form-content">
              {activeTab === 'personal' ? renderPersonalInfo() : renderTravelInfo()}
            </div>

            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                <FaSave />
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditProfile;
