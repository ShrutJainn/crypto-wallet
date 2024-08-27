"use client";

import React, { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const secretPhrase = [
    "indoor",
    "nice",
    "taxi",
    "beach",
    "super",
    "thing",
    "engage",
    "brave",
    "state",
    "deputy",
    "rice",
    "dirt",
  ];
  const str = secretPhrase.join(" ");
  console.log(str);

  return (
    <div className="w-full mx-auto border border-slate-700 min-h-20 rounded-lg py-2">
      <div
        className="bg-black text-white p-4 rounded-md cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className=" font-semibold text-2xl">Your Secret Phrase</span>
        <span className={`transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
          ▼
        </span>
      </div>
      {isOpen && (
        <>
          <div className="bg-black text-white p-4 rounded-md mt-2">
            <div className="grid grid-cols-4 gap-4">
              {secretPhrase.map((word, index) => (
                <div
                  key={index}
                  className=" bg-black p-2 rounded-md text-center"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
          <button
            className=" ml-7 mt-5 text-slate-500"
            onClick={() => navigator.clipboard.writeText(str)}
          >
            Copy to clipboard
          </button>
        </>
      )}
    </div>
  );
};

export default Dropdown;
