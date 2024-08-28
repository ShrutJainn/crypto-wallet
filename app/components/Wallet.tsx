"use client";

import React, { useState } from "react";
import { FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

interface Wallet {
  publicKey: string;
  privateKey: string;
  mnemonic: string;
  path: string;
}

const Wallet = ({
  wallet,
  walletNumber,
  deleteWallet,
}: {
  wallet: Wallet;
  walletNumber: number;
  deleteWallet: (wallet: Wallet) => void;
}) => {
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false);

  const { publicKey, privateKey } = wallet;

  return (
    <div className="bg-black text-white rounded-lg shadow-lg mx-auto w-full border border-gray-700 pt-5">
      <div className="flex justify-between items-center mb-4 px-3">
        <h2 className="text-lg font-semibold">Wallet {walletNumber}</h2>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => deleteWallet(wallet)}
        >
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
          {isPrivateKeyVisible ? privateKey : "•".repeat(privateKey?.length)}
        </p>
      </div>
    </div>
  );
};

export default Wallet;
