import React, { useEffect, useState } from "react";
import axios from "axios";

const GETIPTEST = () => {
  const [ip, setIp] = useState("");
  const browserInfo = navigator.userAgent; // Client-side browser info

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIp(response.data.ip); // Get public IP address
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIP();
  }, []);

  return (
    <div>
      <div>Your IP address is: {ip}</div>
      <div>Your browser information: {browserInfo}</div>
    </div>
  );
};

export default GETIPTEST;
