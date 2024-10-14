import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FaClock, FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import DatePicker from "../screen/DatePicker";
import Music from "../screen/Music";
import useAxiosFetchSpecificDate from "../hooks/useAxiosFetchSpecificDate";
import Member from "../screen/Member";
import Home from "../screen/Home";



const Bini_Calendar_Home = () => {

  const [currentDate, setCurrentDate] = useState(new Date());
  

  const apiDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
  const { data, error, loading } = useAxiosFetchSpecificDate(
    apiDate.toISOString().split('T')[0]
  );

  const handleDatePick = (date) => {
    
    setCurrentDate(date);
  };

  const handlePreviousDay = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
     
      return 'Invalid Date';
    }
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    try {
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      
      return date.toString(); 
    }
  };

  const formattedDate = formatDate(currentDate);

  const events = data || [];
  
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === currentDate.toDateString();
  });



  return (
    <>
      <div className="bg-[#FAE7F4] roboto-thin">
       <Home />
        <div className="w-full mx-auto max-w-[1400px] h-screen">
          <div className="flex justify-evenly w-full mx-auto">
            <Member />
            <div className="h-screen w-[700px] p-5">
              <div className="">
                <div className="flex justify-between items-center font-bold p-5 leading-8 bg-gradient-to-r from-[#D91656] via-[#FF6F91] to-[#FF9AA2] shadow-md rounded-md text-white">
                  <div>
                    <h1 className="text-[22px] tracking-[1px] uppercase">
                      {formattedDate.split(",")[0]}
                    </h1>
                    <h1 className="text-[30px]">
                      {formattedDate.split(",")[1]}
                    </h1>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="bg-[#632D3A] rounded flex items-center justify-center mx-auto text-center">
                      <button
                        className="px-2 py-2 text-center"
                        onClick={handlePreviousDay}
                      >
                        <FaArrowLeft />
                      </button>

                      <DatePicker
                        currentDate={currentDate}
                        onDateChange={handleDatePick}
                        className="rounded-none"
                      />

                      <button
                        className="px-2 py-2 text-center"
                        onClick={handleNextDay}
                      >
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 space-y-6 mb-5">
                <div
                  className="bg-gradient-to-r from-[#D91656] via-[#FF6F91] to-[#FF9AA2] h-auto rounded-md p-5 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-[#0F0F0E] scrollbar-track-[#303131]"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "white #632D3A",
                  }}
                >
                  <div className="relative ">
                    {loading && (
                      <>
                        <div
                          style={styles.progressBarContainer}
                          className="animate-loading"
                        >
                          <div style={styles.progressBar} />
                        </div>
                        <div className="text-center text-white font-bold ">
                          <div class="loader mx-auto"></div>{" "}
                        </div>
                      </>
                    )}
                    {!loading && (
                      <>
                       
                        {filteredEvents.length > 0 ? (
                          filteredEvents.map((info) => (
                            <div
                              className="bg-[#262626] w-full cursor-pointer h-[200px] my-5 rounded-md mx-auto border-2 border-[#303030] shadow-lg hover:shadow-2xl transition-shadow"
                              key={info.id}
                            >
                              <div className="p-5 flex w-full justify-center text-white hover:opacity-50 rounded-md">
                                <img
                                  src={info.imghref}
                                  className="h-[8rem] w-[150px] bg-white rounded"
                                  alt="Event Logo"
                                />
                                <div className="mx-5 border-l-2 border-[#2F2F2F]"></div>
                                <div className="w-full overflow-hidden flex-grow">
                                  <p className="font-bold text-[20px] truncate">
                                    {info.title}
                                  </p>
                                  <p
                                    className="font-bold text-[14px] w-full mb-2 text-gray-500"
                                    style={{
                                      display: "-webkit-box",
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                      WebkitLineClamp: 2,
                                    }}
                                  >
                                    Description: {info.description}
                                  </p>
                                  <p className="text-gray-300 text-sm my-1 flex items-center">
                                    <FaClock className="mr-2 text-[#FFD700]" />{" "}
                                    Time: {info.time}
                                  </p>
                                  <p className="text-gray-300 text-sm my-1 flex items-center">
                                    <FaUserAlt className="mr-2 text-[#00BFFF]" />{" "}
                                    For: {info.member}
                                  </p>
                                </div>
                              </div>
                              <div className="absolute inset-x-0 border-b-2 border-l-2 border-r-2 border-[#303030] bg-[#171617] h-10 rounded-b-md">
                                <p className="text-[#8C8C8C] text-center my-2 font-bold tracking-[1px] flex items-center justify-center">
                                  <FaMapMarkerAlt className="mr-2" />{" "}
                                  {info.address}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-white font-bold text-lg ">
                            No Schedule
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Music />
          </div>
        </div>
      </div>
    </>
  );
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

export default Bini_Calendar_Home;
