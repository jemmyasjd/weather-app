import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const weatherAPI = {
  // Store weather data
  storeWeatherData: async (data) => {
    const response = await api.post('/store-weather-data', data);
    return response.data;
  },

  // List weather files
  listWeatherFiles: async () => {
    const response = await api.get('/list-weather-files');
    return response.data;
  },

  // Get weather file content
  getWeatherFileContent: async (fileName) => {
    const response = await api.get(`/weather-file-content/${fileName}`);
    return response.data;
  },
};

export default api;