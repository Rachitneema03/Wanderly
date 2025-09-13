import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCompass, FaPlane, FaCamera, FaUtensils, FaHotel } from 'react-icons/fa';
import './LandingPage.css';

// Background images - using local assets with fallback URLs
const backgroundImages = [
  // Local asset paths (will be used if images exist in public folder)
  '/assets/images/taj-mahal.jpg',
  '/assets/images/agra-fort.jpg', 
  '/assets/images/red-fort-delhi.jpg',
  '/assets/images/golden-temple.jpg',
  '/assets/images/jaipur-palace.jpg',
  '/assets/images/varanasi-ghats.jpg',
  '/assets/images/goa-beach.jpg',
  '/assets/images/kerala-backwaters.jpg'
];

// Fallback URLs (will be used if local images don't exist)
const fallbackImages = [
  'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Taj Mahal
  'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Agra Fort
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Red Fort Delhi
  'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Golden Temple
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Jaipur Palace
  'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Varanasi Ghats
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Goa Beach
  'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'  // Kerala Backwaters
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  
  // Function to get image with fallback
  const getImageWithFallback = (index) => {
    return backgroundImages[index] || fallbackImages[index];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: <FaMapMarkerAlt />, title: 'Location Detection', desc: 'Automatically detect your location in India' },
    { icon: <FaCompass />, title: 'Smart Itinerary', desc: 'AI-powered Indian destination suggestions' },
    { icon: <FaPlane />, title: 'Travel Planning', desc: 'Complete travel arrangements across India' },
    { icon: <FaCamera />, title: 'Photo Spots', desc: 'Discover iconic Indian landmarks and monuments' },
    { icon: <FaUtensils />, title: 'Local Cuisine', desc: 'Find authentic Indian restaurants and street food' },
    { icon: <FaHotel />, title: 'Accommodation', desc: 'Book heritage hotels and modern stays' }
  ];

  return (
    <div className="landing-page">
      {/* Background Images with Parallax Effect */}
      <div className="background-container">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={index}
            className={`background-image ${index === currentImage ? 'active' : ''}`}
            style={{ backgroundImage: `url(${getImageWithFallback(index)})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImage ? 1 : 0 }}
            transition={{ duration: 1.5 }}
          />
        ))}
        <div className="overlay"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="nav-container">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCompass className="logo-icon" />
            <span>Wanderly</span>
          </motion.div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <motion.button 
              className="auth-btn"
              onClick={() => navigate('/auth')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Discover Your Next
            <span className="highlight"> Adventure</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            Let Wanderly create the perfect itinerary based on your location. 
            Discover India's incredible destinations with AI-powered travel suggestions.
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <motion.button 
              className="cta-primary"
              onClick={() => navigate('/auth')}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </motion.button>
            <motion.button 
              className="cta-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="floating-elements">
          <motion.div 
            className="floating-icon plane"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaPlane />
          </motion.div>
          <motion.div 
            className="floating-icon camera"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <FaCamera />
          </motion.div>
          <motion.div 
            className="floating-icon map"
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <FaMapMarkerAlt />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Why Choose Wanderly?
          </motion.h2>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Explore?</h2>
            <p>Join thousands of travelers who trust Wanderly for their adventures</p>
            <motion.button 
              className="cta-primary large"
              onClick={() => navigate('/auth')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <FaCompass className="logo-icon" />
                <span>Wanderly</span>
              </div>
              <p>Your gateway to unforgettable adventures around the world.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#support">Contact Support</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="#facebook">Facebook</a>
                <a href="#twitter">Twitter</a>
                <a href="#instagram">Instagram</a>
                <a href="#linkedin">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Wanderly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
