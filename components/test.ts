import { ethers } from "ethers";
import contractData from "../helpers/contractABI.json"; // Ajusta la ruta si es necesario

const CONTRACT_ADDRESS = contractData.contractAddress;
const CONTRACT_ABI = contractData.abi;

// Conectar a Sepolia usando Infura
const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/87388b2cafcd4bcdbb26947767a1869f");

const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

// Dirección de la wallet que quieres verificar
const walletAddress = "0x5aF1c8Af38844b0FCe9B0798C968F721Cd0B484F";

async function checkNFT() {
  try {
    const balance = await contract.balanceOf(walletAddress);
    console.log(`Balance de NFTs en la wallet ${walletAddress}:`, balance.toString());
  } catch (error) {
    console.error("Error verificando NFT:", error);
  }
}

checkNFT();
