import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CgDanger } from "react-icons/cg";
import { Spinner } from "flowbite-react";

import axios from "../api/axios";

import Cookies from "js-cookie";

import Encrypt from "../util/Encrypt";

import ReCAPTCHA from "react-google-recaptcha";

import moment from "moment";
import { Link } from "react-router-dom";

const Bini_home = () => {
  const [postLogin, setPostLogin] = useState({ username: "", password: "" });
  const [attemptCount, setAttemptCount] = useState(null);
  const [form1Spinner, setForm1Spinner] = useState(false);

  const [ip, setIp] = useState("");
  const browserInfo = navigator.userAgent; // Client-side browser info

  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const [timeRestriction, setTimeRestriction] = useState(null);
  const [countdown, setCountdown] = useState(0);

  const [capEval, setCapEval] = useState(false);

  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);

  const [stepform, setStepForm] = useState(1);

  // Handle OTP input change
  const handleChangeOtp = (e) => {
    setOtpCode(e.target.value);
  };

  const navigate = useNavigate();

  const handleCreateAccountClick = () => {
    navigate("/Register");
  };
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIp(response.data.ip); // Get public IP address
      } catch (error) {
        
      }
    };

    fetchIP();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm1Spinner(true);

    setTimeout(async () => {
     

      const encryptedUsername = Encrypt(postLogin.username);
      const encryptedPassword = Encrypt(postLogin.password);

      try {
        const response = await axios.post("/login", {
          username: encryptedUsername,
          password: encryptedPassword,
          ip,
          browserInfo,
        });

        
        const { sessionId } = response.data;
        Cookies.set("sessionId", sessionId, {
          expires: 1,
          sameSite: "None",
          secure: true,
        });

        navigate("/calendar");
      } catch (error) {
        

        if (error.response) {
          if (error.response.status === 401) {
            setErrorMessage("Invalid username or password.");
            setAttemptCount(error.response.data.attemptCount); // Handle attempt count on 401
          } else if (error.response.status === 403) {
            const errorMessage = error.response.data.message;
            setErrorMessage(errorMessage);
            setAttemptCount(error.response.data.attemptCount); // Handle attempt count on 403

            if (
              errorMessage ===
              "Login attempt from a different location. Please verify your identity with the OTP."
            ) {
              setStepForm(2);
            }
          } else if (error.response.status === 500) {
            setErrorMessage("The server is down. Please try again later.");
          }
        } else {
          setErrorMessage(
            "Unable to connect to the server. Please check your internet connection."
          );
        }

        if (error.response?.data?.restrictionTime) {
          const restrictionTime = moment(error.response.data.restrictionTime);
          const duration = restrictionTime.diff(moment(), "seconds");
          setCountdown(duration > 0 ? duration : 0);
          setTimeRestriction(restrictionTime);
          startCountdown(duration);
        }
      } finally {
        setForm1Spinner(false);
      }
    }, 1000);
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    

    setOtpLoading(true);
setTimeout(async () => {
      try {
        
        const encryptedOTP = Encrypt(otpCode);
        const encryptedIP = Encrypt(ip);
        const encryptedBrowserInfo = Encrypt(navigator.userAgent);
        
        const response = await axios.post("/verify-otp", {
          otp: encryptedOTP,
          ip: encryptedIP,
          browserInfo: encryptedBrowserInfo,
        });
        

        if (
          response.status === 200 &&
          response.data.message === "OTP verification successful"
        ) {
          

          
          const { sessionId } = response.data;
          console.log("Session ID:", sessionId); 
          Cookies.set("sessionId", sessionId, {
            expires: 1,
            sameSite: "None",
            secure: true,
          });

          navigate("/calendar"); 
          console.log("Cookie set. Current cookies:", document.cookie);

          console.log("Attempting navigation to /calendar");
          console.log("Navigation function called");
        } else {
          console.log("OTP verification failed:", response.data.message);
          setOtpError(response.data.message);
        }
      } catch (error) {
        console.error(
          "Error verifying OTP:",
          error.response?.data || error.message
        );
        setOtpError("OTP verification failed");
      } finally {
        setOtpLoading(false);
        
      }
    }, 1000); // 1-second delay
  };

  const startCountdown = (duration) => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <>
      <div className=" w-full max-w-[1400px] mx-auto h-screen justify-center relative ]">
        <div class="bg-[#FFFEFE] w-[90%] md:w-[70%] mt-10 mb-10 rounded-md shadow-2xl mx-auto  font-bold tracking-[1px]">
          <div class="grid grid-cols-1 md:grid-cols-3 mt-5 ">
            <div class="md:col-span-1 p-8 ">
              <div class="img mt-1 text-center">
                <img
                  src="../logo_image/bini.png"
                  class="object-cover h-36 w-24 mx-auto"
                  alt="BINI"
                />
              </div>

              <div class="text-center">
                <h3 class="text-[#D91656] text-[22px]">Sign-in</h3>{" "}
                
                {timeRestriction && countdown > 0 && (
                  <div className="text-white rounded-lg p-4 border-l-4 border-red-800 bg-red-400 shadow-lg transition-transform transform hover:scale-105">
                    <p className="font-semibold flex items-center justify-center">
                      Login restricted <CgDanger className="mx-2" />
                    </p>
                    <p className="font-mono ">
                      Time remaining:{" "}
                      {moment.utc(countdown * 1000).format("mm:ss")}
                    </p>
                  </div>
                )}
                {stepform === 1 && (
                  
                  <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    {errorMessage && (
                      <p className="text-red-500">
                        {errorMessage}
                        {attemptCount && <span> (Attempt {attemptCount})</span>}
                      </p>
                    )}

                    <div className="relative mt-4">
                      <input
                        type="text"
                        id="username"
                        required
                        style={{ outline: "none" }}
                        className="block w-full px-5 pt-5 pb-2 bg-[#F8F9F9] text-gray-900 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[black] peer placeholder-transparent"
                        placeholder="Username"
                        value={postLogin.username}
                        onChange={(e) =>
                          setPostLogin({
                            ...postLogin,
                            username: e.target.value,
                          })
                        }
                      />
                      <label
                        htmlFor="username"
                        className="absolute text-[12px] left-4 top-[3px] text-gray-500 transition-all duration-200 transform scale-100 origin-[0] peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-[4px] peer-focus:scale-75 peer-focus:text-black"
                      >
                        Username
                      </label>
                    </div>
                    <div className="relative mt-6">
                      <input
                        type="password"
                        id="password"
                        required
                        className="block w-full px-5 pt-5 pb-2 bg-[#F8F9F9] text-gray-900 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[black] peer placeholder-transparent"
                        placeholder="Password"
                        value={postLogin.password}
                        onChange={(e) =>
                          setPostLogin({
                            ...postLogin,
                            password: e.target.value,
                          })
                        }
                      />
                      <label
                        htmlFor="password"
                        className="absolute text-[12px] left-4 top-[3px] text-gray-500 transition-all duration-200 transform scale-100 origin-[0] peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-[4px] peer-focus:scale-75 peer-focus:text-black"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mx-auto flex justify-center items-center">
                      <ReCAPTCHA
                        sitekey={import.meta.env.VITE_CAPTCHA_KEY}
                        onChange={(value) => setCapEval(!!value)}
                        className="scale-75"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#D91656] text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition duration-300"
                      disabled={form1Spinner || countdown > 0 || !capEval}
                    >
                      {form1Spinner ? (
                        <Spinner aria-label="Center-aligned spinner example" />
                      ) : (
                        "Login"
                      )}
                    </button>
                  </form>
                )}
                {stepform === 2 && (
                  
                  <form className="mt-6 space-y-5" onSubmit={handleOTPSubmit}>
                    <p>
                      Login attempt from a different location. Please verify
                      your identity with the OTP. Enter the 6-digits code we’ve
                      emailed and this only active for 3 minutes{" "}
                    </p>

                    <div className="relative mt-4">
                      <input
                        type="text"
                        id="otp"
                        required
                        style={{ outline: "none" }}
                        className="block w-full px-5 pt-5 pb-2 bg-[#F8F9F9] text-gray-900 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[black] peer placeholder-transparent"
                        placeholder="Enter OTP"
                        value={otpCode}
                        onChange={handleChangeOtp} 
                        maxLength={6} 
                      />

                      <label
                        htmlFor="otp"
                        className="absolute text-[12px] left-4 top-[3px] text-gray-500 transition-all duration-200 transform scale-100 origin-[0] peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-[4px] peer-focus:scale-75 peer-focus:text-black"
                      >
                        OTP
                      </label>
                    </div>

                    {otpError && (
                      <p style={{ color: "red", fontStyle: "italic" }}>
                        {otpError}
                      </p> 
                    )}

                    <button
                      type="submit"
                      className="w-full bg-[#D91656] text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition duration-300"
                      disabled={otpCode.length !== 6 || otpLoading} 
                    >
                      {otpLoading ? "Verifying..." : "Verify OTP"}
                    </button>
                  </form>
                )}
                <p class="text-gray-600 text-[10px] my-3 hover:underline cursor-pointer">
                  Forgot password?
                </p>
                <p className="text-gray-600 text-[10px] my-3 hover:underline cursor-pointer">
                  <Link
                    to="/register"
                    className="text-gray-600 hover:underline"
                  >
                    Create an Account?
                  </Link>
                </p>
              </div>
            </div>

            <div
              class="md:col-span-2 bg-no-repeat bg-cover relative rounded-r-md w-full h-auto"
              style={{
                backgroundImage: `url(../logo_image/vlcsnap-2024-10-07-10h05m10s678.png)`,
                backgroundPosition: "center", 
              }}
            >
              <div class="absolute inset-0  "></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bini_home;
