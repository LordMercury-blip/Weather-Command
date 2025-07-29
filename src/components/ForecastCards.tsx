import React from 'react';
import { Calendar, Droplets, Wind, Eye } from 'lucide-react';
import { ForecastData } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface ForecastCardsProps {
  data: ForecastData[];
  onForecastClick: (forecast: ForecastData) => void;
}

const ForecastCards: React.FC<ForecastCardsProps> = ({ data, onForecastClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' })
    };
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-purple-400/20 to-purple-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center space-x-3 mb-8">
          <div className="relative">
            <Calendar className="text-purple-400 w-6 h-6" />
            <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-md animate-pulse"></div>
          </div>
          <h3 className="text-2xl font-bold text-white">7-Day Forecast</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
        </div>
        
        <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
          {data.map((forecast, index) => {
            const { day, date, month } = formatDate(forecast.date);
            
            return (
              <div
                key={index}
                onClick={() => onForecastClick(forecast)}
                className="relative group/card cursor-pointer"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/30 via-purple-400/30 to-purple-600/30 blur-md opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    {/* Date section */}
                    <div className="flex items-center space-x-6">
                      <div className="text-center min-w-[60px]">
                        <p className="text-white font-bold text-lg">{day}</p>
                        <p className="text-purple-300 text-sm">{date} {month}</p>
                      </div>
                      
                      {/* Weather icon with wireframe background */}
                      <div className="relative">
                        <WeatherIcon condition={forecast.condition} size="medium" />
                        <div className="absolute inset-0 -z-10">
                          <svg viewBox="0 0 60 60" className="w-full h-full opacity-20">
                            <circle cx="30" cy="30" r="25" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1" fill="none" />
                            <circle cx="30" cy="30" r="15" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" fill="none" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Weather description and details */}
                      <div className="flex-1">
                        <p className="text-white font-medium capitalize text-lg">{forecast.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                          <div className="flex items-center space-x-1">
                            <Droplets className="w-3 h-3" />
                            <span>{forecast.precipitation}%</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Wind className="w-3 h-3" />
                            <span>{forecast.humidity}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Temperature display */}
                    <div className="text-right">
                      <div className="flex items-center space-x-3">
                        <div className="text-center">
                          <span className="text-white text-2xl font-bold">{forecast.high}°</span>
                          <div className="w-8 h-px bg-gradient-to-r from-purple-400 to-transparent mt-1"></div>
                        </div>
                        <div className="text-center">
                          <span className="text-gray-400 text-xl font-medium">{forecast.low}°</span>
                          <div className="w-8 h-px bg-gradient-to-r from-gray-400 to-transparent mt-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bar for precipitation */}
                  <div className="mt-4 pt-4 border-t border-purple-500/20">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                      <span>Precipitation Chance</span>
                      <span>{forecast.precipitation}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-400 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${forecast.precipitation}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ForecastCards;