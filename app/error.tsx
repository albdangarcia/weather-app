"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Get the router instance
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error Boundary Caught:", error);
  }, [error]);

  const handleRetry = () => {
    console.log("Attempting retry via router.refresh()...");
    try {
      // Force a refetch of server-side data for the current route
      router.refresh();
    } catch (refreshError) {
      console.error("Failed to trigger router.refresh():", refreshError);
      // As a fallback, try the original reset mechanism
      try {
        console.log("Falling back to reset()...");
        reset();
      } catch (resetError) {
        // Inform user retry failed completely if necessary
        console.error("Fallback reset() also failed:", resetError);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 p-4">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>

      {/* Error Message */}
      <p className="text-lg text-center text-gray-700 mb-6">
        We couldn't load the weather data at this moment. Please try again.
        {process.env.NODE_ENV === "development" && error?.message && (
          <span className="block text-sm text-red-600 mt-2">
            Details: {error.message}{" "}
            {error.digest ? `(Digest: ${error.digest})` : ""}
          </span>
        )}
      </p>

      {/* Retry Button */}
      <button
        onClick={handleRetry}
        className="px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
      >
        Try again
      </button>
    </div>
  );
}
