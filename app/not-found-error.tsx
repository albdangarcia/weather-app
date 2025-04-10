import Link from 'next/link';
import { JSX } from 'react';

interface NotFoundErrorProps {
  error?: string;
}

/**
 * NotFoundError component: displays a 404 error page with a custom error message
 * @returns {JSX.Element} - the NotFoundError component
 */
const NotFoundError = ({ error }: NotFoundErrorProps): JSX.Element => {
  return (
    <div
      className="bg-[#fae262] text-[#171717] m-0 font-sans h-screen text-center flex flex-col items-center justify-center"
    >
      {/* Inner div containing the error code and message */}
      <div>
        <h1
          className="next-error-h1 inline-block mr-5 pr-5 text-xl font-medium align-top leading-[49px] border-r border-black"
        >
          404
        </h1>
        {/* Error message container */}
        <div className="inline-block">
          {/* Display the custom error message or a default message if none is provided */}
          <h2 className="text-sm font-normal leading-[49px] m-0">
            {error ? error : "This page could not be found."}
          </h2>
        </div>
      </div>
      {/* Link to the home page with styling */}
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
      >
        Home
      </Link>
    </div>
  );
};

export default NotFoundError;