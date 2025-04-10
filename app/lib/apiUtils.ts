const FETCH_TIMEOUT = 15000; // 15 seconds, adjust as needed

export async function handleApiResponse<T>(
  responsePromise: Promise<Response>,
  errorMessage: string,
  timeout: number = FETCH_TIMEOUT
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await responsePromise; // The promise now includes the signal
    clearTimeout(timeoutId); // Clear the timeout if the fetch completes in time

    if (!response.ok) {
      console.error(`${errorMessage}. Status: ${response.status}`);
      throw new Error(`${errorMessage} (Status: ${response.status})`);
    }
    // Check for empty body before parsing JSON
    const text = await response.text();
    if (!text) {
      // Treat an empty body from a successful response as an unexpected situation
      console.warn(`Empty response body received for: ${errorMessage}`);
      throw new Error(
        `${errorMessage} (Received OK status but empty response body)`
      );
    }
    try {
      return JSON.parse(text) as T;
    } catch (parseError) {
      console.error(
        `JSON Parsing Error for ${errorMessage}:`,
        parseError,
        "Response Text:",
        text
      );
      throw new Error(`${errorMessage} (JSON Parsing Failed)`);
    }
  } catch (error: any) {
    clearTimeout(timeoutId); // Ensure timeout is cleared on error too
    if (error.name === "AbortError") {
      console.error(`Workspace timed out for: ${errorMessage}`);
      throw new Error(`Request timed out: ${errorMessage}`);
    }
    // Re-throw other errors (including network errors, parsing errors, status errors)
    console.error(`Workspace error for ${errorMessage}:`, error);
    // Throw the original error or a wrapped one
    throw error instanceof Error
      ? error
      : new Error(`An unexpected error occurred: ${errorMessage}`);
  }
}

// Function to create a timed fetch promise
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
      signal: controller.signal, // Pass the abort signal
    });
    clearTimeout(timeoutId); // Clear timeout if fetch succeeded
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId); // Clear timeout if fetch failed
    if (error.name === "AbortError") {
      console.error(`Workspace timed out for URL: ${url}`);
      throw new Error(`Request timed out fetching ${url}`);
    }
    // Re-throw other network errors
    throw error;
  }
}
