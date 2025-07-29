import React from 'react';
import { X, Calendar, Thermometer, Droplets, Wind, Eye, Gauge } from 'lucide-react';
import { ForecastData } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface DetailsModalProps {
  forecast: ForecastData;
  onClose: () => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ forecast, onClose }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative max-w-2xl w-full animate-modal-appear">
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/50 via-purple-400/50 to-purple-600/50 blur-lg"></div>
        
        <div className="relative bg-black/80 backdrop-blur-xl border border-purple-500/40 rounded-3xl p-8 shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/60 hover:bg-purple-500/20 border border-purple-500/30 flex items-center justify-center transition-all duration-200 group"
          >
            <X className="w-5 h-5 text-white group-hover:text-purple-300" />
            <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="relative">
                <Calendar className="text-purple-400 w-6 h-6" />
                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-md animate-pulse"></div>
              </div>
              <h2 className="text-3xl font-bold text-white">{formatDate(forecast.date)}</h2>
            </div>
            
            {/* Weather icon with 3D wireframe */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <WeatherIcon condition={forecast.condition} size="large" />
                <div className="absolute inset-0 -z-10">
                  <svg viewBox="0 0 150 150" className="w-full h-full opacity-20">
                    <defs>
                      <radialGradient id="wireframeGradient">
                        <stop offset="0%" stopColor="rgba(168, 85, 247, 0.6)" />
                        <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
                      </radialGradient>
                    </defs>
                    <circle cx="75" cy="75" r="60" stroke="url(#wireframeGradient)" strokeWidth="1" fill="none" />
                    <circle cx="75" cy="75" r="45" stroke="url(#wireframeGradient)" strokeWidth="1" fill="none" />
                    <circle cx="75" cy="75" r="30" stroke="url(#wireframeGradient)" strokeWidth="1" fill="none" />
                    <line x1="15" y1="75" x2="135" y2="75" stroke="url(#wireframeGradient)" strokeWidth="1" />
                    <line x1="75" y1="15" x2="75" y2="135" stroke="url(#wireframeGradient)" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
            
            <p className="text-2xl text-gray-200 capitalize font-medium">{forecast.description}</p>
          </div>
          
          {/* Temperature display */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2 uppercase tracking-wide">High</p>
                <div className="relative">
                  <p className="text-5xl font-bold bg-gradient-to-br from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                    {forecast.high}°
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-purple-600/20 blur-xl animate-pulse"></div>
                </div>
              </div>
              
              <div className="w-px h-20 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"></div>
              
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2 uppercase tracking-wide">Low</p>
                <div className="relative">
                  <p className="text-5xl font-bold text-gray-300">{forecast.low}°</p>
                  <div className="absolute inset-0 bg-gray-400/10 blur-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Detailed stats grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-black/40 border border-purple-500/20 rounded-xl p-6 text-center backdrop-blur-sm">
              <div className="relative mb-4">
                <Droplets className="text-purple-400 w-8 h-8 mx-auto" />
                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-md animate-pulse"></div>
              </div>
              <p className="text-gray-400 text-sm uppercase tracking-wide mb-2">Precipitation</p>
              <p className="text-white text-2xl font-bold">{forecast.precipitation}%</p>
              <div className="w-full bg-gray-700/50 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${forecast.precipitation}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-black/40 border border-purple-500/20 rounded-xl p-6 text-center backdrop-blur-sm">
              <div className="relative mb-4">
                <Wind className="text-purple-400 w-8 h-8 mx-auto" />
                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-md animate-pulse"></div>
              </div>
              <p className="text-gray-400 text-sm uppercase tracking-wide mb-2">Humidity</p>
              <p className="text-white text-2xl font-bold">{forecast.humidity}%</p>
              <div className="w-full bg-gray-700/50 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${forecast.humidity}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Animated weather visualization */}
          <div className="relative h-24 bg-black/40 border border-purple-500/20 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/10"></div>
            
            {forecast.condition === 'rainy' && (
              <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-8 bg-purple-400 animate-rain opacity-60"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random()}s`
                    }}
                  ></div>
                ))}
              </div>
            )}
            
            {forecast.condition === 'sunny' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse">
                    <div className="absolute inset-0 bg-yellow-400/50 rounded-full animate-ping"></div>
                  </div>
                  {/* Sun rays */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-6 bg-gradient-to-t from-yellow-400 to-transparent"
                      style={{
                        top: '-12px',
                        left: '50%',
                        transformOrigin: '50% 44px',
                        transform: `translateX(-50%) rotate(${i * 45}deg)`,
                        animation: `sun-ray 2s ease-in-out infinite ${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}
            
            {(forecast.condition === 'cloudy' || forecast.condition === 'partly-cloudy') && (
              <div className="absolute inset-0 flex items-center justify-center space-x-2">
                <div className="w-12 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full animate-float opacity-80"></div>
                <div className="w-16 h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full animate-float-delayed opacity-90"></div>
                <div className="w-10 h-6 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full animate-float opacity-70"></div>
              </div>
            )}
            
            {/* Wireframe overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <svg viewBox="0 0 400 100" className="w-full h-full opacity-20">
                <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="200" y1="0" x2="200" y2="100" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" strokeDasharray="4,4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;