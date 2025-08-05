import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { showSuccess, showError } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Settings = () => {
  const [leonardoApiKey, setLeonardoApiKey] = useState<string>("");

  useEffect(() => {
    const storedKey = localStorage.getItem("leonardo_api_key");
    if (storedKey) {
      setLeonardoApiKey(storedKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (leonardoApiKey.trim()) {
      localStorage.setItem("leonardo_api_key", leonardoApiKey.trim());
      showSuccess("Leonardo.ai API Key saved!");
    } else {
      localStorage.removeItem("leonardo_api_key");
      showSuccess("Leonardo.ai API Key cleared!");
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("leonardo_api_key");
    setLeonardoApiKey("");
    showSuccess("Leonardo.ai API Key cleared!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-2xl shadow-lg rounded-lg">
        <CardHeader className="relative">
          <Link to="/image-generator" className="absolute top-4 left-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <CardTitle className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
            Settings
          </CardTitle>
          <CardDescription className="text-center mt-2">
            Manage your application settings and API keys.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          {/* Theme Settings */}
          <div className="flex items-center justify-between p-4 border rounded-md bg-gray-100 dark:bg-gray-800">
            <label htmlFor="theme-toggle" className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Theme
            </label>
            <ThemeToggle />
          </div>

          {/* API Key Settings */}
          <div className="space-y-4 p-4 border rounded-md bg-gray-100 dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Leonardo.ai API Key</h3>
            <p className="text-sm text-red-600 dark:text-red-400">
              <strong>Warning:</strong> Storing API keys directly in the browser's local storage is insecure for production environments. For a real application, API keys should be managed on a secure backend server.
            </p>
            <Input
              id="leonardo-api-key"
              type="password" // Use type="password" for security
              placeholder="Enter your Leonardo.ai API Key"
              value={leonardoApiKey}
              onChange={(e) => setLeonardoApiKey(e.target.value)}
              className="w-full border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex space-x-2">
              <Button onClick={handleSaveApiKey} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Save Key
              </Button>
              <Button onClick={handleClearApiKey} variant="outline" className="flex-1 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900">
                Clear Key
              </Button>
            </div>
            {leonardoApiKey && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Current Key: {leonardoApiKey.substring(0, 4)}...{leonardoApiKey.substring(leonardoApiKey.length - 4)} (masked)
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default Settings;