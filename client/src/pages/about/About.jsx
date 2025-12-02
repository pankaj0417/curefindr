import React from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import { useState, useEffect } from "react";
import sarythak_img from "../../assets/sarthak.jpeg";
import pankaj_img from "../../assets/profile_img_front.png";
import ashish_img from "../../assets/ashish rana.jpeg";

const people = [
  {
    name: "Sarthak Chauhan",
    role: "Lead Researcher",
    bio: "Focuses on FAD-based anti-cancer mechanisms and experimental design.",
    img: sarythak_img,
  },
  {
    name: "Pankaj",
    role: "Full Stack Developer",
    bio: "Builds interactive React dashboards and visualizations for research data. Integrates ML services, builds APIs, and maintains data pipelines.",
    img: pankaj_img,
  },
  {
    name: "Ashish Rana",
    role: "Core Team member",
    bio: "Develops prediction models and performs statistical analysis on FAD datasets.",
    img: ashish_img,
  },
  {
    name: "Rohit Sharma",
    role: "Backend Engineer",
    bio: "Integrates ML services, builds APIs, and maintains data pipelines.",
    img: "https://via.placeholder.com/240",
  },
];
function About() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // optional: autoplay the carousel every 6s
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % people.length);
    }, 100000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + people.length) % people.length);
  const next = () => setIndex((i) => (i + 1) % people.length);
  const goTo = (i) => setIndex(i);

  return (
    <div id="about">
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-green-900 flex">
        <div className="flex-1 px-6 pt-20 w-full flex flex-col items-center">
          <h1 className="text-6xl font-bold dark:text-white text-gray-800 my-6 text-center">
            About Us
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-10">
            Meet the core team behind{" "}
            <span className="font-semibold text-green-500">OncoX</span>,
            working together on research, development, and innovation in
            anti-cancer FAD analysis.
          </p>

          {/* Carousel */}
          <div className="w-full max-w-5xl  relative">
            {/* Slides */}
            <div className="overflow-hidden rounded-2xl shadow-lg dark:bg-green-950 shadow-black  bg-white">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {people.map((p, i) => (
                  <div
                    key={i}
                    className="w-full shrink-0 p-10 flex mt-4 flex-col items-center text-center"
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-46 h-46 rounded-full mb-6 object-cover object-center"
                    />
                    <h2 className="text-3xl font-semibold dark:text-white text-gray-800">
                      {p.name}
                    </h2>
                    <p className="text-base text-green-400 font-medium">
                      {p.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-xl text-lg">
                      {p.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 dark:bg-green-900 bg-white backdrop-blur-sm shadow-md shadow-black rounded-full pb-3  text-gray-800 dark:text-white text-5xl  w-12 h-12 flex items-center justify-center cursor-pointer"
              aria-label="Previous"
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 dark:bg-green-900 bg-white backdrop-blur-sm shadow-md shadow-black rounded-full pb-3  text-gray-800 dark:text-white text-5xl  w-12 h-12 flex items-center justify-center cursor-pointer"
              aria-label="Next"
            >
              ›
            </button>

            {/* Indicators */}
            <div className="mt-4 flex items-center justify-center gap-3">
              {people.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-3 h-3 rounded-full ${
                    i === index ? "bg-green-400" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
