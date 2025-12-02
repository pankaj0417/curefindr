import React from "react";
import Navbar from "../../components/navbar/Navbar.jsx";

const Home = () => {
  return (
    <div id="home">
      <Navbar />
      <div className="min-h-screen  bg-gray-100 dark:bg-green-900 flex flex-col items-center justify-center px-6">
        <h1 className="text-8xl font-bold mb-6 text-gray-800  dark:text-white text-center">
          Onco<span className="text-green-950">X</span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-xl">
          </p>

        <div className="w-full max-w-3xl justify-center items-center bg-white dark:bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-4  shadow-black">
          <div className="w-full flex hover:scale-102 transition-all duration-500 rounded-3xl bg-white dark:bg-green-800 ">
            <input
              type="text"
              placeholder="Search anti-cancer data..."
              className=" px-4 py-3 w-full text-white border border-green-950 rounded-3xl focus:outline-none focus:ring-2  focus:ring-white transition-all duration-300"
            />
          </div>
          <button className=" bg-green-900 shadow-2xl shadow-black   hover:bg-green-950 hover:scale-105 cursor-pointer text-white font-semibold py-3 px-25 rounded-xl transition-all duration-300">
              Search
            </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
