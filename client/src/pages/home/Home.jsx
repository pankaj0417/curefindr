import React from "react";
import Navbar from "../../components/navbar/Navbar.jsx";

const Home = () => {
  return (
    <div id="home">
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center px-6">
        <h1 className="text-6xl font-bold mb-6 text-gray-800  dark:text-white text-center">
          On<span className="text-green-800">c</span>oX
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-xl">
          A smart platform to detect, analyze, and explore anti-cancer FAD data.
        </p>

        <div className="w-full max-w-3xl justify-center items-center bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8 flex flex-col gap-4">
          <div className="w-full bg-white dark:bg-gray-900 ">
            <input
              type="text"
              placeholder="Search anti-cancer data..."
              className=" px-4 py-3 w-full text-white hover:scale-102   border border-gray-700 rounded-xl focus:outline-none focus:ring-2  focus:ring-blue-400 transition-all duration-300"
            />
          </div>
          <button className=" bg-blue-600 hover:bg-blue-700 hover:scale-105 cursor-pointer text-white font-semibold py-3 px-25 rounded-xl transition-all">
              Search
            </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
