import { EmotionType, BloomPattern } from '../types';

export function generateBloomPattern(emotion: EmotionType, audioDuration: number): BloomPattern {
  // Calculate intensity based on duration (longer recordings = higher intensity)
  const intensity = Math.min(Math.max(audioDuration / 30, 0.3), 1.0);
  
  const colorMaps = {
    calm: ['#e4dcff', '#d1c1ff', '#b896ff'],
    happy: ['#fed7aa', '#fdba74', '#fb923c'],
    sad: ['#a7c3e8', '#7bb3f0', '#4a90e2'],
    angry: ['#fecdd3', '#fda4af', '#fb7185'],
    excited: ['#fed7aa', '#fde047', '#facc15'],
    peaceful: ['#ccfbf1', '#99f6e4', '#5eead4'],
  };

  return {
    type: emotion,
    intensity,
    colors: colorMaps[emotion],
    size: 80 + (intensity * 40), // Size varies from 80 to 120
  };
}

export function exportBloomAsSVG(pattern: BloomPattern): string {
  const { type, intensity, colors, size } = pattern;
  
  // This is a simplified SVG export - in a real app you'd want to recreate the exact bloom
  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bloom-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${colors[0]}" />
          <stop offset="50%" stop-color="${colors[1]}" />
          <stop offset="100%" stop-color="${colors[2]}" />
        </radialGradient>
      </defs>
      <circle cx="${size/2}" cy="${size/2}" r="${(size/2) * intensity}" fill="url(#bloom-gradient)" opacity="0.8" />
      <text x="${size/2}" y="${size + 20}" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#666">
        ${type.charAt(0).toUpperCase() + type.slice(1)} Memory Bloom
      </text>
    </svg>
  `.trim();
}