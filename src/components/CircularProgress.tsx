import React from 'react';

interface CircularProgressProps {
  value: number;
  max: number;
  min?: number;
  color: string;
  size: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ 
  value, 
  max, 
  min = 0, 
  color, 
  size 
}) => {
  const normalizedValue = ((value - min) / (max - min)) * 100;
  const circumference = 2 * Math.PI * 45; // radius of 45
  const strokeDashoffset = circumference - (normalizedValue / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="8"
          fill="transparent"
        />
        
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out animate-glow-ring"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className={`bg-gradient-to-r ${color}`} stopColor="currentColor" />
            <stop offset="100%" className={`bg-gradient-to-r ${color}`} stopColor="currentColor" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Glowing effect */}
      <div 
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-20 blur-xl animate-pulse`}
        style={{ transform: 'scale(0.8)' }}
      ></div>
    </div>
  );
};

export default CircularProgress;