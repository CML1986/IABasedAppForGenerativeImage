import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess, showError, showLoading, dismissToast } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Skeleton } from "@/components/ui/skeleton";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let handler: ReturnType<typeof setTimeout>;
    let activeToastId: string | null = null; // Local variable to hold the toast ID for this effect run

    // Cleanup function for when the effect re-runs or component unmounts
    const cleanup = () => {
      clearTimeout(handler); // Always clear any pending timeout
      if (activeToastId) {
        dismissToast(activeToastId); // Dismiss the toast associated with this effect run
      }
    };

    if (!prompt.trim()) {
      // If prompt is empty, stop loading, but keep the last image visible
      setIsLoading(false);
      // Do NOT set imageUrl to null here; it will retain its last value
      return cleanup; // Return cleanup to clear any previous toast/timeout
    }

    // If prompt is not empty, start the generation process
    setIsLoading(true);
    setImageUrl(null); // Clear previous image to show skeleton for new generation

    // Show loading toast and store its ID
    activeToastId = showLoading("Generating image...");

    handler = setTimeout(async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Placeholder image URL - replace with actual generated image URL from your backend
        // For a real app, you'd send 'prompt' to your backend here.
        const generatedImage = `https://via.placeholder.com/512x512?text=${encodeURIComponent(prompt.substring(0, 20)) || "Generated+Image"}`;
        setImageUrl(generatedImage);
        showSuccess("Image generated successfully!");
      } catch (error) {
        console.error("Error generating image:", error);
        showError("Failed to generate image. Please try again.");
      } finally {
        setIsLoading(false);
        if (activeToastId) {
          dismissToast(activeToastId); // Dismiss the toast when generation finishes
          activeToastId = null; // Clear local reference
        }
      }
    }, 500); // Debounce delay: 500ms

    return cleanup; // Return the cleanup function for this effect run
  }, [prompt]); // Re-run effect only when prompt changes

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-2xl shadow-lg rounded-lg">
        <CardHeader>
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
            />
          </div>

          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Generated Image:</h2>
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              {isLoading && prompt.trim() ? ( // Only show skeleton if loading AND prompt is not empty
                <Skeleton className="w-full h-full bg-gray-200 dark:bg-gray-700" />
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Generated AI Image"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Type a prompt to generate an image.</p>
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