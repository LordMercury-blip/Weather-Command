import React from 'react';
import { WeatherData } from '../types/weather';

interface RadarChartProps {
  data: WeatherData;
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 120;
  
  // Normalize data values to 0-1 range for radar chart
  const radarData = [
    { label: 'Humidity', value: data.humidity / 100, angle: 0 },
    { label: 'Pressure', value: (data.pressure - 950) / 100, angle: 60 },
    { label: 'Wind', value: data.windSpeed / 50, angle: 120 },
    { label: 'UV', value: data.uvIndex / 11, angle: 180 },
    { label: 'Visibility', value: data.visibility / 20, angle: 240 },
    { label: 'Clouds', value: data.cloudCover / 100, angle: 300 }
  ];

  const getPointCoordinates = (angle: number, radius: number) => {
    const radian = (angle - 90) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian)
    };
  };

  // Create radar polygon path
  const radarPath = radarData.map((point, index) => {
    const radius = point.value * maxRadius;
    const coords = getPointCoordinates(point.angle, radius);
    return `${index === 0 ? 'M' : 'L'} ${coords.x} ${coords.y}`;
  }).join(' ') + ' Z';

  return (
    <div className="relative w-full h-80 flex items-center justify-center">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.3)" />
            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.1)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.05)" />
          </radialGradient>
          <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" />
            <stop offset="50%" stopColor="rgba(236, 72, 153, 0.6)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.4)" />
          </linearGradient>
        </defs>
        
        {/* Radar grid circles */}
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, index) => (
          <circle
            key={index}
            cx={centerX}
            cy={centerY}
            r={maxRadius * scale}
            stroke="rgba(168, 85, 247, 0.3)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: `${index * 0.2}s` }}
          />
        ))}
        
        {/* Radar grid lines */}
        {radarData.map((point, index) => {
          const coords = getPointCoordinates(point.angle, maxRadius);
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={coords.x}
              y2={coords.y}
              stroke="rgba(168, 85, 247, 0.3)"
              strokeWidth="1"
              className="animate-pulse"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          );
        })}
        
        {/* Data polygon */}
        <path
          d={radarPath}
          fill="url(#dataGradient)"
          stroke="rgba(168, 85, 247, 0.8)"
          strokeWidth="2"
          className="animate-draw-radar"
        />
        
        {/* Data points */}
        {radarData.map((point, index) => {
          const radius = point.value * maxRadius;
          const coords = getPointCoordinates(point.angle, radius);
          return (
            <g key={index}>
              <circle
                cx={coords.x}
                cy={coords.y}
                r="4"
                fill="rgba(168, 85, 247, 1)"
                className="animate-pulse"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
              <circle
                cx={coords.x}
                cy={coords.y}
                r="8"
                fill="none"
                stroke="rgba(168, 85, 247, 0.5)"
                strokeWidth="1"
                className="animate-ping"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            </g>
          );
        })}
        
        {/* Labels */}
        {radarData.map((point, index) => {
          const labelRadius = maxRadius + 20;
          const coords = getPointCoordinates(point.angle, labelRadius);
          return (
            <text
              key={index}
              x={coords.x}
              y={coords.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(255, 255, 255, 0.8)"
              fontSize="12"
              className="font-medium"
            >
              {point.label}
            </text>
          );
        })}
        
        {/* Center dot */}
        <circle
          cx={centerX}
          cy={centerY}
          r="3"
          fill="rgba(168, 85, 247, 1)"
          className="animate-pulse"
        />
      </svg>
      
      {/* Scanning line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full rounded-full border border-purple-400/20 animate-radar-sweep"></div>
      </div>
    </div>
  );
};

export default RadarChart;