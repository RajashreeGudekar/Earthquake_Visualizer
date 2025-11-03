// src/components/EarthquakeList/EarthquakeList.jsx
import { useState, useMemo } from 'react';
import { useEarthquakes } from '../../hooks/useEarthquakes';
import '../List/List.css';

const EarthquakeList = () => {
  const { earthquakes, loading, error } = useEarthquakes();
  const [sortBy, setSortBy] = useState('time');
  const [sortOrder, setSortOrder] = useState('desc');
  const [minMagnitude, setMinMagnitude] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort earthquakes
  const filteredAndSortedEarthquakes = useMemo(() => {
    let filtered = earthquakes.filter(quake => 
      quake.properties.mag >= minMagnitude &&
      quake.properties.place.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the earthquakes
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'magnitude':
          aValue = a.properties.mag;
          bValue = b.properties.mag;
          break;
        case 'depth':
          aValue = a.geometry.coordinates[2];
          bValue = b.geometry.coordinates[2];
          break;
        case 'time':
        default:
          aValue = a.properties.time;
          bValue = b.properties.time;
          break;
      }

      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return filtered;
  }, [earthquakes, sortBy, sortOrder, minMagnitude, searchTerm]);

  const getMagnitudeColor = (magnitude) => {
    if (magnitude < 2.5) return '#4CAF50';
    if (magnitude < 4.5) return '#FFC107';
    if (magnitude < 6.0) return '#FF9800';
    return '#F44336';
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatDepth = (depth) => {
    return `${depth.toFixed(1)} km`;
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  if (loading) {
    return (
      <div className="earthquake-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading earthquake data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="earthquake-list-error">
        <p>Error loading earthquakes: {error}</p>
      </div>
    );
  }

  return (
    <div className="earthquake-list">
      {/* Header with controls */}
      <div className="earthquake-list-header">
        <h2>Earthquake List</h2>
        <div className="earthquake-list-controls">
          <div className="control-group">
            <label htmlFor="search">Search Location:</label>
            <input
              id="search"
              type="text"
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="control-group">
            <label htmlFor="minMagnitude">Min Magnitude:</label>
            <select
              id="minMagnitude"
              value={minMagnitude}
              onChange={(e) => setMinMagnitude(parseFloat(e.target.value))}
              className="magnitude-select"
            >
              <option value={0}>All</option>
              <option value={2.5}>2.5+</option>
              <option value={4.5}>4.5+</option>
              <option value={6.0}>6.0+</option>
            </select>
          </div>

          <div className="control-group">
            <span>Sort by:</span>
            <div className="sort-buttons">
              <button
                onClick={() => handleSort('time')}
                className={`sort-btn ${sortBy === 'time' ? 'active' : ''}`}
              >
                Time {sortBy === 'time' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => handleSort('magnitude')}
                className={`sort-btn ${sortBy === 'magnitude' ? 'active' : ''}`}
              >
                Magnitude {sortBy === 'magnitude' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => handleSort('depth')}
                className={`sort-btn ${sortBy === 'depth' ? 'active' : ''}`}
              >
                Depth {sortBy === 'depth' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>
        
        <div className="earthquake-list-stats">
          Showing {filteredAndSortedEarthquakes.length} of {earthquakes.length} earthquakes
        </div>
      </div>

      {/* Earthquake List */}
      <div className="earthquake-list-container">
        {filteredAndSortedEarthquakes.length === 0 ? (
          <div className="no-earthquakes">
            No earthquakes found matching your criteria.
          </div>
        ) : (
          <div className="earthquake-items">
            {filteredAndSortedEarthquakes.map((earthquake) => (
              <div key={earthquake.id} className="earthquake-item">
                <div className="earthquake-magnitude">
                  <div 
                    className="magnitude-circle"
                    style={{ backgroundColor: getMagnitudeColor(earthquake.properties.mag) }}
                  >
                    {earthquake.properties.mag.toFixed(1)}
                  </div>
                </div>
                
                <div className="earthquake-details">
                  <div className="earthquake-location">
                    <h3>{earthquake.properties.place}</h3>
                    <span className="earthquake-time">
                      {formatTime(earthquake.properties.time)}
                    </span>
                  </div>
                  
                  <div className="earthquake-meta">
                    <div className="meta-item">
                      <span className="meta-label">Depth:</span>
                      <span className="meta-value">
                        {formatDepth(earthquake.geometry.coordinates[2])}
                      </span>
                    </div>
                    
                    <div className="meta-item">
                      <span className="meta-label">Type:</span>
                      <span className="meta-value">{earthquake.properties.type}</span>
                    </div>
                    
                    <div className="meta-item">
                      <span className="meta-label">Status:</span>
                      <span className={`status ${earthquake.properties.status}`}>
                        {earthquake.properties.status}
                      </span>
                    </div>

                    {earthquake.properties.tsunami === 1 && (
                      <div className="tsunami-alert">
                        🌊 Tsunami Warning
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="earthquake-actions">
                 
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EarthquakeList;