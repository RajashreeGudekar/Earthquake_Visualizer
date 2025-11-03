// // components/Layout/Navbar.jsx
// import { Link, useLocation } from 'react-router-dom';
// import { useEarthquakes } from '../../hooks/useEarthquakes';
// import { useState } from 'react';
// import './Navbar.css';

// const Navbar = () => {
//   const location = useLocation();
//   const { stats, lastUpdated, loading, error, refreshData } = useEarthquakes();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const isActive = (path) => location.pathname === path;

//   const handleRefresh = () => {
//     if (!loading) {
//       refreshData();
//     }
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setMobileMenuOpen(false);
//   };

//   const formatTime = (date) => {
//     if (!date) return '--:--';
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
//           <span className="brand-icon">🌍</span>
//           <span className="brand-text">Earthquake Visualizer</span>
//         </Link>
        
//         {/* Desktop Stats */}
//         <div className="navbar-stats">
//           <div className="stat-item">
//             <strong>{stats.total}</strong>
//             <span>Total</span>
//           </div>
//           <div className="stat-item">
//             <strong>{stats.significant}</strong>
//             <span>Significant</span>
//           </div>
//           <div className="stat-item">
//             <strong>{stats.maxMagnitude.toFixed(1)}</strong>
//             <span>Max Mag</span>
//           </div>
//           <div className="last-updated">
//             {formatTime(lastUpdated)}
//           </div>
//           <button 
//             className={`refresh-btn ${loading ? 'loading' : ''}`}
//             onClick={handleRefresh}
//             disabled={loading}
//             title="Refresh data"
//           >
//             🔄
//           </button>
//         </div>

//         {/* Desktop Navigation */}
//         <ul className={`navbar-nav ${mobileMenuOpen ? 'active' : ''}`}>
//           <li className="nav-item">
//             <Link 
//               to="/" 
//               className={`nav-link ${isActive('/') ? 'active' : ''}`}
//               onClick={closeMobileMenu}
//             >
//               🏠 Home
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link 
//               to="/map" 
//               className={`nav-link ${isActive('/map') ? 'active' : ''}`}
//               onClick={closeMobileMenu}
//             >
//               🗺️ Map View
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link 
//               to="/statistics" 
//               className={`nav-link ${isActive('/statistics') ? 'active' : ''}`}
//               onClick={closeMobileMenu}
//             >
//               📊 Statistics
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link 
//               to="/about" 
//               className={`nav-link ${isActive('/about') ? 'active' : ''}`}
//               onClick={closeMobileMenu}
//             >
//               ℹ️ About
//             </Link>
//           </li>
         
// <li className="nav-item">
//   <Link 
//     to="/list" 
//     className={`nav-link ${isActive('/list') ? 'active' : ''}`}
//   >
//     📋 Earthquake List
//   </Link>
// </li>
//         </ul>

//         {/* Mobile Menu Button */}
//         <button 
//           className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
//           onClick={toggleMobileMenu}
//           aria-label="Toggle menu"
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </button>

//         {/* Loading/Error States */}
//         {loading && (
//           <div className="navbar-loading">
//             <span>Updating</span>
//             <div className="loading-dots">
//               <span></span>
//               <span></span>
//               <span></span>
//             </div>
//           </div>
//         )}
        
//         {error && (
//           <div className="navbar-error">
//             ⚠️ Update failed
//           </div>
//         )}
//       </div>
//     </nav>


    
//   );
// };

// export default Navbar;


// components/Layout/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useEarthquakes } from '../../hooks/useEarthquakes';
import { useState } from 'react';
import '../Layout/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { stats, lastUpdated, loading, refreshData } = useEarthquakes();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleRefresh = () => {
    if (!loading) {
      refreshData();
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const formatTime = (date) => {
    if (!date) return '--:--';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <span className="brand-icon">🌍</span>
          <span className="brand-text">Earthquake Visualizer</span>
        </Link>
        
        {/* Desktop Stats */}
        <div className="navbar-stats">
          <div className="stat-item">
            <strong>{stats.total}</strong>
            <span>Total</span>
          </div>
          <div className="stat-item">
            <strong>{stats.significant}</strong>
            <span>Significant</span>
          </div>
          <div className="stat-item">
            <strong>{stats.maxMagnitude.toFixed(1)}</strong>
            <span>Max Mag</span>
          </div>
          <div className="last-updated">
            {formatTime(lastUpdated)}
          </div>
          <button 
            className={`refresh-btn ${loading ? 'loading' : ''}`}
            onClick={handleRefresh}
            disabled={loading}
            title="Refresh data"
          >
            🔄
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className={`navbar-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              🏠 Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/map" 
              className={`nav-link ${isActive('/map') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              🗺️ Map
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/list" 
              className={`nav-link ${isActive('/list') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              📋 List
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/statistics" 
              className={`nav-link ${isActive('/statistics') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              📊 Stats
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              ℹ️ About
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;