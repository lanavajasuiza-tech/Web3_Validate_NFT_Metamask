import React, { useState } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

/**
 * Este componente solicita la conexión con MetaMask y devuelve
 * la dirección de la wallet conectada a través de la función `onConnect`.
 */
interface ConnectWalletProps {
  onConnect: (address: string) => void;
}

export default function ConnectWallet({ onConnect }: ConnectWalletProps) {
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const handleConnectMetamask = async () => {
    try {
      setError(null);
      setIsConnecting(true);

      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("MetaMask no está disponible.");
      }

      // Solicita las cuentas conectadas en MetaMask
      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("No se encontraron cuentas en MetaMask.");
      }

      const address = accounts[0];
      onConnect(address);
    } catch (err: any) {
      console.error("Error al conectar MetaMask:", err);
      setError(err?.message || "Ocurrió un error desconocido.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Conectar Wallet</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={handleConnectMetamask}
        disabled={isConnecting}
        style={{
          backgroundColor: "#f6851b",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {isConnecting ? "Conectando..." : "Conectar con MetaMask"}
      </button>
    </div>
  );
}
