"use client";

import React, { useState } from "react";
import { FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

const Wallet = () => {
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false);

  const publicKey = "5vjK9R2XfcBDPKT5PCWuxTuEhr3WS2Fc7QsxCggPrFQB";
  const privateKey = "P5w2JfBd12pxsdWbfjt29x0rty47XbwkfjgW29lkhs";

  return (
    <div className="bg-black text-white rounded-lg shadow-lg mx-auto w-full border border-gray-700 pt-5">
      <div className="flex justify-between items-center mb-4 px-3">
        <h2 className="text-lg font-semibold">Wallet 1</h2>
        <button className="text-red-500 hover:text-red-700">
          <FaTrash />
        </button>
      </div>

      <div className=" bg-zinc-900 p-4 rounded-lg">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-400">Public Key</h3>
          <p className="text-sm break-all">{publicKey}</p>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-400">Private Key</h3>
          <button
            onClick={() => setIsPrivateKeyVisible(!isPrivateKeyVisible)}
            className="text-gray-400 hover:text-white"
          >
            {isPrivateKeyVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <p className="text-sm break-all">
          {isPrivateKeyVisible ? privateKey : "•".repeat(privateKey.length)}
        </p>
      </div>
    </div>
  );
};

export default Wallet;
