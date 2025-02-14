import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ConnectWallet from "../components/ConnectWallet";
import { verifyNftOwnership } from "../helpers/verifyNft.helpers";

export default function Home() {
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [hasNFT, setHasNFT] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // URL protegida donde se accede si el usuario tiene el NFT
  const PROTECTED_URL = "https://fanbox-nightwaves-1hn8.onrender.com/";

  // Redirigir automáticamente si se detecta el NFT
  useEffect(() => {
    if (hasNFT) {
      router.push(PROTECTED_URL);
    }
  }, [hasNFT, router]);

  const onWalletConnect = async (address: string) => {
    setUserAddress(address);
    setHasNFT(null); // Resetear estado previo
    setError(null);
    setLoading(true);

    try {
      const result = await verifyNftOwnership(address);
      setHasNFT(result);
      if (!result) {
        setError("No posees el NFT requerido.");
      }
    } catch (err: any) {
      console.error("Error al verificar NFT:", err);
      setError(err.message || "Error desconocido al verificar NFT.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Verifica tu NFT para acceder al contenido</h1>

      {/* Si no hay dirección conectada, mostrar botón para conectar */}
      {!userAddress && <ConnectWallet onConnect={onWalletConnect} />}

      {/* Mostrar mensaje de carga */}
      {loading && <p className="text-blue-500 mt-4">Verificando la propiedad del NFT...</p>}

      {/* Si ya hay dirección conectada y no estamos verificando */}
      {userAddress && !loading && (
        <div className="mt-4">
          <p><strong>Wallet Conectada:</strong> {userAddress}</p>

          {/* Mensaje de error si no posee NFT */}
          {!hasNFT && error && <p className="text-red-500 mt-2">{error}</p>}

          {/* Mensaje de éxito si tiene NFT */}
          {hasNFT && <p className="text-green-500 mt-2">✅ Tienes el NFT, redirigiendo...</p>}
        </div>
      )}
    </div>
  );
}
