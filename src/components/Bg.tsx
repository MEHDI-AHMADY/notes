import React from "react";

export default function Bg() {
  return (
    <div className="fixed inset-0 w-full h-full bg-gray-900 -z-10">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(31, 41, 55, 0.5) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(31, 41, 55, 0.5) 1px, transparent 1px)
        `,
          backgroundSize: "20px 20px",
          boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.5)",
        }}
      />
    </div>
  );
}
