// src/pages/MapView.jsx
import EarthquakeMap from '../components/Map/EarthquakeMap';
import '../pages/MapView.css'
const MapView = () => {
  return (
    <div className="map-view-page">
      <div className="page-header">
        <h1>Interactive Earthquake Map</h1>
        <p>Explore recent seismic activity around the world</p>
      </div>
      <div className="full-screen-map">
        <EarthquakeMap />
      </div>
    </div>


    

  );
};

export default MapView;