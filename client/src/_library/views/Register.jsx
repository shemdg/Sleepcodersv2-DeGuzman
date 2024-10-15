import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../screen/common/Navbar";
import ReCAPTCHA from "react-google-recaptcha"; // Ensure you have this installed
import { CgDanger } from "react-icons/cg"; // Remove if not used
import { Link } from 'react-router-dom';


import Encrypt from "../util/Encrypt";

import axios from "../api/axios";

const Register = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [postLogin, setPostLogin] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });
  const [spinner, setSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [capEval, setCapEval] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPostLogin((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true); // Show the spinner

    // Check for null values
    if (
      !postLogin.username ||
      !postLogin.password ||
      !postLogin.email ||
      !postLogin.name
    ) {
      alert("All fields are required."); // Display alert for empty fields
      setSpinner(false);
      return;
    }

    try {
      // Log the postLogin data before encryption
      console.log("Post login data before encryption:", postLogin);

      // Encrypt each field individually
      const encryptedUsername = Encrypt(postLogin.username);
      const encryptedPassword = Encrypt(postLogin.password);
      const encryptedEmail = Encrypt(postLogin.email);
      const encryptedName = Encrypt(postLogin.name);

      // Send the encrypted data to the server
      const response = await axios.post("/register", {
        username: encryptedUsername,
        password: encryptedPassword,
        email: encryptedEmail,
        name: encryptedName,
      });

      // Handle the server response
      console.log(response.data);
      alert("User registered successfully!"); // Display success message
    } catch (error) {
      setErrorMessage("An error occurred while registering.");
      console.error("Error during registration:", error);

      // Check if error response is available
      if (error.response) {
        const message = error.response.data.message; // Get error message from server
        if (message) {
          alert(message); // Display alert box for specific error
        } else {
          alert("An error occurred while registering."); // Fallback message
        }
      } else {
        alert("An error occurred while registering."); // Fallback for no response
      }
    } finally {
      setSpinner(false); // Hide the spinner
    }
  };


  
  return (
    <div className="w-full max-w-[1400px] mx-auto h-screen justify-center relative">
      <div className="bg-[#FFFEFE] w-[90%] md:w-[70%] mt-10 rounded-md shadow-2xl mx-auto font-bold tracking-[1px]">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-5">
          <div className="md:col-span-2 p-8">
            <div className="img mt-1 text-center">
              <img
                src="../logo_image/bini.png"
                className="object-cover h-24 w-24 mx-auto"
                alt="BINI"
              />
            </div>

            <div className="text-center">
              <h3 className="text-[#D91656] text-[22px]">Sign-Up</h3>
              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="relative mt-4">
                    <input
                      type="text"
                      id="username"
                      required
                      className="block w-full px-5 pt-5 pb-2 bg-[#F8F9F9] text-gray-900 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[black] peer placeholder-transparent"
                      placeholder="Username"
                      value={postLogin.username}
                      onChange={handleChange}
                    />

                    <label
                      htmlFor="username"
                      className="absolute text-[12px] left-4 top-[3px] text-gray-500 transition-all duration-200 transform scale-100 origin-[0] peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-[4px] peer-focus:scale-75 peer-focus:text-black"
                    >
                      Username
                    </label>
                  </div>
                  <div className="relative mt-4">
                    <input
                      type="password"
                      id="password"
                      required
                      className="block w-full px-5 pt-5 pb-2 bg-[#F8F9F9] text-gray-900 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[black] peer placeholder-transparent"
                      placeholder="Password"
                      value={postLogin.password}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="password"
                      className="absolute text-[12px] left-4 top-[3px] text-gray-500 transition-all duration-200 transform scale-100 origin-[0] peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-[4px] peer-focus:scale-75 peer-focus:text-black"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative mt-6">
                    <input
                      type="email" // Corrected type
                      id="email" // Corrected id
                      required
                      className="block w-full px-5 pt-5 pb-2 bg-[#F8F9F9] text-gray-900 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[black] peer placeholder-transparent"
                      placeholder="Email" // Corrected placeholder
                      value={postLogin.email}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="password"
                      className="absolute text-[12px] left-4 top-[3px] text-gray-500 transition-all duration-200 transform scale-100 origin-[0] peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-[4px] peer-focus:scale-75 peer-focus:text-black"
                    >
                      Email
                    </label>
                  </div>
                  <div className="relative mt-6">
                    <input
                      type="text" // Corrected type
                      id="name" // Corrected id
                      required
                      className="block w-full px-5 pt-5 pb-2 bg-[#F8F9F9] text-gray-900 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[black] peer placeholder-transparent"
                      placeholder="Name" // Corrected placeholder
                      value={postLogin.name}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="password"
                      className="absolute text-[12px] left-4 top-[3px] text-gray-500 transition-all duration-200 transform scale-100 origin-[0] peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-[4px] peer-focus:scale-75 peer-focus:text-black"
                    >
                      Name
                    </label>
                  </div>
                  <div className="items-center mx-10">
                    <ReCAPTCHA
                      sitekey={import.meta.env.VITE_CAPTCHA_KEY}
                      onChange={(value) => setCapEval(!!value)}
                      className=""
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D91656] text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition duration-300"
                  disabled={!capEval || spinner} // Disable if CAPTCHA is not evaluated or if the spinner is active
                >
                  {spinner ? "Loading..." : "Register"}
                </button>
              </form>

              <p className="text-gray-600 text-[10px] my-3 hover:underline cursor-pointer">
                <Link to="/" className="text-gray-600 hover:underline">
                  Already have an Account?
                </Link>
              </p>
            </div>
          </div>

          <div
            className="md:col-span-2 bg-no-repeat bg-cover relative rounded-r-md w-full h-auto"
            style={{
              backgroundImage: `url(../logo_image/vlcsnap-2024-10-07-10h05m10s678.png)`,
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;