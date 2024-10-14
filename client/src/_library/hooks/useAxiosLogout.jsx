import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from "../api/axios";
import Cookies from "js-cookie";

const useAxiosLogout = (shouldLogout) => {
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");

    // If we need to log out and sessionId exists
    if (shouldLogout && sessionId) {
      const handleLogout = async () => {
        try {
          const response = await axios.post("/logout", {
            sessionId: sessionId, // Send sessionId to server
          });

          if (response.status === 200) {
            // Logout successful, remove the session cookie
            Cookies.remove("sessionId");
            console.log("Session destroyed successfully.");

            // Navigate to the /login page
            navigate('/');
          } else {
            console.error("Failed to logout: ", response.data.message);
          }
        } catch (error) {
          console.error("Error during logout:", error);
        }
      };

      handleLogout();
    }
  }, [shouldLogout, navigate]); // Add navigate as a dependency
};

export default useAxiosLogout;
