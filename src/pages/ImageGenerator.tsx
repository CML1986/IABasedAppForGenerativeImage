import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Settings as SettingsIcon } from "lucide-react"; // Import Settings icon
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess, showError, showLoading, dismissToast } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button"; // Import Button component

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  useEffect(() => {
    const storedKey = localStorage.getItem("leonardo_api_key");
    setHasApiKey(!!storedKey);
  }, []);

  useEffect(() => {
    let handler: ReturnType<typeof setTimeout>;
    let activeToastId: string | null = null;

    const cleanup = () => {
      clearTimeout(handler);
      if (activeToastId) {
        dismissToast(activeToastId);
      }
    };

    if (!prompt.trim()) {
      setIsLoading(false);
      return cleanup;
    }

    if (!hasApiKey) {
      showError("Please set your Leonardo.ai API Key in Settings to generate images.");
      setIsLoading(false);
      return cleanup;
    }

    setIsLoading(true);
    setImageUrl(null);

    activeToastId = showLoading("Generating image...");

    handler = setTimeout(async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // In a real app, you would use the API key (e.g., from localStorage)
        // to make a request to Leonardo.ai here.
        // const apiKey = localStorage.getItem("leonardo_api_key");
        // const response = await fetch("YOUR_LEONARDO_AI_API_ENDPOINT", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Authorization": `Bearer ${apiKey}`,
        //   },
        //   body: JSON.stringify({ prompt }),
        // });
        // const data = await response.json();
        // setImageUrl(data.generatedImage);

        const generatedImage = `https://via.placeholder.com/512x512?text=${encodeURIComponent(prompt.substring(0, 20)) || "Generated+Image"}`;
        setImageUrl(generatedImage);
        showSuccess("Image generated successfully!");
      } catch (error) {
        console.error("Error generating image:", error);
        showError("Failed to generate image. Please try again.");
      } finally {
        setIsLoading(false);
        if (activeToastId) {
          dismissToast(activeToastId);
          activeToastId = null;
        }
      }
    }, 500);

    return cleanup;
  }, [prompt, hasApiKey]); // Re-run effect when prompt or API key status changes

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-2xl shadow-lg rounded-lg">
        <CardHeader className="relative">
          <Link to="/settings" className="absolute top-4 right-4">
            <Button variant="ghost" size="icon">
              <SettingsIcon className="h-6 w-6" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
          <CardTitle className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
            Imagine everything!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter your prompt:
            </label>
            <Textarea
              id="prompt"
              placeholder="Imagine everything!"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full resize-none border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 focus:ring-blue-500 focus:border-blue-500"
              disabled={!hasApiKey} // Disable input if no API key
            />
            {!hasApiKey && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-2">
                Please go to <Link to="/settings" className="underline">Settings</Link> to add your Leonardo.ai API Key.
              </p>
            )}
          </div>

          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Generated Image:</h2>
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              {isLoading && prompt.trim() ? (
                <Skeleton className="w-full h-full bg-gray-200 dark:bg-gray-700" />
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Generated AI Image"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  {hasApiKey ? "Type a prompt to generate an image." : "Add your API key in Settings to start generating."}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default ImageGenerator;