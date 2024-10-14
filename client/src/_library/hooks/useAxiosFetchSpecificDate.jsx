import { useState, useEffect } from "react";
import axios from "../api/axios";
// Import the Decrypt function
import Decrypt from "../util/Decrypt";

const useAxiosFetchSpecificDate = (date) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null); // Reset error before fetch

      try {
        const response = await axios.post("/event/specific-date", { date });
        console.log("Encrypted data received:", response.data); // Log the encrypted data

        // Ensure that you are decrypting the correct property (response.data.data)
        if (response.data && response.data.data) {
          // Decrypt the response data using the Decrypt function
          const decryptedData = Decrypt(response.data.data);

          // Check if decryption was successful
          if (decryptedData) {
            console.log("Decrypted data:", decryptedData);
            const parsedData = JSON.parse(decryptedData);
            console.log("Type of parsedData:", typeof parsedData);
            if (Array.isArray(parsedData)) {
              console.log("parsedData is an array");
              setData(parsedData); // Set the parsed array directly
            } else {
              console.log("parsedData is not an array");
              setData([parsedData]); // Wrap the object in an array if it's not already an array
            }
          } else {
            console.error("Decryption failed. Decrypted data is empty.");
          }
        } else {
          console.error("No data found to decrypt in the response.");
        }
      } catch (err) {
        console.error("Error fetching or decrypting events:", err);
        setError(err.message); // Set error message
      } finally {
        // Add a 2-second delay before setting loading to false
        setTimeout(() => {
          setLoading(false); // Set loading to false after fetch
        }, 1200);
      }
    };

    if (date) {
      fetchEvents();
    }
  }, [date]); // Dependency array to trigger effect on date change

  return { data, error, loading };
};

export default useAxiosFetchSpecificDate;
