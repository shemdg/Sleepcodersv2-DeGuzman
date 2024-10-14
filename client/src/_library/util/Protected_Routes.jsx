import { Outlet, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";

const Protected_Routes = () => {
  const [isValidSession, setIsValidSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateSession = async () => {
      const sessionId = Cookies.get("sessionId");
      if (!sessionId) {
        // No sessionId found, consider it as invalid session
        setIsValidSession(false);
        setLoading(false);
        return;
      }

      try {
        // Send sessionId in the request body
        const response = await axios.post("/session-check", { sessionId });

        if (response.status === 200) {
          // Session is valid, keep it alive
          setIsValidSession(true);
        } else {
          // Session is invalid or expired, delete the cookie
          setIsValidSession(false);
          Cookies.remove("sessionId");
        }
      } catch (error) {
        console.error("Session validation error:", error);
        // In case of an error, also remove the cookie
        setIsValidSession(false);
        setError("Failed to validate session.");
        Cookies.remove("sessionId");
      } finally {
        // Add a 1.5 seconds delay before setting loading to false
        setTimeout(() => {
          setLoading(false); // Set loading to false after the delay
        }, 1500);
      }
    };

    validateSession();
  }, []);

  if (loading) {
    // Show loading state while checking session validity
    return (
      <div className="bg-[#FAE7F4] h-screen relative">
        <div style={styles.progressBarContainer} className="animate-loading">
          <div style={styles.progressBar} />
        </div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <img
            src="../logo_image/bini.png"
            alt="Top Top Logo"
            className=" max-w-full h-auto z-20"
          />
        </div>
      </div>
    );
  }

  if (error) {
    // Show error state if there was an error during validation
    return <Navigate to="/" />;
  }

  return isValidSession ? <Outlet /> : <Navigate to="/" />;
};
const styles = {
  progressBarContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "4px",
    backgroundColor: "#FF98A2",
    zIndex: 1000,
  },
  progressBar: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FF98A2",
    animation: "loading 2s infinite",
  },
};
export default Protected_Routes;
