import { keyframes } from '@mui/system';

export const TILT_LEVELS = {
  SAFE: 10,
  WARNING: 20,
  GAME_OVER: 30
};

export const PACKAGE_TYPES = {
  SMALL: { value: 1, height: 20, color: '#3498db', icon: '📦', label: 'Local' },
  MEDIUM: { value: 2, height: 40, color: '#2ecc71', icon: '🗃️', label: 'National' },
  LARGE: { value: 3, height: 60, color: '#e74c3c', icon: '🛢️', label: 'International' }
};

export const WEIGHT_INTERVAL = 2000; // ms

export const getTiltColor = (tilt) => {
  const absTilt = Math.abs(tilt);
  if (absTilt < TILT_LEVELS.SAFE) return '#3498db';
  if (absTilt < TILT_LEVELS.WARNING) return '#f39c12';
  return '#e74c3c';
};

export const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

export const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(0) rotate(0deg); }
  25% { transform: translateX(-5px) rotate(-0.5deg); }
  75% { transform: translateX(5px) rotate(0.5deg); }
`;

export const dropAnimation = keyframes`
  0% { transform: translateY(-50px); opacity: 0; }
  60% { transform: translateY(10px); opacity: 1; }
  80% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

export const creakingAnimation = keyframes`
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.98); }
`;