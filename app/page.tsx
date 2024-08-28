"use client";

import Dashboard from "./components/Dashboard";
import GenerateSeed from "./components/GenerateSeed";

export default function Home() {
  const mnemonic = localStorage.getItem("mnemonic");
  return <div>{mnemonic ? <Dashboard /> : <GenerateSeed />}</div>;
}
