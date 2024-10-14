import React, { useState } from "react";
import { Navbar } from "../screen/common/Navbar";

import { Label, Select } from "flowbite-react";
import { Datepicker } from "flowbite-react";

import Encrypt from "../util/Encrypt";

import axios from "../api/axios";

function Event() {
  
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    imghref: "",
    date: "",
    timeSlot: "",
    performer: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  
  const isFormComplete = () => {
    return Object.values(formData).every((value) => value !== "");
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const encryptedData = {
      title: Encrypt(formData.title),
      address: Encrypt(formData.address),
      imghref: Encrypt(formData.imghref),
      date: Encrypt(formData.date),
      timeSlot: Encrypt(formData.timeSlot),
      performer: Encrypt(formData.performer),
      description: Encrypt(formData.description),
    };

    console.log("Encrypted Form Data:", encryptedData);

    try {
      
      setLoading(true);
      const response = await axios.post("/event/post-event", encryptedData);
      setLoading(false);
      console.log("Response:", response.data);
      alert("Event created successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
      
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred while submitting the form.");
      }
      alert("Failed to create event. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-[#FAE7F4]">
        <img src="../logo_image/bini.png" className="h-24" alt="Logo" />
        <div className="mx-14 bg-white rounded-lg my-5 p-5">
          <div className="text-center font-bold">Bini Scheduling</div>
          <div className="mt-3 text-center text-4xl font-bold">
            Make a Schedule
          </div>
          <form className="p-8" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Title Name *"
                required
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Address *"
                required
              />
            </div>

            <div className="flex my-3 gap-4 justify-between items-center">
              <Select
                id="performers"
                name="performer"
                value={formData.performer}
                onChange={handleChange}
                className="w-full"

                required
              >
                <option value="">Select a performer</option>
                <option>Aiah</option>
                <option>Maloi</option>
                <option>Stacey</option>
                <option>Colet</option>
                <option>Gwen</option>
                <option>Sheena</option>
                <option>Mikha</option>
                <option>Jhoanna</option>
              </Select>
              <Select
                id="timeSlots"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                className="w-full"
                required
              >
                <option value="">Select a time slot</option>
                <option value="9:30 AM - 10:00 AM">9:30 AM - 10:00 AM</option>
                <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM</option>
                <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
                <option value="12:00 PM - 12:30 PM">12:00 PM - 12:30 PM</option>
                <option value="12:30 PM - 1:00 PM">12:30 PM - 1:00 PM</option>
                <option value="1:00 PM - 1:30 PM">1:00 PM - 1:30 PM</option>
                <option value="1:30 PM - 2:00 PM">1:30 PM - 2:00 PM</option>
                <option value="2:00 PM - 2:30 PM">2:00 PM - 2:30 PM</option>
              </Select>

              <input
                type="text"
                name="imghref"
                value={formData.imghref}
                onChange={handleChange}
                className="block w-1/2   rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Image Href *"
                required
              />


              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />



            </div>


            <div className="flex w-full bg-[red]  justify-between items-center max-w-md">

            <h1>Hello World</h1>
              <span className="cutegvj  ">Bading si melco</span>
            </div>



            <div className="my-5">
              <textarea
                name="description"
                id="text"
                cols="30"
                rows="10"
                value={formData.description}
                onChange={handleChange}
                className="mb-10 h-40 w-full resize-none rounded-md border text-black border-slate-300 p-5 font-semibold text-gray-300"
                placeholder="Description"
                required
              ></textarea>
            </div>
            <div className="text-center">

              <button
                type="button"
                className={`cursor-pointer rounded-lg px-8 py-5 text-sm font-semibold text-white 
                 ${isFormComplete() ? 'bg-[#D91656]' : 'bg-gray-400 cursor-not-allowed'}`}
                onClick={handleSubmit}
                disabled={!isFormComplete()} 
              >
                Place Schedule
              </button>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Event;
