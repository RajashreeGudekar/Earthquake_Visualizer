// utils/constants.js
export const getMarkerColor = (magnitude) => {
  if (magnitude < 2.5) return '#4CAF50'; // Green
  if (magnitude < 4.5) return '#FFC107'; // Yellow
  if (magnitude < 6.0) return '#FF9800'; // Orange
  return '#F44336'; // Red for significant earthquakes
};

export const EARTHQUAKE_TYPES = {
  earthquake: 'Earthquake',
  quarry: 'Quarry Blast',
  explosion: 'Explosion',
  icequake: 'Ice Quake',
  landslide: 'Landslide'
};