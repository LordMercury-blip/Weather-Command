export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  uvIndex: number;
  cloudCover: number;
  sunrise: string;
  sunset: string;
  feelsLike: number;
  coords: {
    lat: number;
    lon: number;
  };
}

export interface ForecastData {
  date: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
  humidity: number;
  description: string;
}

export interface HistoricalData {
  date: string;
  temperature: number;
  precipitation: number;
}