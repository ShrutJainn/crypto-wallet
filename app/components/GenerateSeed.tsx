"use client";

import { generateMnemonic } from "bip39";
import { useState } from "react";

function GenerateSeed() {
  const [mnemonicInput, setMnemonicInput] = useState("");
  function handleClick() {

    if(mnemonicInput?.length > 0) {
      localStorage.setItem("mnemonic", mnemonicInput);
      window.location.reload();
    }else {
      const mnemonic = generateMnemonic();
      localStorage.setItem("mnemonic", mnemonic);
      window.location.reload();
    }
  }
  return (
    <div className=" flex flex-col gap-2">
      <h1 className=" font-extrabold text-5xl">Secret Recovery Phrase</h1>
      <p className=" font-semibold text-slate-300 text-xl mb-2">
        Save these words in a safe place
      </p>
      <div className=" w-full flex gap-3">
        <input
          type="password"
          placeholder="Enter your secret phrase(or keep it empty to generate one)"
          className=" w-[75%] bg-transparent p-3 border rounded-lg"
          value={mnemonicInput}
          onChange={(e) => setMnemonicInput(e.target.value)}
        />
        <button
          className="border bg-white text-black rounded-lg p-3"
          onClick={handleClick}
        >
          Generate Wallet
        </button>
      </div>
    </div>
  );
}

export default GenerateSeed;
