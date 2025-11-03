// pages/Statistics.jsx
import { useEarthquakes } from '../hooks/useEarthquakes';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import './Statistics.css';

const Statistics = () => {
  const { earthquakes, loading } = useEarthquakes();

  if (loading) {
    return <div className="loading">Loading statistics...</div>;
  }

  // Prepare data for charts
  const magnitudeDistribution = earthquakes.reduce((acc, quake) => {
    const mag = Math.floor(quake.properties.mag);
    const key = `${mag}.0 - ${mag + 0.9}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const depthDistribution = earthquakes.reduce((acc, quake) => {
    const depth = Math.floor(quake.geometry.coordinates[2] / 50) * 50;
    const key = `${depth}-${depth + 49} km`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(magnitudeDistribution).map(([magnitude, count]) => ({
    magnitude,
    count
  }));

  const pieData = Object.entries(depthDistribution).map(([depth, count]) => ({
    name: depth,
    value: count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="statistics-page">
      <header className="page-header">
        <h1>Earthquake Statistics</h1>
        <p>Analysis of seismic activity patterns</p>
      </header>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Magnitude Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="magnitude" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Number of Earthquakes" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Depth Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="stats-summary">
        <h3>Quick Facts</h3>
        <div className="facts-grid">
          <div className="fact-item">
            <span className="fact-label">Total Earthquakes:</span>
            <span className="fact-value">{earthquakes.length}</span>
          </div>
          <div className="fact-item">
            <span className="fact-label">Average Magnitude:</span>
            <span className="fact-value">
              {(earthquakes.reduce((sum, q) => sum + q.properties.mag, 0) / earthquakes.length).toFixed(2)}
            </span>
          </div>
          <div className="fact-item">
            <span className="fact-label">Deepest Earthquake:</span>
            <span className="fact-value">
              {Math.max(...earthquakes.map(q => q.geometry.coordinates[2])).toFixed(1)} km
            </span>
          </div>
          <div className="fact-item">
            <span className="fact-label">Shallowest Earthquake:</span>
            <span className="fact-value">
              {Math.min(...earthquakes.map(q => q.geometry.coordinates[2])).toFixed(1)} km
            </span>
          </div>
        </div>
      </div>
    </div>

     
  );
};

export default Statistics;