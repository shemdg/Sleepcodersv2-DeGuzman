import React from "react";

const Not_Found = () => {
  return (
    <>
      <div className="h-screen relative">
        <div className="absolute inset-0 top-0 left-0 mx-auto flex flex-col justify-center items-center ">
          <img
            src="../logo_image/notfound.jpg"
            className="h-[500px] w-[500px]"
          />
          <div className="border-t-2 border-[gainsboro] ">
          <p className="mt-4 text-lg font-bold tracking-[1px] my-2 text-center">
            Sorry, the page you're looking for does not exist.
          </p>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default Not_Found;
