"use client";
import { useState } from "react";
import { openSans } from "../fonts/fonts";

const Nav = () => {
    const cities = [
        { city: "New York, NY", lat: 40.7128, long: -74.006 },
        { city: "Los Angeles, CA", lat: 34.0522, long: -118.2437 },
        { city: "Chicago, IL", lat: 41.8781, long: -87.6298 },
        { city: "Houston, TX", lat: 29.7604, long: -95.3698 },
        { city: "Phoenix, AZ", lat: 33.4484, long: -112.074 },
        { city: "Philadelphia, PA", lat: 39.9526, long: -75.1652 },
        { city: "San Antonio, TX", lat: 29.4241, long: -98.4936 },
        { city: "San Diego, CA", lat: 32.7157, long: -117.1611 },
        { city: "Dallas, TX", lat: 32.7767, long: -96.797 },
        { city: "San Jose, CA", lat: 37.3382, long: -121.8863 },
        { city: "Austin, TX", lat: 30.2672, long: -97.7431 },
        { city: "Jacksonville, FL", lat: 30.3322, long: -81.6557 },
        { city: "Fort Worth, TX", lat: 32.7555, long: -97.3308 },
        { city: "Columbus, OH", lat: 39.9612, long: -82.9988 },
        { city: "Charlotte, NC", lat: 35.2271, long: -80.8431 },
        { city: "San Francisco, CA", lat: 37.7749, long: -122.4194 },
        { city: "Indianapolis, IN", lat: 39.7684, long: -86.1581 },
        { city: "Seattle, WA", lat: 47.6062, long: -122.3321 },
        { city: "Denver, CO", lat: 39.7392, long: -104.9903 },
        { city: "Washington, DC", lat: 38.9072, long: -77.0369 },
    ];
    // State to show/hide navigation bar
    const [isNavOpen, setIsNavOpen] = useState(false);

    // Function to toggle show/hide navigation bar
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div className="relative">
            {/* bars icon */}
            <button onClick={toggleNav}>
                <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-10 absolute top-3 left-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </button>

            {/* navigation bar */}
            <div
                className={`fixed z-10 top-0 left-0 bg-black pt-16 px-7 w-96 h-full ${
                    openSans.className
                } ${
                    isNavOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out `}
            >
                {/* close icon */}
                <button onClick={toggleNav}>
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        className="size-6 absolute top-3 right-4 stroke-gray-500 hover:stroke-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* search bar */}
                <div>
                    <input
                        type="text"
                        id="search-location-code"
                        name="searchLocationCode"
                        className="bg-[#212121] mb-7 text-gray-300 rounded-sm w-full text-sm placeholder:text-gray-600 h-8 px-2 py-4 border border-[#3A3A3A] focus:border-gray-600 focus:outline-none"
                        placeholder="Search Location"
                    />
                </div>

                {/* city list */}
                <div className="">
                    <ul className="space-y-5">
                        {cities.map((city) => (
                            <li
                                key={city.city}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-4">
                                    <span className="bg-[#FAE262] w-[3px] h-10 rounded-sm" />
                                    <a href={`?lat=${city.lat}&lon=${city.long}`} className="text-gray-200 text-sm font-semibold">
                                        {city.city}
                                    </a>
                                </div>
                                {/* remove city icon */}
                                <button className="bg-gray-800 w-8 rounded-sm hover:bg-red-500">
                                    <svg
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="#FFF"
                                        className="size-6 mx-auto"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8 12h8"
                                        />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Nav;
