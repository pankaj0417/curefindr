import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import API from "../../utils/api.js";

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onsubmit = async (data) => {
    
    setLoading(true);
    
    try {
      const res = await fetch(`${API}/api/user/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMsg(result.message || "Signup failed");
      } else {
        setSuccessMsg(result.message || "Signup successful!");
        reset();
        setTimeout(() => {
          navigate("/"); // Redirect to login page
        }, 1500); // Wait 1.5s to show success message
      }
    } catch (error) {
      setErrorMsg("⚠️ Network error. Please try again.");
      console.error("error in signup", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setErrorMsg("");
        setSuccessMsg("");
      }, 5000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4"
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition duration-300">
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

        {/* Title */}
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Sign Up
        </h1>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            {...register("username", {
              required: "Username is required",
              maxLength: { value: 20, message: "Max 20 characters" },
              minLength: { value: 3, message: "Min 3 characters" },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              }
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
              maxLength: { value: 16, message: "Maximum 16 characters" },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          disabled={loading}
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 cursor-pointer ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {/* Footer */}
        <p className="text-gray-600 dark:text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
