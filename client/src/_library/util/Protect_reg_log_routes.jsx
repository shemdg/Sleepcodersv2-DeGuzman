import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import Cookies from "js-cookie";

const Protect_reg_log_routes = () => {
 // Retrieve sessionId from cookies
 const sessionId = Cookies.get("sessionId");

 // If sessionId exists, redirect to /calendar, otherwise render Outlet for protected routes
 return sessionId ? <Navigate to="/calendar" /> : <Outlet />;
}

export default Protect_reg_log_routes
