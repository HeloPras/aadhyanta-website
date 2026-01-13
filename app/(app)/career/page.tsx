import React from "react"

const page = () => {
  return (
    <div className=" relative pt-20 pb-20 ">
      <div>This is Career page</div>
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #161142 1px,)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="h-24 bg-linear-to-b from-white to-gray-50" />
      <svg
        viewBox="0 0 1440 90"
        className="absolute bottom-0 left-0 w-full opacity-[0.08]"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C120,60 240,20 360,30 480,40 600,80 720,70 840,60 960,20 1080,30 1200,40 1320,60 1440,50"
          fill="none"
          stroke="#B71E52"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

export default page
