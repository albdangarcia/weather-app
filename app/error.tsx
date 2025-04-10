"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 p-4">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>

      {/* Error Message */}
      <h1 className="text-lg text-center text-gray-700 mb-6">
        {error.message}
      </h1>

      {/* Retry Button */}
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
      >
        Try again
      </button>
    </div>
  );
}
