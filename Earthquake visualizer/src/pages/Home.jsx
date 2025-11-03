// pages/Home.jsx
import { Link } from 'react-router-dom';
import { useEarthquakes } from '../hooks/useEarthquakes';
import EarthquakeMap from '../components/Map/EarthquakeMap';
import './Home.css';

const Home = () => {
  const { stats, loading, refreshData, lastUpdated } = useEarthquakes();

  const StatCard = ({ title, value, subtitle, icon }) => (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
        {subtitle && <small>{subtitle}</small>}
      </div>
    </div>
  );

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Global Earthquake Monitor</h1>
          <p>Real-time visualization of seismic activity around the world</p>
          <div className="hero-actions">
            <Link to="/map" className="btn btn-primary">
              Explore Map
            </Link>
            <button 
              onClick={refreshData} 
              className="btn btn-secondary"
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          <StatCard
            title="Total Earthquakes"
            value={stats.total}
            icon="🌍"
            subtitle="Last 24 hours"
          />
          <StatCard
            title="Significant Events"
            value={stats.significant}
            icon="⚠️"
            subtitle="Magnitude ≥ 4.5"
          />
          <StatCard
            title="Maximum Magnitude"
            value={stats.maxMagnitude.toFixed(1)}
            icon="📊"
            subtitle="Strongest quake"
          />
          <StatCard
            title="Last Updated"
            value={lastUpdated ? lastUpdated.toLocaleTimeString() : '--:--'}
            icon="🕒"
            subtitle="Auto-refresh every 5 min"
          />
        </div>
      </section>

      <section className="map-preview-section">
        <h2>Live Earthquake Map</h2>
        <div className="map-preview">
          <EarthquakeMap className="preview-map" />
        </div>
        <div className="section-actions">
          <Link to="/map" className="btn btn-primary">
            View Full Map
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Real-time Data</h3>
            <p>Live earthquake data from USGS updated every 5 minutes</p>
          </div>
          <div className="feature-card">
            <h3>Interactive Map</h3>
            <p>Explore earthquakes with detailed information and filtering</p>
          </div>
          <div className="feature-card">
            <h3>Statistical Analysis</h3>
            <p>View trends and patterns in seismic activity</p>
          </div>
          <div className="feature-card">
            <h3>Mobile Friendly</h3>
            <p>Responsive design that works on all devices</p>
          </div>
        </div>
      </section>
    </div>


     
  );
};

export default Home;