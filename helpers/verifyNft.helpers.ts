import { ethers } from "ethers";
import contractData from "../helpers/contractABI.json"; // Importa el JSON

declare global {
  interface Window {
    ethereum?: any;
  }
}

const CONTRACT_ADDRESS = "0xc37EaF55367a7bb08A366284050eAd92f1D79fF9";
const CONTRACT_ABI = contractData.abi; // Extrae solo el ABI

export async function verifyNftOwnership(userAddress: string): Promise<boolean> {
  try {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("Metamask no está disponible en este entorno.");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const nftContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const balance = await nftContract.balanceOf(userAddress);

    console.log(`Balance en blockchain de ${userAddress}: ${balance.toString()}`);

    return balance.gt(0);
  } catch (error: any) {
    console.error("Error verificando NFT en la blockchain:", error.message);
    return false;
  }
}
