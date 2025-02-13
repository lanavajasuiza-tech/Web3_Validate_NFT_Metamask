import { useState, useEffect } from "react";
import { Button, Text } from "@vercel/examples-ui";

interface ConnectWalletProps {
  setWallet: (wallet: string | null) => void;
}

export const ConnectWallet: React.VFC<ConnectWalletProps> = ({ setWallet }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (
        typeof window !== "undefined" &&
        window.ethereum &&
        window.ethereum.isMetaMask
      ) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const address = accounts[0];
            setWalletAddress(address);
            setWallet(address);
          }
        } catch (error) {
          console.error("Error comprobando la conexión de la wallet:", error);
        }
      } else {
        console.warn("MetaMask no está disponible o no está instalado.");
      }
    };
    checkIfWalletIsConnected();
  }, [setWallet]);

  const connectWallet = async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      alert("MetaMask no está instalado o no está disponible. Instálalo para continuar.");
      return;
    }
    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) {
        console.error("No se encontraron cuentas en MetaMask.");
        return;
      }
      const address = accounts[0];
      setWalletAddress(address);
      setWallet(address);
    } catch (error: any) {
      if (error.code === 4001) {
        // El usuario rechazó la solicitud
        console.error("El usuario rechazó la solicitud de conexión.");
      } else {
        console.error("Error al conectar la wallet:", error);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWallet(null);
  };

  return (
    <div className="flex flex-col">
      <Text variant="h2">Conectar Wallet</Text>
      <div className="mt-2 items-start justify-between">
        <Text className="my-6">
          Para acceder al contenido, conecta tu wallet usando{" "}
          <a
            className="underline"
            href="https://metamask.io/"
            target="_blank"
            rel="noreferrer"
          >
            MetaMask
          </a>
          .
        </Text>
        <div className="mt-12 flex justify-center">
          {!walletAddress ? (
            <Button variant="black" size="lg" onClick={connectWallet} disabled={isConnecting}>
              {isConnecting ? "Conectando..." : "Conectar Wallet"}
            </Button>
          ) : (
            <div className="text-center">
              <p>✅ Wallet Conectada: {walletAddress}</p>
              <Button variant="black" size="lg" onClick={disconnectWallet}>
                Desconectar Wallet
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};