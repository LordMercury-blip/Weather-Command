import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Zap, Moon, CloudDrizzle } from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, size = 'medium', animated = true }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-24 h-24'
  };

  const getIcon = () => {
    switch (condition) {
      case 'sunny':
      case 'clear':
        return <Sun className={`${sizeClasses[size]} text-yellow-400 ${animated ? 'animate-spin-slow' : ''}`} />;
      case 'partly-cloudy':
        return <Cloud className={`${sizeClasses[size]} text-blue-300 ${animated ? 'animate-float' : ''}`} />;
      case 'cloudy':
        return <Cloud className={`${sizeClasses[size]} text-gray-400 ${animated ? 'animate-float' : ''}`} />;
      case 'rainy':
        return <CloudRain className={`${sizeClasses[size]} text-blue-400 ${animated ? 'animate-bounce' : ''}`} />;
      case 'drizzle':
        return <CloudDrizzle className={`${sizeClasses[size]} text-blue-300 ${animated ? 'animate-pulse' : ''}`} />;
      case 'snowy':
        return <CloudSnow className={`${sizeClasses[size]} text-blue-200 ${animated ? 'animate-pulse' : ''}`} />;
      case 'thunderstorm':
        return <Zap className={`${sizeClasses[size]} text-yellow-300 ${animated ? 'animate-pulse' : ''}`} />;
      case 'night':
        return <Moon className={`${sizeClasses[size]} text-blue-200 ${animated ? 'animate-pulse' : ''}`} />;
      default:
        return <Sun className={`${sizeClasses[size]} text-yellow-400 ${animated ? 'animate-spin-slow' : ''}`} />;
    }
  };

  return (
    <div className={`relative ${animated ? 'group' : ''}`}>
      {getIcon()}
      {animated && size === 'large' && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
      )}
    </div>
  );
};

export default WeatherIcon;