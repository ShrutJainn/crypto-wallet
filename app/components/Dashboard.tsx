import { useState } from "react";
import Dropdown from "./Dropdown";
import Wallet from "./Wallet";

function Dashboard() {
  return (
    <div className=" flex flex-col gap-14">
      <Dropdown />
      <div className=" flex justify-between items-center">
        <h1 className=" font-bold text-4xl">Solana Wallet</h1>
        <div className=" flex gap-5">
          <button className=" bg-white text-black p-3 rounded-lg">
            Add Wallet
          </button>
          <button className=" bg-red-600 p-3 rounded-lg">Clear Wallets</button>
        </div>
      </div>
      <Wallet />
    </div>
  );
}

export default Dashboard;
