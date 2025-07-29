import React, { useState, useEffect } from 'react';
import { Search, MapPin, Wind, Droplets, Eye, Thermometer, Gauge, Sun, Cloud, CloudRain, CloudSnow, Zap } from 'lucide-react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherStats from './components/WeatherStats';
import ForecastCards from './components/ForecastCards';
import WeatherChart from './components/WeatherChart';
import DetailsModal from './components/DetailsModal';
import Background from './components/Background';
import { WeatherData, ForecastData } from './types/weather';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [selectedCity, setSelectedCity] = useState('London');
  const [loading, setLoading] = useState(false);
  const [selectedForecast, setSelectedForecast] = useState<ForecastData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Users will need to add their API key

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    try {
      // Mock data for demonstration - replace with actual API calls
      const mockCurrentWeather: WeatherData = {
        city: city,
        country: 'GB',
        temperature: 22,
        condition: 'partly-cloudy',
        description: 'Partly Cloudy',
        humidity: 65,
        pressure: 1013,
        windSpeed: 12,
        windDirection: 180,
        visibility: 10,
        uvIndex: 6,
        cloudCover: 40,
        sunrise: '06:30',
        sunset: '19:45',
        feelsLike: 24,
        coords: { lat: 51.5074, lon: -0.1278 }
      };

      const mockForecast: ForecastData[] = [
        { date: '2025-01-01', high: 25, low: 18, condition: 'sunny', precipitation: 0, humidity: 60, description: 'Sunny' },
        { date: '2025-01-02', high: 23, low: 16, condition: 'partly-cloudy', precipitation: 10, humidity: 65, description: 'Partly Cloudy' },
        { date: '2025-01-03', high: 20, low: 14, condition: 'rainy', precipitation: 80, humidity: 85, description: 'Rainy' },
        { date: '2025-01-04', high: 18, low: 12, condition: 'cloudy', precipitation: 20, humidity: 70, description: 'Cloudy' },
        { date: '2025-01-05', high: 21, low: 15, condition: 'sunny', precipitation: 0, humidity: 55, description: 'Sunny' },
        { date: '2025-01-06', high: 24, low: 17, condition: 'partly-cloudy', precipitation: 15, humidity: 62, description: 'Partly Cloudy' },
        { date: '2025-01-07', high: 26, low: 19, condition: 'sunny', precipitation: 5, humidity: 58, description: 'Sunny' }
      ];

      setWeatherData(mockCurrentWeather);
      setForecastData(mockForecast);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity]);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  const handleForecastClick = (forecast: ForecastData) => {
    setSelectedForecast(forecast);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background />
      
      <div className="relative z-10 min-h-screen px-4 py-6 md:px-8 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Search */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Weather Command
              </h1>
              <p className="text-gray-300 text-lg">Advanced Weather Tracking System</p>
            </div>
            <SearchBar onCitySelect={handleCitySelect} loading={loading} />
          </div>

          {weatherData && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Column - Current Weather & Stats */}
              <div className="xl:col-span-2 space-y-8">
                <CurrentWeather data={weatherData} loading={loading} />
                <WeatherStats data={weatherData} />
                <WeatherChart city={selectedCity} />
              </div>

              {/* Right Column - Forecast */}
              <div className="space-y-8">
                <ForecastCards 
                  data={forecastData} 
                  onForecastClick={handleForecastClick}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showModal && selectedForecast && (
        <DetailsModal 
          forecast={selectedForecast}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;