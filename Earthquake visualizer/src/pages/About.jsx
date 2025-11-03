// pages/About.jsx
import '../pages/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <header className="about-header">
          <div className="header-content">
            <h1>About Earthquake Visualizer</h1>
            <p className="header-subtitle">Understanding our planet's seismic activity through real-time data visualization</p>
          </div>
        </header>

        <div className="about-content">
          <section className="about-section">
            <div className="section-header">
              <h2>Project Overview</h2>
              <div className="section-divider"></div>
            </div>
            <p className="section-text">
              The Earthquake Visualizer is an interactive web application designed to provide 
              real-time visualization of global seismic activity. Built for students, researchers, 
              and anyone interested in understanding earthquake patterns and their global distribution.
            </p>
          </section>

          <section className="about-section">
            <div className="section-header">
              <h2>Data Source</h2>
              <div className="section-divider"></div>
            </div>
            <p className="section-text">
              This application uses real-time data from the <strong>United States Geological Survey (USGS)</strong> 
              Earthquake Hazards Program. The data is automatically updated every 5 minutes and includes 
              comprehensive information about seismic events from the past 24 hours.
            </p>
            <div className="data-info-card">
              <h3>📊 Data Features</h3>
              <div className="data-grid">
                <div className="data-item">
                  <span className="data-icon">📍</span>
                  <span>Location & Coordinates</span>
                </div>
                <div className="data-item">
                  <span className="data-icon">📈</span>
                  <span>Magnitude & Depth</span>
                </div>
                <div className="data-item">
                  <span className="data-icon">🕒</span>
                  <span>Timing Information</span>
                </div>
                <div className="data-item">
                  <span className="data-icon">🌊</span>
                  <span>Tsunami Warnings</span>
                </div>
                <div className="data-item">
                  <span className="data-icon">🔍</span>
                  <span>Event Classification</span>
                </div>
                <div className="data-item">
                  <span className="data-icon">📋</span>
                  <span>Detailed Metadata</span>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <div className="section-header">
              <h2>Technology Stack</h2>
              <div className="section-divider"></div>
            </div>
            <div className="tech-stack">
              <div className="tech-category">
                <div className="tech-header">
                  <span className="tech-icon">⚛️</span>
                  <h4>Frontend</h4>
                </div>
                <ul className="tech-list">
                  <li>React 18</li>
                  <li>React Router</li>
                  <li>Leaflet Maps</li>
                  <li>Recharts</li>
                  <li>CSS3</li>
                </ul>
              </div>
              
              <div className="tech-category">
                <div className="tech-header">
                  <span className="tech-icon">🔗</span>
                  <h4>APIs & Services</h4>
                </div>
                <ul className="tech-list">
                  <li>USGS Earthquake API</li>
                  <li>OpenStreetMap Tiles</li>
                  <li>RESTful Architecture</li>
                </ul>
              </div>
              
              <div className="tech-category">
                <div className="tech-header">
                  <span className="tech-icon">✨</span>
                  <h4>Key Features</h4>
                </div>
                <ul className="tech-list">
                  <li>Real-time Data Updates</li>
                  <li>Interactive Map Visualization</li>
                  <li>Statistical Analysis</li>
                  <li>Responsive Design</li>
                  <li>Advanced Filtering</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section">
            <div className="section-header">
              <h2>Educational Value</h2>
              <div className="section-divider"></div>
            </div>
            <p className="section-text">
              This tool is specifically designed to enhance learning and research in earth sciences, 
              providing valuable insights for:
            </p>
            <div className="education-grid">
              <div className="education-card">
                <div className="card-icon">🎓</div>
                <h4>Students</h4>
                <p>Understand seismic patterns and plate tectonics through interactive visualization</p>
              </div>
              <div className="education-card">
                <div className="card-icon">🔬</div>
                <h4>Researchers</h4>
                <p>Analyze earthquake data trends and distribution patterns in real-time</p>
              </div>
              <div className="education-card">
                <div className="card-icon">🌎</div>
                <h4>Educators</h4>
                <p>Demonstrate geological concepts with live data and interactive maps</p>
              </div>
              <div className="education-card">
                <div className="card-icon">👨‍💻</div>
                <h4>Developers</h4>
                <p>Explore data visualization techniques and real-time API integration</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <div className="section-header">
              <h2>Learning Objectives</h2>
              <div className="section-divider"></div>
            </div>
            <div className="objectives-list">
              <div className="objective-item">
                <span className="objective-check">✅</span>
                <span>Understand global seismic patterns and distribution</span>
              </div>
              <div className="objective-item">
                <span className="objective-check">✅</span>
                <span>Study plate tectonics and fault lines through real data</span>
              </div>
              <div className="objective-item">
                <span className="objective-check">✅</span>
                <span>Analyze earthquake magnitude and depth relationships</span>
              </div>
              <div className="objective-item">
                <span className="objective-check">✅</span>
                <span>Visualize temporal patterns in seismic activity</span>
              </div>
              <div className="objective-item">
                <span className="objective-check">✅</span>
                <span>Explore geographic clustering of earthquake events</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;