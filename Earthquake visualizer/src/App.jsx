// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import MapView from './pages/MapView';
import Statistics from './pages/Statistics';
import About from './pages/About';
import { EarthquakeProvider } from './hooks/useEarthquakes';
import './App.css';
import EarthquakeList from './components/List/List';

function App() {
  return (
    <EarthquakeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/about" element={<About />} />
             
<Route path="/list" element={<EarthquakeList/>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </EarthquakeProvider>
  );
}

export default App;