import React from "react";

function Music() {
  const mvData = [
    {
      id: 1,
      title: "Salamin, Salamin",
      date: "March 8, 2024",
      src: "https://www.youtube.com/embed/J1Ip2sC_lss?si=G_prGH0ve9Ysltku",
    },
    {
      id: 2,
      title: "Pantropiko",
      date: "November 17, 2024",
      src: "https://www.youtube.com/embed/Zx31bB2vMns?si=s0ONcbUYBpTaBXCM",
    },
    {
      id: 3,
      title: "Cherry On Top",
      date: "July 11, 2024",
      src: "https://www.youtube.com/embed/wufUX5P2Ds8?si=bDuaQhz9zWJcotas",
    },
    {
      id: 4,
      title: "Karera",
      date: "November 17, 2024",
      src: "https://www.youtube.com/embed/QNV2DmBxChQ?si=mNVpPkAoA6JLAp1-",
    },
    {
      id: 5,
      title: "Lagi",
      date: "June 24, 2022",
      src: "https://www.youtube.com/embed/KyndoXN4_ns?si=_lOawYUuPc6sBsPx",
    },
    {
      id: 6,
      title: "I Feel Good",
      date: "Sept 22, 2022",
      src: "https://www.youtube.com/embed/UMogVGvhs7U?si=k_U2inC8rkSHcF2V",
    },
  ];
  return (
    <>
      <div className="p-5 w-[25%] h-screen  ">
        <h1 className="text-[#D91656] font-bold tracking-[1px] text-[30px]">
          Music Video
        </h1>
        <div className="h-[500px] w-full overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-[#0F0F0E] scrollbar-track-[#303131]"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "white #632D3A",
        }}
        >
          {mvData.map((info) => (
            <>
              <div className="my-3">
                <iframe
                  className="rounded"
                  width="280"
                  height="150"
                  src={info.src}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
                <div className="my-3">
                  <p className="text-[14px] text-[#D91656] font-bold tracking-[2px] uppercase">
                    {info.title}
                  </p>
                  <p className="text-[11px] text-[#D91656] font-bold tracking-[2px] ">
                    {info.date}
                  </p>
                  <div className="border-b-2 w-[300px] border-[#D91656] my-2"></div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Music;
