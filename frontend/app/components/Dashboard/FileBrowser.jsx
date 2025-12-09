"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Calendar,
  Download,
  FileJson,
  Trash2,
  ExternalLink,
} from "lucide-react";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/app/components/UI/Card";
import Button from "@/app/components/UI/Button";
import { weatherAPI } from "@/lib/api";
import { formatBytes, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

export default function FileBrowser({
  onFileSelect,
  selectedFile,
  refreshTrigger,
}) {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      const response = await weatherAPI.listWeatherFiles();
      setFiles(response.files || []);
    } catch (error) {
      toast.error("Failed to fetch files");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [refreshTrigger]);

  const handleFileClick = async (fileName) => {
    try {
      const data = await weatherAPI.getWeatherFileContent(fileName);
      onFileSelect({ fileName, data });
      toast.success(`Loaded data from ${fileName}`);
    } catch (error) {
      toast.error("Failed to load file content");
    }
  };

  const handleRefresh = () => {
    fetchFiles();
    toast.success("File list refreshed");
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading files..." />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Stored Weather Files
            </CardTitle>
            <CardDescription>
              Click on any file to view its weather data and visualize
              temperatures
            </CardDescription>
          </div>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileJson className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold">No files found</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Fetch some weather data to see files here
            </p>
          </div>
        ) : (
          <div className="grid gap-3 max-h-[300px] overflow-y-auto pr-2">
            {files.map((file) => (
              <div
                key={file.name}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer hover:bg-accent ${
                  selectedFile?.fileName === file.name
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
                onClick={() => handleFileClick(file.name)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-md bg-primary/10">
                    <FileJson className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate max-w-[200px]">
                        {file.name}
                      </span>
                      {selectedFile?.fileName === file.name && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(file.created_at)}
                      </span>
                      <span>{formatBytes(file.size)}</span>
                    </div>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
