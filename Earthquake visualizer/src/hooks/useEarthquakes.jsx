// src/hooks/useEarthquakes.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const EarthquakeContext = createContext();

export const useEarthquakes = () => {
  const context = useContext(EarthquakeContext);
  if (!context) {
    throw new Error('useEarthquakes must be used within an EarthquakeProvider');
  }
  return context;
};

export const EarthquakeProvider = ({ children }) => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchEarthquakes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch earthquake data');
      }
      
      const data = await response.json();
      setEarthquakes(data.features);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Error fetching earthquake data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchEarthquakes();
  };

  useEffect(() => {
    fetchEarthquakes();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchEarthquakes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const value = {
    earthquakes,
    loading,
    error,
    lastUpdated,
    refreshData,
    stats: {
      total: earthquakes.length,
      significant: earthquakes.filter(q => q.properties.mag >= 4.5).length,
      maxMagnitude: Math.max(...earthquakes.map(q => q.properties.mag), 0),
      latestEarthquake: earthquakes[0] || null
    }
  };

  return (
    <EarthquakeContext.Provider value={value}>
      {children}
    </EarthquakeContext.Provider>
  );
};