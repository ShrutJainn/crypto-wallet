"use client";

import Dropdown from "./Dropdown";
import Wallet from "./Wallet";
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { generateKeyPair } from "crypto";
import toast from "react-hot-toast";

interface WalletType {
  publicKey: string;
  privateKey: string;
  mnemonic: string;
  path: string;
}

function Dashboard() {
  const [mnemonicWords, setMnemonicWords] = useState<string[]>(
    Array(12).fill(" ")
  );
  const [wallets, setWallets] = useState<WalletType[]>([]);
  const [mnemonicInput, setMnemonicInput] = useState<string>("");
  const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<boolean[]>([]);
  const [visiblePhrases, setVisiblePhrases] = useState<boolean[]>([]);

  useEffect(() => {
    const storedWallets = localStorage.getItem("wallets");
    const storedMnemonic = localStorage.getItem("mnemonic");
    const storedMnemonicWords = storedMnemonic?.split(" ");

    if (storedWallets && storedMnemonicWords) {
      setMnemonicWords(storedMnemonicWords);
      setWallets(JSON.parse(storedWallets));
      setVisiblePrivateKeys(JSON.parse(storedWallets).map(() => false));
      setVisiblePhrases(JSON.parse(storedWallets).map(() => false));
    }
  }, []);

  function generateKeys(
    pathType: string,
    mnemonic: string,
    accountNumber: number
  ) {
    try {
      const seed = mnemonicToSeedSync(mnemonic);
      const path = `m/44'/501'/0'/${accountNumber}'`;

      const { key: derivedSeed } = derivePath(path, seed.toString("hex"));

      let publicKey: string;
      let privateKey: string;

      if (pathType === "501") {
        //sol
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keyPair = Keypair.fromSecretKey(secret);

        privateKey = bs58.encode(secret);
        publicKey = keyPair.publicKey.toBase58();
      } else if (pathType === "60") {
        //eth

        const privKey = Buffer.from(derivedSeed).toString("hex");
        privateKey = privKey;

        const wallet = new ethers.Wallet(privateKey);
        publicKey = wallet.address;
      } else {
        toast.error("Error while generating keys");
        return null;
      }

      return {
        publicKey,
        privateKey,
        mnemonic,
        path,
      };
    } catch (error) {
      console.log(error);
    }
  }

  function addWallet() {
    let mnemonic =
      typeof window !== "undefined" && localStorage.getItem("mnemonic");
    if (!mnemonic) return toast.error("No mnemonic found");

    const wallet = generateKeys("501", mnemonic, wallets.length);

    if (wallet) {
      const updatedWallets = [...wallets, wallet];
      setWallets(updatedWallets);
      typeof window !== "undefined" &&
        localStorage.setItem("wallets", JSON.stringify(updatedWallets));
      typeof window !== "undefined" &&
        localStorage.setItem("path-types", "501");
      setVisiblePrivateKeys([...visiblePrivateKeys, false]);
      setVisiblePhrases([...visiblePhrases, false]);
    }
    toast.success("Wallet added successfully");
  }

  function generateWallet() {
    let mnemonic = mnemonicInput;
    if (mnemonic) {
      if (!validateMnemonic(mnemonic)) {
        toast.error("Invalid Mnemonic Phrase");
        return;
      }
    } else {
      mnemonic = generateMnemonic();
    }

    const words = mnemonic.split(" ");
    setMnemonicWords(words);

    const wallet = generateKeys("501", mnemonic, wallets.length);
    if (wallet) {
      const updatedWallets = [...wallets, wallet];
      setWallets(updatedWallets);
      typeof window !== "undefined" &&
        localStorage.setItem("wallets", JSON.stringify(updatedWallets));
      typeof window !== "undefined" &&
        localStorage.setItem("path-types", "501");
      setVisiblePrivateKeys([...visiblePrivateKeys, false]);
      setVisiblePhrases([...visiblePhrases, false]);
    }
    typeof window !== "undefined" && localStorage.setItem("mnemonic", mnemonic);
    window.location.reload();
  }

  function handleDeleteWallet(wallet: Wallet) {
    const updatedWallets = wallets.filter(
      (w) => w.publicKey !== wallet.publicKey
    );
    setWallets(updatedWallets);
    typeof window !== "undefined" &&
      localStorage.setItem("wallets", JSON.stringify(updatedWallets));
    toast.success("Wallet deleted successfully");
  }

  function handleClearWallets() {
    setWallets([]);
    typeof window !== "undefined" && localStorage.setItem("wallets", "");
    toast.success("Wallets cleared");
  }

  let mnemonic =
    typeof window !== "undefined" && localStorage.getItem("mnemonic");

  return (
    <div>
      {mnemonic ? (
        <div className=" flex flex-col gap-14">
          <Dropdown />
          <div className=" flex justify-between items-center">
            <h1 className=" font-bold text-4xl">Solana Wallet</h1>
            <div className=" flex gap-5">
              <button
                className=" bg-white text-black p-3 rounded-lg"
                onClick={addWallet}
              >
                Add Wallet
              </button>
              <button
                className=" bg-red-600 p-3 rounded-lg"
                onClick={handleClearWallets}
              >
                Clear Wallets
              </button>
            </div>
          </div>
          {wallets.length !== 0 ? (
            wallets.map((wallet, i) => {
              return (
                <Wallet
                  key={wallet.publicKey}
                  wallet={wallet}
                  walletNumber={i + 1}
                  deleteWallet={handleDeleteWallet}
                />
              );
            })
          ) : (
            <h1>No wallets to show.</h1>
          )}
        </div>
      ) : (
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
              onClick={generateWallet}
            >
              {mnemonicInput.length > 0 ? "Get Wallet" : "Generate Wallet"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
