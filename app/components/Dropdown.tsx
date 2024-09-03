"use client";

import React, { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const secretPhrase = localStorage.getItem("mnemonic");

  const str = secretPhrase?.split(" ");

  if (!str) return null;

  return (
    <div className="w-full mx-auto border border-slate-700 min-h-20 rounded-lg py-2">
      <div
        className="  p-4 rounded-md cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className=" font-semibold text-2xl">Your Secret Phrase</span>
        <span className={`transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
          ▼
        </span>
      </div>
      {isOpen && (
        <>
          <div className=" p-4 rounded-md mt-2">
            <div className="grid grid-cols-4 gap-4">
              {str.map((word, index) => (
                <div key={index} className="  p-2 rounded-md text-center">
                  {word}
                </div>
              ))}
            </div>
          </div>
          <button
            className=" ml-7 mt-5 text-slate-500"
            onClick={() => {
              if (secretPhrase) navigator.clipboard.writeText(secretPhrase);
            }}
          >
            Copy to clipboard
          </button>
        </>
      )}
    </div>
  );
};

export default Dropdown;
