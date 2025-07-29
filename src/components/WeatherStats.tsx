import React from 'react';
import { Wind, Droplets, Eye, Gauge, Sun, Cloud } from 'lucide-react';
import { WeatherData } from '../types/weather';
import CircularProgress from './CircularProgress';
import RadarChart from './RadarChart';

interface WeatherStatsProps {
  data: WeatherData;
}

const WeatherStats: React.FC<WeatherStatsProps> = ({ data }) => {
  const stats = [
    {
      icon: <Droplets className="w-6 h-6 text-purple-400" />,
      label: 'Humidity',
      value: data.humidity,
      unit: '%',
      max: 100,
      color: 'from-purple-500 to-blue-400'
    },
    {
      icon: <Wind className="w-6 h-6 text-purple-400" />,
      label: 'Wind Speed',
      value: data.windSpeed,
      unit: 'km/h',
      max: 50,
      color: 'from-purple-500 to-pink-400'
    },
    {
      icon: <Gauge className="w-6 h-6 text-purple-400" />,
      label: 'Pressure',
      value: data.pressure,
      unit: 'hPa',
      max: 1050,
      min: 950,
      color: 'from-purple-500 to-purple-300'
    },
    {
      icon: <Sun className="w-6 h-6 text-purple-400" />,
      label: 'UV Index',
      value: data.uvIndex,
      unit: '',
      max: 11,
      color: 'from-purple-400 to-pink-400'
    },
    {
      icon: <Eye className="w-6 h-6 text-purple-400" />,
      label: 'Visibility',
      value: data.visibility,
      unit: 'km',
      max: 20,
      color: 'from-purple-500 to-indigo-400'
    },
    {
      icon: <Cloud className="w-6 h-6 text-purple-400" />,
      label: 'Cloud Cover',
      value: data.cloudCover,
      unit: '%',
      max: 100,
      color: 'from-purple-500 to-gray-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Circular Progress Stats */}
      <div className="xl:col-span-2">
        <div className="relative group">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-purple-400/20 to-purple-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
              <span>Weather Analytics</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center space-y-4 group/stat">
                  <div className="relative">
                    <CircularProgress
                      value={stat.value}
                      max={stat.max}
                      min={stat.min}
                      color={stat.color}
                      size={120}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="relative">
                        {stat.icon}
                        <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-md opacity-0 group-hover/stat:opacity-100 transition-opacity"></div>
                      </div>
                      <span className="text-white font-bold text-lg mt-2">
                        {stat.value}{stat.unit}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm font-medium text-center group-hover/stat:text-purple-300 transition-colors uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="relative group">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-purple-400/20 to-purple-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl h-full">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
            <span>Weather Radar</span>
          </h3>
          
          <RadarChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default WeatherStats;