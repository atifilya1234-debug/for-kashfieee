
export const REQUIRED_ASSETS = [
  { id: 'glance', filename: 'glance.png', label: 'School Memory' },
  { id: 'hand', filename: 'hand.png', label: 'Hand Holding' },
  { id: 'kiss', filename: 'kisss.png', label: 'Intimate Moment' },
  { id: 'ride', filename: 'ola.png', label: 'Scooty Ride' },
  { id: 'sanctuary', filename: 'intimate.png', label: 'Sanctuary Reveal' }
];

export const getAssetPath = (id: string) => {
  const asset = REQUIRED_ASSETS.find(a => a.id === id);
  return asset ? `./${asset.filename}` : `./${id}.png`;
};
