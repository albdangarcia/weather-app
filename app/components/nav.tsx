"use client";
import { useState } from "react";
import { openSans } from "../fonts/fonts";
import { cities } from "../lib/constants";

const Nav = () => {
    
    // State to show/hide navigation bar
    const [isNavOpen, setIsNavOpen] = useState(false);

    // State to store the search query
    const [searchQuery, setSearchQuery] = useState("");

    // Function to toggle show/hide navigation bar
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    // Function to handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // Filtered cities based on search query
    const filteredCities = cities.filter(city =>
        city.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                className={`fixed z-20 top-0 left-0 bg-black pt-16 px-7 w-96 h-full ${
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
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* city list */}
                <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                    <ul className="space-y-5">
                        {filteredCities.map((city) => (
                            <li
                                key={city.city}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-4">
                                    <span className="bg-[#FAE262] w-[3px] h-10 rounded-sm" />
                                    <a href={`?latitude=${city.lat}&longitude=${city.long}`} className="text-gray-200 text-sm font-semibold">
                                        {city.city}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Nav;