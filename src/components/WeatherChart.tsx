import React from 'react';
import { TrendingUp, Activity, BarChart3 } from 'lucide-react';

interface WeatherChartProps {
  city: string;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ city }) => {
  // Mock data for the past 7 days
  const historicalData = [
    { day: 'Mon', temp: 18, precipitation: 0.2, humidity: 65 },
    { day: 'Tue', temp: 20, precipitation: 0.8, humidity: 70 },
    { day: 'Wed', temp: 22, precipitation: 0.1, humidity: 60 },
    { day: 'Thu', temp: 19, precipitation: 1.2, humidity: 75 },
    { day: 'Fri', temp: 21, precipitation: 0.0, humidity: 58 },
    { day: 'Sat', temp: 24, precipitation: 0.3, humidity: 62 },
    { day: 'Sun', temp: 22, precipitation: 0.0, humidity: 55 }
  ];

  const maxTemp = Math.max(...historicalData.map(d => d.temp));
  const minTemp = Math.min(...historicalData.map(d => d.temp));
  const maxPrecip = Math.max(...historicalData.map(d => d.precipitation));

  return (
    <div className="relative group">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-purple-400/20 to-purple-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Activity className="text-purple-400 w-6 h-6" />
              <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-md animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold text-white">Past Week Analytics</h3>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-purple-300">
            <BarChart3 className="w-4 h-4" />
            <span className="font-mono">{city}</span>
          </div>
        </div>
        
        <div className="relative h-80">
          <svg viewBox="0 0 500 300" className="w-full h-full">
            <defs>
              <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#EC4899" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="tempAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="precipGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[0, 1, 2, 3, 4, 5].map(i => (
              <g key={i}>
                <line
                  x1="60"
                  y1={50 + i * 40}
                  x2="440"
                  y2={50 + i * 40}
                  stroke="rgba(168, 85, 247, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <text
                  x="50"
                  y={55 + i * 40}
                  fill="rgba(255, 255, 255, 0.5)"
                  fontSize="10"
                  textAnchor="end"
                >
                  {25 - i * 5}°
                </text>
              </g>
            ))}
            
            {/* Vertical grid lines */}
            {historicalData.map((_, i) => (
              <line
                key={i}
                x1={60 + i * 55}
                y1="50"
                x2={60 + i * 55}
                y2="250"
                stroke="rgba(168, 85, 247, 0.1)"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            ))}
            
            {/* Temperature area fill */}
            <path
              d={`M 60 ${250 - ((historicalData[0].temp - minTemp) / (maxTemp - minTemp)) * 160} ${historicalData.map((d, i) => 
                `L ${60 + i * 55} ${250 - ((d.temp - minTemp) / (maxTemp - minTemp)) * 160}`
              ).join(' ')} L 445 250 L 60 250 Z`}
              fill="url(#tempAreaGradient)"
              className="animate-draw-area"
            />
            
            {/* Temperature line */}
            <path
              d={`M ${historicalData.map((d, i) => 
                `${60 + i * 55} ${250 - ((d.temp - minTemp) / (maxTemp - minTemp)) * 160}`
              ).join(' L ')}`}
              stroke="url(#tempGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              className="animate-draw-line"
            />
            
            {/* Temperature points with glow */}
            {historicalData.map((d, i) => (
              <g key={i}>
                <circle
                  cx={60 + i * 55}
                  cy={250 - ((d.temp - minTemp) / (maxTemp - minTemp)) * 160}
                  r="6"
                  fill="url(#tempGradient)"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
                <circle
                  cx={60 + i * 55}
                  cy={250 - ((d.temp - minTemp) / (maxTemp - minTemp)) * 160}
                  r="12"
                  fill="none"
                  stroke="rgba(168, 85, 247, 0.3)"
                  strokeWidth="1"
                  className="animate-ping"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
                {/* Temperature value labels */}
                <text
                  x={60 + i * 55}
                  y={240 - ((d.temp - minTemp) / (maxTemp - minTemp)) * 160}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {d.temp}°
                </text>
              </g>
            ))}
            
            {/* Precipitation bars */}
            {historicalData.map((d, i) => (
              <g key={i}>
                <rect
                  x={55 + i * 55}
                  y={260 - (d.precipitation / maxPrecip) * 30}
                  width="10"
                  height={(d.precipitation / maxPrecip) * 30}
                  fill="url(#precipGradient)"
                  rx="2"
                  className="animate-grow-bar"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
                {/* Glow effect for bars */}
                <rect
                  x={55 + i * 55}
                  y={260 - (d.precipitation / maxPrecip) * 30}
                  width="10"
                  height={(d.precipitation / maxPrecip) * 30}
                  fill="none"
                  stroke="rgba(168, 85, 247, 0.5)"
                  strokeWidth="1"
                  rx="2"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              </g>
            ))}
            
            {/* Day labels */}
            {historicalData.map((d, i) => (
              <text
                key={i}
                x={60 + i * 55}
                y={280}
                textAnchor="middle"
                fill="rgba(255, 255, 255, 0.7)"
                fontSize="12"
                className="font-medium"
              >
                {d.day}
              </text>
            ))}
          </svg>
          
          {/* Legend */}
          <div className="absolute top-4 right-4 space-y-3 bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
              <span className="text-white text-sm font-medium">Temperature</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded"></div>
              <span className="text-white text-sm font-medium">Precipitation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherChart;