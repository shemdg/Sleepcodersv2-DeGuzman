import { useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// views
import Bini_Home from "./_library/views/Bini_home";
import Bini_Calendar_Home from "./_library/views/Bini_Calendar_Home/";

// utility protection routes
import Protected_Routes from "./_library/util/Protected_Routes";
import Protect_reg_log_routes from "./_library/util/Protect_reg_log_routes";

import Not_Found from "./_library/screen/Not_Found";
import Register from "./_library/views/Register";
import Event from "./_library/screen/Event.jsx";
import GETIPTEST from "./_library/views/GETIPTEST.jsx";

// font
import '@fontsource/fira-sans-condensed/100-italic.css';
import '@fontsource/fira-sans-condensed/200-italic.css';
import '@fontsource/fira-sans-condensed/300-italic.css';
import '@fontsource/fira-sans-condensed/400-italic.css';
import '@fontsource/fira-sans-condensed/500-italic.css';
import '@fontsource/fira-sans-condensed/600-italic.css';
import '@fontsource/fira-sans-condensed/700-italic.css';
import '@fontsource/fira-sans-condensed/800-italic.css';
import '@fontsource/fira-sans-condensed/900-italic.css';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Protect_reg_log_routes />}>
            <Route path="/" element={<Bini_Home />} />
            <Route path="/register" element={<Register />} />
          </Route>

         
          <Route element={<Protected_Routes />}>
            <Route path="/calendar" element={<Bini_Calendar_Home />} />
            <Route path="/test" element={<GETIPTEST />} />
          </Route>
    
          <Route >
            <Route path="/event" element={<Event />} />
          </Route>

          
          
          <Route path="*" element={<Not_Found />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
