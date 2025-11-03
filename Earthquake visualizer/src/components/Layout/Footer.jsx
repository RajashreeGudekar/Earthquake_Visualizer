// components/Layout/Footer.jsx
import { Link } from 'react-router-dom';
import { useEarthquakes } from '../../hooks/useEarthquakes';
import '../Layout/Footer.css';

const Footer = () => {
  const { lastUpdated, stats } = useEarthquakes();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-section">
            <h3>Earthquake Visualizer</h3>
            <p>
              A comprehensive tool for visualizing and understanding global 
              seismic activity in real-time. Perfect for students, researchers, 
              and earthquake enthusiasts.
            </p>
            <div className="footer-stats">
              <div className="footer-stat">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-label">Earthquakes</span>
              </div>
              <div className="footer-stat">
                <span className="stat-value">{stats.significant}</span>
                <span className="stat-label">Significant</span>
              </div>
              <div className="footer-stat">
                <span className="stat-value">{stats.maxMagnitude.toFixed(1)}</span>
                <span className="stat-label">Max Magnitude</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/map" className="footer-link">Interactive Map</Link></li>
              <li><Link to="/statistics" className="footer-link">Statistics</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li>
                <a 
                  href="https://earthquake.usgs.gov/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  USGS Earthquake Hazards
                </a>
              </li>
              <li>
                <a 
                  href="https://www.ready.gov/earthquakes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Earthquake Safety Tips
                </a>
              </li>
              <li>
                <a 
                  href="https://www.usgs.gov/natural-hazards/earthquake-hazards/science" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Earthquake Science
                </a>
              </li>
              <li>
                <a 
                  href="https://earthquake.usgs.gov/data/comcat/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  USGS API Documentation
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a 
                href="https://twitter.com/USGS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Twitter"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Data Status Bar */}
        <div className="data-status">
          <div className="status-info">
            <span className="status-label">Data Last Updated:</span>
            <span className="status-value">
              {lastUpdated ? lastUpdated.toLocaleString() : 'Loading...'}
            </span>
          </div>
          <div className="status-source">
            <span className="source-label">Data Source:</span>
            <a 
              href="https://earthquake.usgs.gov/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="source-link"
            >
              USGS Earthquake Hazards Program
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Earthquake Visualizer. Educational tool for seismic awareness.</p>
          </div>
          <div className="footer-legal">
            <Link to="/privacy" className="legal-link">Privacy Policy</Link>
            <Link to="/terms" className="legal-link">Terms of Use</Link>
            <a 
              href="mailto:contact@earthquakevisualizer.com" 
              className="legal-link"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;