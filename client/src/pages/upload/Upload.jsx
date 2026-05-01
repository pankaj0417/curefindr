import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import VITE_API from "../../utils/api";

const Upload = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await fetch(`${VITE_API}/api/data/createdata`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMsg(result.message || "Failed to upload data");
      } else {
        setSuccessMsg(result.message || "Data uploaded successfully!");
        reset();
        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);
      }
    } catch (error) {
      setErrorMsg("⚠️ Network error. Please try again.");
      console.error("Error uploading data:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }
  };

  const inputClass =
    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white dark:text-white bg-transparent";

  return (
    <div id="upload">
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-green-900 flex flex-col items-center justify-start px-4 py-8">
        <div className="w-full max-w-4xl mt-16">
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Upload Drug Data
          </h1>

          {/* Alerts */}
          {errorMsg && (
            <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 mb-4 rounded text-center">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-3 mb-4 rounded text-center">
              {successMsg}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-green-950 rounded-xl shadow-2xl p-6 md:p-8 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Drug Name */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Drug Name *
                </label>
                <input
                  type="text"
                  {...register("drugname", {
                    required: "Drug name is required",
                  })}
                  className={inputClass}
                  placeholder="Enter drug name"
                />
                {errors.drugname && (
                  <p className="text-red-500 text-sm">
                    {errors.drugname.message}
                  </p>
                )}
              </div>

              {/* API Name */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  API Name *
                </label>
                <input
                  type="text"
                  {...register("apiname", { required: "API name is required" })}
                  className={inputClass}
                  placeholder="Enter API name"
                />
                {errors.apiname && (
                  <p className="text-red-500 text-sm">
                    {errors.apiname.message}
                  </p>
                )}
              </div>

              {/* Group/Class */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Group/Class *
                </label>
                <input
                  type="text"
                  {...register("group", { required: "Group is required" })}
                  className={inputClass}
                  placeholder="Enter drug group/class"
                />
                {errors.group && (
                  <p className="text-red-500 text-sm">{errors.group.message}</p>
                )}
              </div>

              {/* Chemical Structure */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Chemical Structure *
                </label>
                <input
                  type="text"
                  {...register("chemicalstructure", {
                    required: "Chemical structure is required",
                  })}
                  className={inputClass}
                  placeholder="Enter chemical structure"
                />
                {errors.chemicalstructure && (
                  <p className="text-red-500 text-sm">
                    {errors.chemicalstructure.message}
                  </p>
                )}
              </div>

              {/* Mode of Action */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Mode of Action *
                </label>
                <textarea
                  {...register("modeofaction", {
                    required: "Mode of action is required",
                  })}
                  className={`${inputClass} h-24`}
                  placeholder="Describe the mode of action"
                />
                {errors.modeofaction && (
                  <p className="text-red-500 text-sm">
                    {errors.modeofaction.message}
                  </p>
                )}
              </div>

              {/* Use of Drug */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Use of Drug *
                </label>
                <textarea
                  {...register("useofdrug", {
                    required: "Use of drug is required",
                  })}
                  className={`${inputClass} h-24`}
                  placeholder="Describe the use of drug"
                />
                {errors.useofdrug && (
                  <p className="text-red-500 text-sm">
                    {errors.useofdrug.message}
                  </p>
                )}
              </div>

              {/* Toxophore of Drug */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Toxophore of Drug *
                </label>
                <input
                  type="text"
                  {...register("toxoofdrug", {
                    required: "Toxophore is required",
                  })}
                  className={inputClass}
                  placeholder="Enter toxophore"
                />
                {errors.toxoofdrug && (
                  <p className="text-red-500 text-sm">
                    {errors.toxoofdrug.message}
                  </p>
                )}
              </div>

              {/* Type of Toxicity */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Type of Toxicity *
                </label>
                <input
                  type="text"
                  {...register("typeoftoxicity", {
                    required: "Type of toxicity is required",
                  })}
                  className={inputClass}
                  placeholder="Enter type of toxicity"
                />
                {errors.typeoftoxicity && (
                  <p className="text-red-500 text-sm">
                    {errors.typeoftoxicity.message}
                  </p>
                )}
              </div>

              {/* Reason of Toxicity */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Reason of Toxicity *
                </label>
                <textarea
                  {...register("reasonoftoxicity", {
                    required: "Reason of toxicity is required",
                  })}
                  className={`${inputClass} h-24`}
                  placeholder="Explain the reason of toxicity"
                />
                {errors.reasonoftoxicity && (
                  <p className="text-red-500 text-sm">
                    {errors.reasonoftoxicity.message}
                  </p>
                )}
              </div>

              {/* Minimum Concentration */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Minimum Concentration *
                </label>
                <input
                  type="text"
                  {...register("minconcentration", {
                    required: "Minimum concentration is required",
                  })}
                  className={inputClass}
                  placeholder="e.g., 10mg/kg"
                />
                {errors.minconcentration && (
                  <p className="text-red-500 text-sm">
                    {errors.minconcentration.message}
                  </p>
                )}
              </div>

              {/* Success Rate */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Success Rate *
                </label>
                <input
                  type="text"
                  {...register("successrate", {
                    required: "Success rate is required",
                  })}
                  className={inputClass}
                  placeholder="e.g., 85%"
                />
                {errors.successrate && (
                  <p className="text-red-500 text-sm">
                    {errors.successrate.message}
                  </p>
                )}
              </div>

              {/* Current Status */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Current Status *
                </label>
                <input
                  {...register("currentstatus", {
                    required: "Current status is required",
                  })}
                  className={inputClass}
                  placeholder="Enter status"
                />
                  
                
                {errors.currentstatus && (
                  <p className="text-red-500 text-sm">
                    {errors.currentstatus.message}
                  </p>
                )}
              </div>

              {/* ADRs */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Adverse Drug Reactions (ADRs) *
                </label>
                <textarea
                  {...register("adrs", { required: "ADRs is required" })}
                  className={`${inputClass} h-24`}
                  placeholder="List any adverse drug reactions"
                />
                {errors.adrs && (
                  <p className="text-red-500 text-sm">{errors.adrs.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 cursor-pointer ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-800 hover:bg-green-900 shadow-xl hover:shadow-green-600 hover:scale-105"
                }`}
              >
                {loading ? "Uploading..." : "Upload Drug Data"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
