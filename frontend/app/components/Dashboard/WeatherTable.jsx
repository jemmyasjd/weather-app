'use client';

import { useState } from 'react';
import { Table, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '@/app/components/UI/Card';
import { processWeatherData } from '@/lib/utils';

export default function WeatherTable({ data }) {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table className="h-6 w-6 text-primary" />
            Daily Weather Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Table className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold">No data to display</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Select a weather file to view detailed data
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const processedData = processWeatherData(data);
  const totalPages = Math.ceil(processedData.length / pageSize);
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = processedData.slice(startIndex, endIndex);

  const columns = [
    { key: 'date', label: 'Date', format: (val) => new Date(val).toLocaleDateString() },
    { key: 'temperature_2m_max', label: 'Max Temp (°C)', format: (val) => val?.toFixed(1) },
    { key: 'temperature_2m_min', label: 'Min Temp (°C)', format: (val) => val?.toFixed(1) },
    { key: 'apparent_temperature_max', label: 'Feels Like Max (°C)', format: (val) => val?.toFixed(1) },
    { key: 'apparent_temperature_min', label: 'Feels Like Min (°C)', format: (val) => val?.toFixed(1) },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Table className="h-6 w-6 text-primary" />
            Daily Weather Data
          </CardTitle>
          
          {/* Page Size Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              {[10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>
     <CardContent scrollable className="h-[400px]"> 
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50 sticky top-0">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-3 text-left text-sm font-medium text-muted-foreground"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-sm">
                      {col.format ? col.format(row[col.key]) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, processedData.length)} of{' '}
              {processedData.length} entries
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center rounded-md p-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center rounded-md p-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center rounded-md p-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center rounded-md p-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}