import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import './AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // For demo purposes, navigate to dashboard
    navigate('/dashboard');
  };

  const handleGoogleAuth = () => {
    // Handle Google authentication here
    console.log('Google authentication');
    // For demo purposes, navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">

      {/* Auth Container */}
      <div className="auth-container">
        <motion.div 
          className="glassmorphism-container"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div 
            className="auth-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
          {/* Auth Header */}
          <motion.div 
            className="auth-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1>{isLogin ? 'Welcome Back' : 'Create Your Account'}</h1>
            <p>{isLogin ? 'Please sign in to continue to your dashboard.' : 'Join our community to manage your education.'}</p>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div 
            className="social-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button 
              className="social-btn google-btn"
              onClick={handleGoogleAuth}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaGoogle className="social-icon" />
              {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div 
            className="divider"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span>{isLogin ? 'or continue with' : 'or fill in your details'}</span>
          </motion.div>

          {/* Auth Form */}
          <motion.form 
            className="auth-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {!isLogin && (
              <motion.div 
                className="name-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <div className="form-group">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>


            {isLogin && (
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="forgot-password">Forgot your password?</a>
              </div>
            )}

            <motion.button 
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </motion.button>
          </motion.form>

          {/* Auth Toggle */}
          <motion.div 
            className="auth-toggle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p>
              {isLogin ? "Already have an account?" : "Already have an account?"}
              <button 
                type="button"
                className="toggle-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;