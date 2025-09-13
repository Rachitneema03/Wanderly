// Location Service for Wanderly
export class LocationService {
  constructor() {
    this.currentLocation = null;
    this.watchId = null;
  }

  // Get current user location
  async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          };
          
          this.currentLocation = location;
          resolve(location);
        },
        (error) => {
          let errorMessage = 'Unable to retrieve your location.';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
            default:
              errorMessage = 'An unknown error occurred while retrieving location.';
              break;
          }
          
          reject(new Error(errorMessage));
        },
        options
      );
    });
  }

  // Watch location changes
  watchLocation(callback) {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported by this browser.');
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000
    };

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        };
        
        this.currentLocation = location;
        callback(location);
      },
      (error) => {
        console.error('Location watch error:', error);
        callback(null, error);
      },
      options
    );

    return this.watchId;
  }

  // Stop watching location
  stopWatchingLocation() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  // Get location name from coordinates (reverse geocoding)
  async getLocationName(latitude, longitude) {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location name');
      }
      
      const data = await response.json();
      return {
        city: data.city || data.locality,
        country: data.countryName,
        region: data.principalSubdivision,
        fullName: `${data.city || data.locality}, ${data.countryName}`
      };
    } catch (error) {
      console.error('Error getting location name:', error);
      return {
        city: 'Unknown',
        country: 'Unknown',
        region: 'Unknown',
        fullName: 'Unknown Location'
      };
    }
  }

  // Calculate distance between two coordinates (in kilometers)
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  }

  // Convert degrees to radians
  deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  // Check if location services are available
  isLocationAvailable() {
    return 'geolocation' in navigator;
  }

  // Request location permission
  async requestLocationPermission() {
    if (!this.isLocationAvailable()) {
      throw new Error('Geolocation is not supported by this browser.');
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      return permission.state === 'granted';
    } catch (error) {
      // Fallback: try to get location and see if it works
      try {
        await this.getCurrentLocation();
        return true;
      } catch (error) {
        return false;
      }
    }
  }

  // Get cached location if available
  getCachedLocation() {
    return this.currentLocation;
  }

  // Clear cached location
  clearCachedLocation() {
    this.currentLocation = null;
  }
}

// Create a singleton instance
export const locationService = new LocationService();

// Note: React hooks should be defined in React components, not in service files
// If you need location hooks, create them in your React components using this service
