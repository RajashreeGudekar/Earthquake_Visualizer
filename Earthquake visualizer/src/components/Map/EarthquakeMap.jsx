// src/components/Map/EarthquakeMap.jsx
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { useEarthquakes } from '../../hooks/useEarthquakes';
import CustomMarker from './CustomMarker';
import './EarthquakeMap.css';

const EarthquakeMap = ({ className = '' }) => {
  const { earthquakes, loading, error } = useEarthquakes();

  if (loading) {
    return (
      <div className="map-loading">
        <div className="loading-spinner"></div>
        <p>Loading earthquake data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="map-error">
        <p>Error loading map: {error}</p>
      </div>
    );
  }

  return (
    <div className={`earthquake-map ${className}`}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        zoomControl={false}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        
        {earthquakes.map((earthquake) => (
          <CustomMarker 
            key={earthquake.id} 
            earthquake={earthquake} 
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default EarthquakeMap;