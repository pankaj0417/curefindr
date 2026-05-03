import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import VITE_API, { uploadImage } from "../../utils/api";
import { useNavigate } from "react-router-dom";
const AUTHORIZED_EMAIL = "pankaj0172004@gmail.com";

const Contant = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingChem, setUploadingChem] = useState(null);
  const [uploadingMode, setUploadingMode] = useState(null);
  const navigate = useNavigate();

  // Check auth
  const user = localStorage.getItem("user");
  const isAuthorized = user && JSON.parse(user).email === AUTHORIZED_EMAIL;

  useEffect(() => {
    if (query && query.trim().length > 0) {
      fetchData(query);
    }
  }, [query]);

  const fetchData = async (q) => {
    setLoading(true);
    setError("");
    try {
      const endpoint = `${VITE_API}/api/data/search?query=${encodeURIComponent(
        q,
      )}`;
      const res = await fetch(endpoint, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.message || "Failed to fetch data");
        setData([]);
      } else {
        setData(result.data || []);
      }
    } catch (err) {
      setError("⚠️ Network error. Please try again.");
      console.error("Error fetching data in Contant:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contant">
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-green-900 flex flex-col items-center justify-start px-6 py-8">
        <div className="w-full max-w-5xl mt-5 ">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-2xl text-center md:text-4xl mt-12 font-bold text-gray-800 dark:text-white">
              Search Results
            </h1>
          </div>

          {!query ? (
            <div className="text-center text-gray-800 dark:text-white">
              No search query provided. Go back and enter a drug name.
            </div>
          ) : loading ? (
            <div className="text-center text-gray-800 dark:text-white">
              Loading results...
            </div>
          ) : error ? (
            <div className="w-full text-red-700 dark:text-red-700 p-4 rounded-lg mb-6 text-center">
              {error}
            </div>
          ) : data.length > 0 ? (
            <div className="space-y-6">
              {data.map((drug, index) => (
                <div
                  key={drug._id || index}
                  className="bg-white dark:bg-white rounded-lg shadow-lg p-6 hover:shadow-black hover:shadow-2xl transition-all duration-200 "
                >
                  <h2 className="text-4xl underline font-bold text-green-900 dark:text-green-700 mb-6">
                    {drug.drugname}
                  </h2>
                  <div className="space-y-3 text-justify md:mx-18  text-lg text-gray-700 dark:text-black">
                    <div id="apiname">
                      <span className="font-semibold text-green-900 dark:text-green-400">
                        API Name:
                      </span>{" "}
                      {drug.apiname}
                      <hr className="text-gray-300" />
                    </div>
                    <div id="group">
                      <span className="font-semibold text-green-900 dark:text-green-400">
                        Group/class:
                      </span>{" "}
                      {drug.group}
                      <hr className="text-gray-300" />
                    </div>
                    <div id="chemicalstructure">
                      <span className="font-semibold text-green-900 dark:text-green-400">
                        Chemical Structure:
                      </span>{" "}
                      {drug.chemicalstructure}
                      {drug.chemicalstructureImage && (
                        <div className="flex justify-center items-center">
                        <img
                          src={`${VITE_API}${drug.chemicalstructureImage}`}
                          alt="Chem Structure"
                          className="my-2 max-w-xs  rounded shadow"
                        /></div>
                      )}
                      <hr className="text-gray-300" />
                    </div>
                    <div id="modeofaction">
                      <span className="font-semibold text-green-900 dark:text-green-400">
                        Mechanism of action:
                      </span>{" "}
                      {drug.modeofaction}
                      {drug.modeofactionImage && (
                        <div className="flex justify-center items-center" >
                        <img
                          src={`${VITE_API}${drug.modeofactionImage}`}
                          alt="Mode of Action"
                          className="my-2 max-w-xs  rounded shadow"
                        />
                        </div>
                      )}
                      <hr className="text-gray-300" />
                    </div>
                    <p id="useofdrug">
                      <span className="font-semibold text-green-900 dark:text-green-400">
                        Use of Drug:
                      </span>{" "}
                      {drug.useofdrug}
                      <hr className="text-gray-300" />
                    </p>
                    <p id="toxoofdrug">
                      <span className="font-semibold text-green-900 dark:text-green-400">
                        Toxophore of Drug:
                      </span>{" "}
                      {drug.toxoofdrug}
                      <hr className="text-gray-300" />
                    </p>
                    <p id="typeoftoxicity">
                      <span className="font-semibold text-green-900 dark:text-green-400">
                        Type of Toxicity:
                      </span>{" "}
                      {drug.typeoftoxicity}
                      <hr className="text-gray-300" />
                    </p>
                    <p id="reasonoftoxicity">
                      <span className="font-semibold text-green-900 dark:text-green-400">
                        Reason of Toxicity:
                      </span>{" "}
                      {drug.reasonoftoxicity}
                      <hr className="text-gray-300" />
                    </p>
                    <p id="minconcentration">
                      <span className="font-semibold text-green-900 dark:text-green-400">
                        Minimum Concentration:
                      </span>{" "}
                      {drug.minconcentration}
                      <hr className="text-gray-300" />
                    </p>
                    <p id="successrate">
                      <span className="font-semibold text-green-900 dark:text-green-400">
                        Response Rate:
                      </span>{" "}
                      {drug.successrate}
                      <hr className="text-gray-300" />
                    </p>
                    <p id="currentstatus">
                      <span className="font-semibold text-green-900 dark:text-green-400">
                        Clinical Efficacy:
                      </span>{" "}
                      {drug.currentstatus}
                      <hr className="text-gray-300" />
                    </p>
                    <p id="adrs">
                      <span className="font-semibold text-green-900 dark:text-green-400">
                        Adverse Drug Reactions (ADRs):
                      </span>{" "}
                      {drug.adrs}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-800 dark:text-white">
              No results found for "{query}".
            </div>
          )}
        </div>
        <div>
          <Link to="/home" className="mt-8 flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-white hover:text-green-600 text-white font-bold py-2 px-4 rounded-full shadow-xl hover:shadow-black cursor-pointer transition-all duration-600"
            >
              {" "}
              Back to Search
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contant;
