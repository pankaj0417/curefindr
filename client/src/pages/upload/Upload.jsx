import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import VITE_API from "../../utils/api";

const Upload = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [imagePreview, setImagePreview] = useState({
    chemicalstructure: null,
    modeofaction: null,
  });
  const navigate = useNavigate();

  // Image state
  const [chemicalstructureImage, setChemicalstructureImage] = useState(null);
  const [modeofactionImage, setModeofactionImage] = useState(null);

  const uploadImage = useCallback(
    async (file, type) => {
      if (!file) return;

      setUploadingImage(true);
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch(`${VITE_API}/api/data/upload-image`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Upload failed");
        }

        // Set the URL in form and state
        if (type === "chemicalstructure") {
          setValue("chemicalstructureImage", result.url);
          setImagePreview((prev) => ({
            ...prev,
            chemicalstructure: URL.createObjectURL(file),
          }));
        } else {
          setValue("modeofactionImage", result.url);
          setImagePreview((prev) => ({
            ...prev,
            modeofaction: URL.createObjectURL(file),
          }));
        }

        setSuccessMsg(`Image uploaded: ${result.url}`);
      } catch (error) {
        setErrorMsg(error.message || "Image upload failed");
      } finally {
        setUploadingImage(false);
      }
    },
    [setValue],
  );

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
        setImagePreview({ chemicalstructure: null, modeofaction: null });
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (error) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setErrorMsg(""), 5000);
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
            className="bg-white dark:bg-green-950 rounded-xl shadow-2xl p-6 md:p-8 space-y-6"
          >
            {/* Image Upload Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white border-b pb-2">
                📸 Image Upload
              </h2>

              {/* Chemical Structure Image */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                  Chemical Structure Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setChemicalstructureImage(file);
                    uploadImage(file, "chemicalstructure");
                  }}
                  className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-50 dark:bg-green-900/50 dark:border-gray-600"
                />
                {imagePreview.chemicalstructure && (
                  <div className="mt-2">
                    <img
                      src={imagePreview.chemicalstructure}
                      alt="Preview"
                      className="max-w-xs max-h-48 object-contain rounded-lg shadow-md"
                    />
                    <p className="text-sm text-green-600 mt-1">
                      URL: {watch("chemicalstructureImage")}
                    </p>
                  </div>
                )}
              </div>

              {/* Mode of Action Image */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                  Mechanism of Action *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setModeofactionImage(file);
                    uploadImage(file, "modeofaction");
                  }}
                  className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-50 dark:bg-green-900/50 dark:border-gray-600"
                />
                {imagePreview.modeofaction && (
                  <div className="mt-2">
                    <img
                      src={imagePreview.modeofaction}
                      alt="Preview"
                      className="max-w-xs max-h-48 object-contain rounded-lg shadow-md"
                    />
                    <p className="text-sm text-green-600 mt-1">
                      URL: {watch("modeofactionImage")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="md:col-span-2">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Mechanism of Action *
                </label>
                <textarea
                  {...register("modeofaction", {
                    required: "Mode of action is required",
                  })}
                  className={`${inputClass} h-24`}
                  placeholder="Describe the mechanism of action"
                />
                {errors.modeofaction && (
                  <p className="text-red-500 text-sm">
                    {errors.modeofaction.message}
                  </p>
                )}
              </div>

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

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                   Response Rate *
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

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Clinical Efficacy *
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
