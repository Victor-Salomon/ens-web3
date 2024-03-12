"use client";

import Head from "next/head";
import Image from "next/image";
import styles from "./page.module.css";
import { BrowserProvider } from "ethers";
import { useEffect, useState } from "react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

export default function Home() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [ens, setENS] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);

  const handleENS = async (address: string, web3Provider: BrowserProvider) => {
    const ens = await web3Provider.lookupAddress(address);
    if (ens) {
      setENS(ens);
    }
  };

  const connect = async () => {
    setIsloading(true);
    try {
      if (isConnected && walletProvider) {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        if (chainId !== 11155111) {
          window.alert("Change the network to Sepolia");
          throw new Error("Change network to Sepolia");
        }
        const address = await signer.getAddress();
        await handleENS(address, ethersProvider);
        setIsloading(false);
        return signer;
      }
    } catch (err) {
      console.error(err);
      setIsloading(false);
    }
  };

  useEffect(() => {
    connect();
  }, [isConnected]);

  return (
    <div>
      <Head>
        <title>ENS Dapp</title>
        <meta name="description" content="ENS-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>
            Welcome to LearnWeb3 Punks {isLoading ? "" : ens ? ens : address}!
          </h1>
          <div className={styles.description}>
            It is an NFT collection for LearnWeb3 Punks.
          </div>
          {isConnected ? (
            <div>Wallet connected</div>
          ) : (
            <button onClick={connect} className={styles.button}>
              Connect your wallet
            </button>
          )}
        </div>
        <div>
          <Image
            src="/learnweb3punks.png"
            className={styles.image}
            width={740}
            height={320}
            alt="WalletConnect"
          />
        </div>
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by LearnWeb3 Punks
      </footer>
    </div>
  );
}
