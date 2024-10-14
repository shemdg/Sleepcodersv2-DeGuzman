import React from "react";
import { Navbar } from "../screen/common/Navbar";

function Home() {
  return (
    <>
      <div className="relative">
        <div
          className="h-screen bg-no-repeat bg-cover bg-center w-full mx-auto flex justify-center items-center"
          style={{ backgroundImage: "url(../logo_image/cherry.gif)" }}
        ></div>
        <Navbar />

        <div className="absolute top-0 left-0 bg-black opacity-40 h-screen w-full z-10"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <img
            src="../logo_image/toptop.png"
            alt="Top Top Logo"
            className="animate-slidein opacity-0 max-w-full h-auto z-20"
            style={{ animationDelay: "500ms" }}
          />
        </div>

        <div className="absolute bottom-4 flex justify-start items-center mx-4 z-20">
          <a
            href="https://www.facebook.com/BINIph.official"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="../logo_image/twitter.png"
              alt="Twitter Logo"
              className="h-6 w-6 mx-1"
            />
          </a>

          <a
            href="https://open.spotify.com/artist/7tNO3vJC9zlHy2IJOx34ga"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="../logo_image/spot.png"
              alt="Spotify Logo"
              className="h-6 w-8"
            />
          </a>

          <a
            href="https://x.com/BINI_ph"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="../logo_image/x.png" alt="X Logo" className="h-6 w-8" />
          </a>

          <a
            href="https://www.instagram.com/bini_ph/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="../logo_image/ig.png"
              alt="Instagram Logo"
              className="h-6 mx-2 w-6"
            />
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
