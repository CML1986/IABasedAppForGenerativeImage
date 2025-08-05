import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate an image.");
      return;
    }

    setIsLoading(true);
    setImageUrl(null);
    toast.showLoading("Generating image...");

    try {
      // In a real application, you would make an API call to your backend here.
      // The backend would then call an AI image generation service (e.g., DALL-E, Stable Diffusion).
      // For now, we'll simulate a delay and show a placeholder image.
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate API call delay

      // Placeholder image URL - replace with actual generated image URL from your backend
      const generatedImage = "https://via.placeholder.com/512x512?text=Generated+Image";
      setImageUrl(generatedImage);
      toast.dismissToast("generating-image"); // Dismiss loading toast
      toast.showSuccess("Image generated successfully!");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.dismissToast("generating-image"); // Dismiss loading toast
      toast.showError("Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-2xl shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
            AI Image Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter your prompt:
            </label>
            <Textarea
              id="prompt"
              placeholder="e.g., A futuristic city at sunset, cyberpunk style, highly detailed"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full resize-none border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button
            onClick={handleGenerateImage}
            disabled={isLoading}
            className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
          >
            {isLoading ? "Generating..." : "Generate Image"}
          </Button>

          {imageUrl && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Generated Image:</h2>
              <div className="relative w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
                <img
                  src={imageUrl}
                  alt="Generated AI Image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default ImageGenerator;