import React from 'react';
import { EmotionType } from '../types';

interface MemoryBloomProps {
  emotion: EmotionType;
  intensity: number;
  size?: number;
  animate?: boolean;
}

const MemoryBloom: React.FC<MemoryBloomProps> = ({ 
  emotion, 
  intensity, 
  size = 120, 
  animate = true 
}) => {
  const getBloomColors = (emotion: EmotionType) => {
    switch (emotion) {
      case 'calm':
        return ['#e4dcff', '#d1c1ff', '#b896ff'];
      case 'happy':
        return ['#fed7aa', '#fdba74', '#fb923c'];
      case 'sad':
        return ['#a7c3e8', '#7bb3f0', '#4a90e2'];
      case 'angry':
        return ['#fecdd3', '#fda4af', '#fb7185'];
      case 'excited':
        return ['#fed7aa', '#fde047', '#facc15'];
      case 'peaceful':
        return ['#ccfbf1', '#99f6e4', '#5eead4'];
      default:
        return ['#e4dcff', '#d1c1ff', '#b896ff'];
    }
  };

  const getAnimationClass = (emotion: EmotionType) => {
    if (!animate) return '';
    return `animate-bloom-${emotion}`;
  };

  const colors = getBloomColors(emotion);
  const animationClass = getAnimationClass(emotion);

  const renderBloom = () => {
    switch (emotion) {
      case 'calm':
        return (
          <svg width={size} height={size} viewBox="0 0 120 120" className={animationClass}>
            <defs>
              <radialGradient id={`calm-gradient-${size}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={colors[0]} />
                <stop offset="50%" stopColor={colors[1]} />
                <stop offset="100%" stopColor={colors[2]} />
              </radialGradient>
            </defs>
            <circle cx="60" cy="60" r={30 + intensity * 10} fill={`url(#calm-gradient-${size})`} opacity="0.8" />
            <circle cx="60" cy="60" r={20 + intensity * 5} fill={colors[1]} opacity="0.6" />
            <circle cx="60" cy="60" r={10 + intensity * 2} fill={colors[0]} opacity="0.9" />
          </svg>
        );

      case 'happy':
        return (
          <svg width={size} height={size} viewBox="0 0 120 120" className={animationClass}>
            <defs>
              <radialGradient id={`happy-gradient-${size}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={colors[0]} />
                <stop offset="100%" stopColor={colors[2]} />
              </radialGradient>
            </defs>
            {[...Array(8)].map((_, i) => (
              <path
                key={i}
                d={`M60,60 L${60 + Math.cos(i * Math.PI / 4) * (25 + intensity * 5)},${60 + Math.sin(i * Math.PI / 4) * (25 + intensity * 5)} L${60 + Math.cos((i + 0.5) * Math.PI / 4) * 15},${60 + Math.sin((i + 0.5) * Math.PI / 4) * 15} Z`}
                fill={`url(#happy-gradient-${size})`}
                opacity="0.7"
              />
            ))}
            <circle cx="60" cy="60" r={15} fill={colors[0]} />
          </svg>
        );

      case 'sad':
        return (
          <svg width={size} height={size} viewBox="0 0 120 120" className={animationClass}>
            <defs>
              <linearGradient id={`sad-gradient-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colors[0]} />
                <stop offset="100%" stopColor={colors[2]} />
              </linearGradient>
            </defs>
            <ellipse cx="60" cy="70" rx={20 + intensity * 5} ry={35 + intensity * 10} fill={`url(#sad-gradient-${size})`} opacity="0.8" />
            <ellipse cx="60" cy="65" rx={15} ry={25} fill={colors[1]} opacity="0.6" />
            <ellipse cx="60" cy="60" rx={10} ry={15} fill={colors[0]} opacity="0.9" />
          </svg>
        );

      case 'angry':
        return (
          <svg width={size} height={size} viewBox="0 0 120 120" className={animationClass}>
            <defs>
              <radialGradient id={`angry-gradient-${size}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={colors[0]} />
                <stop offset="100%" stopColor={colors[2]} />
              </radialGradient>
            </defs>
            {[...Array(12)].map((_, i) => (
              <polygon
                key={i}
                points={`60,60 ${60 + Math.cos(i * Math.PI / 6) * (20 + intensity * 8)},${60 + Math.sin(i * Math.PI / 6) * (20 + intensity * 8)} ${60 + Math.cos((i + 1) * Math.PI / 6) * (20 + intensity * 8)},${60 + Math.sin((i + 1) * Math.PI / 6) * (20 + intensity * 8)}`}
                fill={`url(#angry-gradient-${size})`}
                opacity="0.7"
              />
            ))}
            <circle cx="60" cy="60" r={10} fill={colors[2]} />
          </svg>
        );

      case 'excited':
        return (
          <svg width={size} height={size} viewBox="0 0 120 120" className={animationClass}>
            <defs>
              <radialGradient id={`excited-gradient-${size}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={colors[0]} />
                <stop offset="100%" stopColor={colors[2]} />
              </radialGradient>
            </defs>
            {[...Array(16)].map((_, i) => (
              <circle
                key={i}
                cx={60 + Math.cos(i * Math.PI / 8) * (15 + intensity * 5 + Math.sin(i) * 5)}
                cy={60 + Math.sin(i * Math.PI / 8) * (15 + intensity * 5 + Math.cos(i) * 5)}
                r={3 + intensity}
                fill={colors[i % 3]}
                opacity="0.8"
              />
            ))}
            <circle cx="60" cy="60" r={8} fill={`url(#excited-gradient-${size})`} />
          </svg>
        );

      case 'peaceful':
        return (
          <svg width={size} height={size} viewBox="0 0 120 120" className={animationClass}>
            <defs>
              <radialGradient id={`peaceful-gradient-${size}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={colors[0]} />
                <stop offset="100%" stopColor={colors[2]} />
              </radialGradient>
            </defs>
            {[...Array(6)].map((_, i) => (
              <path
                key={i}
                d={`M60,60 Q${60 + Math.cos(i * Math.PI / 3) * (20 + intensity * 5)},${60 + Math.sin(i * Math.PI / 3) * (20 + intensity * 5)} ${60 + Math.cos((i + 1) * Math.PI / 3) * (20 + intensity * 5)},${60 + Math.sin((i + 1) * Math.PI / 3) * (20 + intensity * 5)}`}
                fill="none"
                stroke={`url(#peaceful-gradient-${size})`}
                strokeWidth="3"
                opacity="0.7"
              />
            ))}
            <circle cx="60" cy="60" r={10} fill={colors[0]} opacity="0.9" />
          </svg>
        );

      default:
        return (
          <svg width={size} height={size} viewBox="0 0 120 120">
            <circle cx="60" cy="60" r={30} fill={colors[0]} opacity="0.8" />
          </svg>
        );
    }
  };

  return (
    <div className="flex items-center justify-center">
      {renderBloom()}
    </div>
  );
};

export default MemoryBloom;