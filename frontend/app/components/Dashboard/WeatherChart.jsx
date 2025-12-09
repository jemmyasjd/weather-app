'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Wind, Sun } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '@/app/components/UI/Card';
import { processWeatherData } from '@/lib/utils';

export default function WeatherChart({ data }) {
  const [selectedMetrics, setSelectedMetrics] = useState([
    'temperature_2m_max',
    'temperature_2m_min',
  ]);

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-6 w-6 text-primary" />
            Temperature Visualization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Sun className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold">No data to display</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Select a weather file to visualize temperature data
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const processedData = processWeatherData(data);
  const chartData = processedData.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  const metricConfig = {
    temperature_2m_max: {
      label: 'Max Temp (°C)',
      color: '#ef4444',
      icon: <Thermometer className="h-3 w-3" />,
    },
    temperature_2m_min: {
      label: 'Min Temp (°C)',
      color: '#3b82f6',
      icon: <Thermometer className="h-3 w-3" />,
    },
    apparent_temperature_max: {
      label: 'Feels Like Max (°C)',
      color: '#f59e0b',
      icon: <Wind className="h-3 w-3" />,
    },
    apparent_temperature_min: {
      label: 'Feels Like Min (°C)',
      color: '#10b981',
      icon: <Droplets className="h-3 w-3" />,
    },
  };

  const toggleMetric = (metric) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-6 w-6 text-primary" />
          Temperature Visualization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Metric Toggles */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(metricConfig).map(([metric, config]) => (
              <button
                key={metric}
                onClick={() => toggleMetric(metric)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedMetrics.includes(metric)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {config.icon}
                {config.label}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                {selectedMetrics.map((metric) => (
                  <Line
                    key={metric}
                    type="monotone"
                    dataKey={metric}
                    stroke={metricConfig[metric].color}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name={metricConfig[metric].label}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}