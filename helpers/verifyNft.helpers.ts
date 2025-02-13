import { ethers } from "ethers";
import contractData from "./contractABI.json";

const CONTRACT_ADDRESS = contractData.contractAddress;
const CONTRACT_ABI = contractData.abi;

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const hasNFT = async (wallet: string): Promise<boolean> => {
  try {
    if (!window.ethereum) {
      console.error("MetaMask no está instalado.");
      return false;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Asegurarse de que el usuario ha dado acceso
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const tokenId = 19; // Especifica el Token ID que quieres verificar

    // Verificar si la wallet es dueña del Token ID 19
    let owner;
    try {
      owner = await contract.ownerOf(tokenId);
      console.log(`El propietario del Token ID ${tokenId} es: ${owner}`);
    } catch (error: any) {
      // Si el token no existe o hay otro error
      if (error.reason && error.reason.includes("ERC721: invalid token ID")) {
        console.error(`El Token ID ${tokenId} no existe.`);
      } else {
        console.error("Error al obtener el propietario del Token ID:", error.message);
      }
      return false;
    }

    // Comparar las direcciones en minúsculas para evitar problemas de mayúsculas/minúsculas
    const walletLower = wallet.toLowerCase();
    const ownerLower = owner.toLowerCase();

    return walletLower === ownerLower;
  } catch (error: any) {
    console.error("Error verificando NFT:", error.message);
    return false;
  }
};