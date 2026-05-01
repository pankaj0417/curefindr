import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Upload from "../../pages/upload/Upload.jsx";

const AUTHORIZED_EMAIL = "pankaj0172004@gmail.com";

const ProtectedUpload = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and has the authorized email
    const userStr = localStorage.getItem("user");

    if (!userStr) {
      // No user logged in, redirect to login
      navigate("/");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (user.email === AUTHORIZED_EMAIL) {
        setIsAuthorized(true);
      } else {
        // User logged in but not authorized
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/");
    }

    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-green-900">
        <div className="text-gray-800 dark:text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-green-900 px-4">
        <div className="bg-white dark:bg-green-950 p-8 rounded-xl shadow-2xl text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You don't have permission to access this page.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Only users with email{" "}
            <span className="font-semibold">{AUTHORIZED_EMAIL}</span> can access
            the upload page.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="mt-6 px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return <Upload />;
};

export default ProtectedUpload;
