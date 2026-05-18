"use client";

import { useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";

import DateLocation from "./components/date-location";
import WeatherInfo from "./components/weatherInfo";
import Nav from "./components/nav";
import GitHubIcon from "./components/github-Icon";
import { useLastGoodWeather } from "./components/LastGoodWeatherContext";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const { lastGoodData } = useLastGoodWeather();

  useEffect(() => {
    console.error("Error Boundary Caught:", error);
  }, [error]);

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      reset(); // This clears the error boundary state while the router fetches
    });
  };

  // Determine if the error is likely a city not found or no data found from initial page load logic
  const isNotFoundError =
    error.message?.includes("City not found") ||
    error.message?.includes("No Data Found") ||
    error.message?.includes("No weather data could be retrieved");

  if (lastGoodData && !isNotFoundError) {
    return (
      <>
        <GitHubIcon />
        <div className="mb-20">
          <Nav /> {/* Show Nav so user can try other locations */}
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md my-4 mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-semibold">
              Failed to Load New Weather Data
            </h2>
            <p className="mt-1">
              We couldn&apos;t fetch the latest weather information for the
              requested location. Displaying the last known data for:{" "}
              <strong>{lastGoodData.cityName}</strong>.
            </p>
            {lastGoodData.timestamp && (
              <p className="text-sm mt-1">
                Last updated:{" "}
                {new Date(lastGoodData.timestamp).toLocaleString()}
              </p>
            )}
            <button
              onClick={handleRetry}
              className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300"
            >
              Try Again
            </button>
          </div>
          {/* Render weather components with stale data */}
          <DateLocation cityName={lastGoodData.cityName} />
          <WeatherInfo
            dailyForecasts={lastGoodData.dailyForecasts}
            hourlyForecast={lastGoodData.hourlyForecast}
            observationList={lastGoodData.observationList}
          />
        </div>
      </>
    );
  }

  // Fallback to generic error display if no stale data or if it's a "not found" type error
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 p-4">
      <h2 className="text-2xl font-bold mb-4">Something Went Wrong</h2>
      <p className="text-lg text-center text-gray-700 mb-6">
        {isNotFoundError
          ? error.message
          : "We couldn't load the weather data at this moment. Please try again."}
      </p>
      {process.env.NODE_ENV === "development" &&
        error?.message &&
        !isNotFoundError && (
          <div className="text-sm text-red-600 mt-2 p-2 border border-red-200 bg-red-50 rounded max-w-md text-left">
            <p>
              <strong>Development Error Details:</strong>
            </p>
            <p>Message: {error.message}</p>
            {error.digest && <p>Digest: {error.digest}</p>}
          </div>
        )}
      <button
        onClick={handleRetry}
        className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
      >
        Try Again
      </button>
      <button
        onClick={() => router.push("/")}
        className="mt-3 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition duration-300"
      >
        Go to Homepage
      </button>
    </div>
  );
}
