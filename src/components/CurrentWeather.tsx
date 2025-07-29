import React from 'react';
import { MapPin, Sunrise, Sunset, Navigation } from 'lucide-react';
import { WeatherData } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  data: WeatherData;
  loading: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-purple-500/20 rounded-lg w-1/3"></div>
          <div className="h-32 bg-purple-500/20 rounded-lg w-2/3"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-purple-500/20 rounded-lg"></div>
            <div className="h-20 bg-purple-500/20 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/30 via-purple-400/30 to-purple-600/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
        {/* Location header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <MapPin className="text-purple-400 w-6 h-6" />
              <div className="absolute inset-0 bg-purple-400/30 rounded-full blur-md animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{data.city}</h2>
              <p className="text-purple-300 text-sm">{data.country}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-400">Coordinates</div>
            <div className="text-purple-300 text-sm font-mono">
              {data.coords.lat.toFixed(2)}°, {data.coords.lon.toFixed(2)}°
            </div>
          </div>
        </div>

        {/* Main weather display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
          {/* Temperature section */}
          <div className="text-center lg:text-left">
            <div className="relative inline-block">
              <span className="text-8xl lg:text-9xl font-bold bg-gradient-to-br from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                {data.temperature}°
              </span>
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-purple-600/20 blur-2xl animate-pulse"></div>
              {/* Pulsing dot */}
              <div className="absolute -top-4 -right-4 w-4 h-4 bg-purple-400 rounded-full animate-ping"></div>
              <div className="absolute -top-4 -right-4 w-4 h-4 bg-purple-400 rounded-full"></div>
            </div>
            
            <div className="mt-4 space-y-2">
              <p className="text-2xl text-gray-200 capitalize font-medium">{data.description}</p>
              <p className="text-lg text-purple-300">Feels like {data.feelsLike}°C</p>
            </div>
          </div>

          {/* Weather icon with 3D effect */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <WeatherIcon condition={data.condition} size="large" />
              {/* 3D wireframe background */}
              <div className="absolute inset-0 -z-10">
                <svg viewBox="0 0 200 200" className="w-full h-full opacity-20">
                  <defs>
                    <radialGradient id="wireframeGradient">
                      <stop offset="0%" stopColor="rgba(168, 85, 247, 0.6)" />
                      <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
                    </radialGradient>
                  </defs>
                  <circle cx="100" cy="100" r="80" stroke="url(#wireframeGradient)" strokeWidth="1" fill="none" />
                  <circle cx="100" cy="100" r="60" stroke="url(#wireframeGradient)" strokeWidth="1" fill="none" />
                  <circle cx="100" cy="100" r="40" stroke="url(#wireframeGradient)" strokeWidth="1" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Additional info cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-black/40 border border-purple-500/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Sunrise className="text-orange-400 w-5 h-5" />
                <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-sm animate-pulse"></div>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Sunrise</p>
                <p className="text-white font-semibold">{data.sunrise}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black/40 border border-purple-500/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Sunset className="text-orange-600 w-5 h-5" />
                <div className="absolute inset-0 bg-orange-600/20 rounded-full blur-sm animate-pulse"></div>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Sunset</p>
                <p className="text-white font-semibold">{data.sunset}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black/40 border border-purple-500/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Navigation className="text-purple-400 w-5 h-5" style={{ transform: `rotate(${data.windDirection}deg)` }} />
                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm animate-pulse"></div>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Wind Dir</p>
                <p className="text-white font-semibold">{data.windDirection}°</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black/40 border border-purple-500/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 relative">
                <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-30"></div>
                <div className="absolute inset-0 bg-purple-400 rounded-full"></div>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">UV Index</p>
                <p className="text-white font-semibold">{data.uvIndex}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;