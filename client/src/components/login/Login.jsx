import React, { useState, useContext } from "react";
import { data, Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";


const Login = () => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const Navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMsg(result.message || "login failed");
      } else {
        setSuccessMsg(result.message || "login successfull");
        reset();
        setTimeout(() => {
          Navigate("/home");
        }, 1500);
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
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4 "
    >
     
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition duration-300">
        {/* alert */}
        {errorMsg && (
          <p className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 mb-4 rounded text-center">
            {errorMsg}
          </p>
        )}
        {successMsg && (
          <p className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-3 mb-4 rounded text-center">
            {successMsg}
          </p>
        )}

        {/* title */}
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Login
        </h1>

        {/* username */}

        <div className="">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "invali email address",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* password */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "password is required",
                minLength: { value: 8, message: "Minimum 8 characters " },
                maxLength: { value: 16, message: "maximum 16 characters" },
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
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-md"
            }`}
          >
            {loading ? "Loging in ..." : "Login"}
          </button>

          {/* Footer */}
          <p className="text-gray-600 dark:text-gray-400 mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
