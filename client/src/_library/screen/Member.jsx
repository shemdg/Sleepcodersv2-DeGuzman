import React from "react";

function Member() {
  const member = [
    {
      id: 1,
      name: "Jhoanna",
      role: "Leader, Lead Vocalist, Lead Rapper",
      bday: "January 26, 2004",
    },
    {
      id: 2,
      name: "Aiah",
      role: "Main Rapper, Sub-Vocalist, Visual",
      bday: "January 27, 2001",
    },
    {
      id: 3,
      name: "Colet",
      role: "Main Vocalist, Lead Dancer, Lead Rapper",
      bday: "September 14, 2001",
    },
    {
      id: 4,
      name: "Maloi",
      role: "Main Vocalist",
      bday: "May 27, 2002",
    },
    {
      id: 5,
      name: "Gwen",
      role: "Lead Vocalist, Lead Rapper",
      bday: "June 19, 2003",
    },
    {
      id: 6,
      name: "Stacey",
      role: "Main Rapper, Lead Dancer, Sub-Vocalist",
      bday: "July 13, 2003",
    },
    {
      id: 7,
      name: "Mikha",
      role: "Main Rapper, Lead Dancer, Visual",
      bday: "November 8, 2003",
    },
    {
      id: 8,
      name: "Sheena",
      role: "Main Dancer, Sub-Vocalist, Youngest (Bunso)",
      bday: "May 9, 2004",
    },
  ];

  return (
    <>
      <div
        className={`w-[25%] h-screen p-5   hover:overflow-y-auto overflow-hidden text-white scrollbar-thin scrollbar-thumb-[#0F0F0E] scrollbar-track-[#303131]`}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "white #632D3A",
        }}
      >
        <div className="w-full ">
          <img
            src="/logo_image/bb.png"
            className="h-[100px]  w-full object-cover rounded"
            alt="Logo"
          />
        </div>

        <div className="mt-5">
          {member.map((info) => (
            <div
              key={info.id}
              className="leading-none bg-gradient-to-r border-l-4 border-[#D91656] from-[#e2adc3] to-[#FAE7F4] tracking-widest p-4 text-[#333333] mb-3 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <h1 className="text-[20px] font-bold  text-[#D91656]">
                {info.name}
              </h1>
              <p className="text-[22px] font-bold">{info.role}</p>
              <p className="text-[12px]">{info.bday}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Member;
