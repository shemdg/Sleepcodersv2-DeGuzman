import React from "react";
import { Datepicker } from "flowbite-react";
import { Flowbite } from "flowbite-react";

// Define your custom theme
const customTheme = {
  datepicker: {
    root: {
      base: "relative  ",
    },

    popup: {
      root: {
        base: "absolute top-10 z-50 block pt-2",
        inline: "relative top-0 z-auto",
        inner:
          "inline-block bg-white rounded-lg p-4 shadow-lg dark:bg-gray-700",
      },

      header: {
        base: "",
        title:
          "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
        selectors: {
          base: "mb-2 flex justify-between",
          button: {
            base: " bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
          },
        },
      },
      view: {
        base: "p-1",
      },
      footer: {
        base: "mt-2 flex space-x-2",
        button: {
          base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium ",
          today:
            "bg-[#0F0F0E] text-white hover:bg-[#0F0F0E] dark:bg-[#0F0F0E] dark:hover:bg-[#0F0F0E]",
          clear:
            "border border-[#0F0F0E] bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
        },
      },
    },
    views: {
      days: {
        header: {
          base: "mb-1 grid grid-cols-7",
          title:
            "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400",
        },
        items: {
          base: "grid w-64 grid-cols-7",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            selected: "bg-[#0F0F0E] text-white hover:bg-[#0F0F0E]",
            disabled: "text-gray-500",
          },
        },
      },
      years: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            selected: "bg-[#0F0F0E]  text-white hover:bg-[#0F0F0E] ",
            disabled: "text-gray-500",
          },
        },
      },
      months: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            selected: "bg-[#0F0F0E] text-white hover:bg-[#0F0F0E]",
            disabled: "text-gray-500",
          },
        },
      },
    },
  },
};

const formatDate = (date) => {
 
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options); 
};

const DatePicker = ({ currentDate, onDateChange }) => {
  const formattedDate = formatDate(currentDate); 




  
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Datepicker
        className="ml-1 mr-1 focus:border-cr00"
        style={{ backgroundColor: "white" }}
        value={formattedDate} 
        onSelectedDateChanged={onDateChange} 
      />
    </Flowbite>
  );
};

export default DatePicker;
