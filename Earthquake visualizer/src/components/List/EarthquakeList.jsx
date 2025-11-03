// src/pages/List.jsx
import List from '../components/List/List';
import '../List/EarthQuakeList.css';

const EarthquakeList = () => {
  return (
    <div className="list-page">
      <div className="page-header">
        <h1>Earthquake List</h1>
        <p>Browse and filter recent seismic activity</p>
      </div>
      <div className="list-content">
        <EarthquakeList/>
      </div>
    </div>
  );
};

export default List;