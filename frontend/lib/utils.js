import { format, parseISO } from 'date-fns';

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const formatDate = (dateString, formatStr = 'PPP') => {
  try {
    return format(parseISO(dateString), formatStr);
  } catch {
    return dateString;
  }
};

export const processWeatherData = (data) => {
  if (!data?.daily) return [];
  
  const { time, temperature_2m_max, temperature_2m_min, apparent_temperature_max, apparent_temperature_min } = data.daily;
  
  return time.map((date, index) => ({
    date,
    temperature_2m_max: temperature_2m_max?.[index] || null,
    temperature_2m_min: temperature_2m_min?.[index] || null,
    apparent_temperature_max: apparent_temperature_max?.[index] || null,
    apparent_temperature_min: apparent_temperature_min?.[index] || null,
  }));
};