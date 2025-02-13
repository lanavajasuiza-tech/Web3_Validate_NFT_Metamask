/*Este código:
Elimina la lógica de minteo (Mint.tsx).
Recibe la wallet del usuario desde ConnectWallet.tsx.
Verifica si la wallet posee el NFT en el contrato especificado.
Si tiene el NFT, muestra el video alojado en Render.*/

import { useState } from "react";
import { hasNFT } from "../helpers/verifyNft.helpers";
import { ConnectWallet } from "../components/ConnectWallet";

export default function Home() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkNFT = async () => {
    if (!wallet) return;
    setLoading(true);
    const result = await hasNFT(wallet);
    setVerified(result);
    setLoading(false);
  };

  return (
    <div>
      <h1>Verifica tu NFT para acceder al contenido</h1>
      <ConnectWallet setWallet={setWallet} />

      {wallet && (
        <button onClick={checkNFT} disabled={loading}>
          {loading ? "Verificando..." : "Verificar NFT"}
        </button>
      )}

      {verified ? (
        <div>
          <h2>¡Acceso concedido!</h2>
          <video width="600" controls>
            <source src="https://fanbox-nightwaves-1hn8.onrender.com" type="video/mp4" />
            Tu navegador no soporta el tag de video.
          </video>
        </div>
      ) : (
        wallet && <p>No tienes el NFT necesario.</p>
      )}
    </div>
  );
}
