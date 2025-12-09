"use client";

import { useState } from "react";
import { Cloud, Database, BarChart3 } from "lucide-react";
import InputPanel from "@/app/components/Dashboard/InputPanel";
import FileBrowser from "@/app/components/Dashboard/FileBrowser";
import WeatherChart from "@/app/components/Dashboard/WeatherChart";
import WeatherTable from "@/app/components/Dashboard/WeatherTable";
import { weatherAPI } from "@/lib/api";
import toast from "react-hot-toast";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const handleFetchData = async (data) => {
    try {
      setIsLoading(true);
      const response = await weatherAPI.storeWeatherData(data);

      const fileData = await weatherAPI.getWeatherFileContent(response.file);
      setSelectedFile({ fileName: response.file, data: fileData });
      setRefreshFlag((prev) => prev + 1);
      toast.success(`Data stored successfully as ${response.file}`);
    } catch (error) {
      toast.error(
        "Failed to fetch weather data"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Explore Historical
          <span className="bg-purple-500 bg-clip-text text-transparent">
            {" "}
            Weather Data
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Fetch, store, and visualize historical daily weather data from
          locations worldwide
        </p>
      </div>

      {/* Main Dashboard */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Input & File Browser */}
        <div className="lg:col-span-1 space-y-8">
          {/* Info Section */}
          <div className="rounded-lg border bg-muted/50 p-6">
            <h3 className="font-semibold mb-2">How it works:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Enter location coordinates and date range (max 31 days)</li>
              <li>
                Click "Fetch & Store Data" to retrieve weather data and save to
                cloud storage
              </li>
              <li>Browse stored files in the file browser</li>
              <li>
                Click on any file to visualize temperature data and view
                detailed metrics
              </li>
              <li>
                Use the paginated table to navigate through daily weather
                records
              </li>
            </ol>
          </div>
          <InputPanel onFetchData={handleFetchData} isLoading={isLoading} />
          <FileBrowser
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
            refreshTrigger={refreshFlag}
          />
        </div>

        {/* Right Column - Visualization */}
        <div className="lg:col-span-2 space-y-8">
          <WeatherChart data={selectedFile?.data} />
          <WeatherTable data={selectedFile?.data} />
        </div>
      </div>
    </div>
  );
}
