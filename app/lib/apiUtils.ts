const FETCH_TIMEOUT = 15000; // 15 seconds

export async function handleApiResponse<T>(
  response: Response, // Accepts the Response object directly
  errorMessage: string
): Promise<T> {
  try {
    // 1. Check if the response status is OK (already done by fetchWithTimeout implicitly, but good practice)
    if (!response.ok) {
      console.error(`${errorMessage}. Status: ${response.status} ${response.statusText}`);
      throw new Error(`${errorMessage} (Status: ${response.status} ${response.statusText})`);
    }

    // 2. Check for empty body before parsing JSON
    const text = await response.text();
    if (!text) {
      console.warn(`Empty response body received for: ${errorMessage}`);
      throw new Error(`${errorMessage} (Received OK status but empty response body)`);
    }

    // 3. Try to parse JSON
    try {
      return JSON.parse(text) as T;
    } catch (parseError: unknown) {
      console.error(
        `JSON Parsing Error for ${errorMessage}:`,
        parseError,
        // Log only a snippet of potentially large text
        "Response Text Snippet:",
        text.substring(0, 100) + (text.length > 100 ? '...' : '')
      );
      throw new Error(`${errorMessage} (JSON Parsing Failed)`);
    }
  } catch (error: unknown) {
    // Log and re-throw, ensuring it's an Error object
    if (error instanceof Error) {
      // Log the specific error encountered during response processing
      console.error(`Response handling error for ${errorMessage}:`, error.message);
      throw error; // Re-throw the original error
    } else {
      // Handle rare cases where non-Error was thrown
      console.error(
        `An unexpected non-error value was thrown during response handling for ${errorMessage}:`,
        error
      );
      throw new Error(
        `An unexpected error occurred during response handling: ${errorMessage} (Value: ${String(error)})`
      );
    }
  }
}

// *** fetchWithTimeout remains the same - IT IS CORRECT ***
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = FETCH_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    console.log(`Aborting fetch for ${url} due to timeout.`);
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId); // Clear timeout if fetch succeeds
    return response;
  } catch (error: unknown) {
    clearTimeout(timeoutId); // Important: clear timeout even on error

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        // Use a consistent error message source if desired
        console.error(`Workspace timed out for URL: ${url}`);
        throw new Error(`Request timed out fetching ${url}`);
      }
      console.error(`Workspace failed for URL ${url}:`, error.message);
      throw error;
    } else {
      console.error(
        `An unexpected non-error value was thrown during fetch for ${url}:`,
        error
      );
      throw new Error(
        `An unexpected error occurred during fetch for ${url}: ${String(error)}`
      );
    }
  }
}