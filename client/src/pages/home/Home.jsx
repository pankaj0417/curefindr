import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import VITE_API from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Fetch data from backend
  const fetchData = async (query = "") => {
    setLoading(true);
    setError("");
    try {
      const endpoint = query
        ? `${VITE_API}/api/data/search?query=${encodeURIComponent(query)}`
        : `${VITE_API}/api/data/alldata`;

      const res = await fetch(endpoint, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Failed to fetch data");
      } else {
        setData(result.data || []);
      }
    } catch (err) {
      setError("⚠️ Network error. Please try again.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input: navigate to Contant page with query
  const handleSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    // If there's no query, do nothing
    if (!searchQuery || searchQuery.trim().length === 0) return;
    // Navigate to the Contant page and include the query as a URL param
    navigate(`/contant?query=${encodeURIComponent(searchQuery.trim())}`);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Fetch suggestions while typing
    if (value.trim().length > 0) {
      fetchSuggestions(value);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Fetch suggestions from backend
  const fetchSuggestions = async (query) => {
    try {
      const endpoint = `${VITE_API}/api/data/search?query=${encodeURIComponent(
        query
      )}`;
      const res = await fetch(endpoint, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (res.ok && result.data) {
        // Extract unique drug names for suggestions (limit to 5)
        const uniqueDrugs = [
          ...new Set(result.data.map((drug) => drug.drugname)),
        ];
        setSuggestions(uniqueDrugs.slice(0, 2));
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div id="home">
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-green-900 flex flex-col items-center justify-center px-6 py-8">
        <h1 className="text-8xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Onco<span className="text-green-950">X</span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-xl">
          Search and discover anti-cancer drug data
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-3xl justify-center items-center bg-white dark:bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-4 shadow-black mb-8"
        >
          <div className="w-full relative">
            <div className="w-full flex hover:scale-102 transition-all duration-500 rounded-3xl bg-white dark:bg-green-800">
              <input
                type="text"
                placeholder="Search anti-cancer data..."
                value={searchQuery}
                onChange={handleInputChange}
                className="px-4 py-3 w-full text-white border border-green-950 rounded-3xl focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 bg-transparent"
              />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-green-900 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-3 cursor-pointer hover:bg-green-100 dark:hover:bg-green-700 text-gray-800 dark:text-white transition-colors duration-150 border-b dark:border-gray-700 last:border-b-0"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-800 hover:bg-green-900 shadow-xl hover:shadow-green-950 hover:scale-105 cursor-pointer text-white font-semibold py-3 px-25 rounded-xl transition-all duration-300"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="w-full max-w-6xl bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
