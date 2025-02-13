import { useMoralis } from "react-moralis";
import { Button, Text, LoadingDots } from "@vercel/examples-ui";
import { useEffect } from "react";

interface ConnectWalletProps {
  setWallet: (wallet: string) => void; // Pasamos la dirección al componente padre
}

export const ConnectWallet: React.VFC<ConnectWalletProps> = ({ setWallet }) => {
  const { authenticate, isAuthenticated, user, logout, isAuthenticating } = useMoralis();

  // Cuando el usuario se autentica, guardamos la dirección de su wallet
  useEffect(() => {
    if (isAuthenticated && user) {
      setWallet(user.get("ethAddress"));
    }
  }, [isAuthenticated, user, setWallet]);

  const handleConnect = async () => {
    await authenticate({
      signingMessage: "Authorize linking of your wallet to this application",
    });
  };

  return (
    <div className="flex flex-col">
      <Text variant="h2">Connecting your wallet</Text>
      <div className="mt-2 items-start justify-between">
        <Text className="my-6">
          To access the promo video, you must connect your wallet using{" "}
          <a className="underline" href="https://metamask.io/" target="_blank" rel="noreferrer">
            Metamask extension
          </a>
          . This will also be used to authenticate you anonymously via{" "}
          <a href="https://moralis.io/" className="underline" target="_blank" rel="noreferrer">
            Moralis
          </a>.
        </Text>

        <div className="mt-12 flex justify-center">
          {!isAuthenticated ? (
            <Button variant="black" size="lg" onClick={handleConnect}>
              {isAuthenticating ? <LoadingDots /> : "Connect Wallet"}
            </Button>
          ) : (
            <div className="text-center">
              <p>✅ Wallet Connected: {user?.get("ethAddress")}</p>
              <Button variant="black" size="lg" onClick={logout}>
                Disconnect Wallet
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
