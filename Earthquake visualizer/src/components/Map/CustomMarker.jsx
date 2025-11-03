// src/components/Map/CustomMarker.jsx
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const getMarkerColor = (magnitude) => {
  if (magnitude < 2.5) return '#4CAF50';
  if (magnitude < 4.5) return '#FFC107';
  if (magnitude < 6.0) return '#FF9800';
  return '#F44336';
};

const createCustomIcon = (magnitude) => {
  const size = Math.max(20, magnitude * 8);
  const color = getMarkerColor(magnitude);
  
  return L.divIcon({
    className: 'custom-earthquake-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: ${Math.max(10, size / 3)}px;
      ">
        ${magnitude.toFixed(1)}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const CustomMarker = ({ earthquake }) => {
  const { geometry, properties } = earthquake;
  const [longitude, latitude, depth] = geometry.coordinates;
  const { mag, place, time } = properties;

  return (
    <Marker
      position={[latitude, longitude]}
      icon={createCustomIcon(mag)}
    >
      <Popup>
        <div className="earthquake-popup">
          <h3>Earthquake Details</h3>
          <p><strong>Location:</strong> {place}</p>
          <p><strong>Magnitude:</strong> {mag}</p>
          <p><strong>Depth:</strong> {depth.toFixed(1)} km</p>
          <p><strong>Time:</strong> {new Date(time).toLocaleString()}</p>
          <p><strong>Status:</strong> {properties.status}</p>
          <p><strong>Type:</strong> {properties.type}</p>
          {properties.tsunami === 1 && (
            <p className="tsunami-warning">🌊 Tsunami Warning</p>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;