import {
  ConnectWallet,
  NATIVE_TOKEN_ADDRESS,
  useAddress,
  useBalance,
  useContract,
  useSDK,
} from "@thirdweb-dev/react";
import WalletConnectSection from "@/components/WalletConnectSection";
import AppContainer from "@/components/AppContainer";
import Image from "next/image";
import formatNumber from "@/lib/numberFormatter";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/router";
import useResolveAddress from "@/hooks/useResolveAddress";
import { Button } from "@/components/ui/button";

/**
 * This is the main page that user's see after the connection flow from /login.
 * It shows the user's balance, recent transactions, and options to send and receive.
 */
export default function Dashboard() {
  const sdk = useSDK();
  // Useful to send user's to the /send and /receive pages.
  const router = useRouter();
  // Grab the currently connected wallet address.
  const address = useAddress();

  const { domainName, loading } = useResolveAddress(address);

  // Load their balance in the native token. i.e. ETH on Ethereum, MATIC on Polygon, etc.
  const { data: nativeTokenBalance, isLoading: loadingNativeTokenBalance } =
    useBalance(NATIVE_TOKEN_ADDRESS);

  // If the user hit this page without going through the login flow, show the wallet connection section rather than the main page.
  // We need the user to be connected to a wallet to show their balance and transaction history.
  if (!address) {
    return (
      <AppContainer>
        <div className="container max-w-screen-sm w-[560px] flex flex-col items-center lg:items-start h-screen px-3 py-8 lg:px-8 lg:mt-48">
          <WalletConnectSection />
        </div>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <div className="container max-w-[720px] flex flex-col items-center lg:items-start h-screen max-h-[85%] px-3 py-8 lg:px-8 lg:mt-48 gap-4 lg:gap-0">
        {/* Balance Section */}
        {loading ? (
          <Skeleton className="w-full h-6" />
        ) : (
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Welcome back, <strong>{domainName ?? address?.slice(0, 6)}</strong>.
          </p>
        )}
        {loadingNativeTokenBalance && <Skeleton className="w-full h-24" />}
        {nativeTokenBalance && (
          <h1 className="scroll-m-20 text-5xl lg:text-8xl font-extrabold tracking-tight lg:mt-4 text-center">
            {formatNumber(Number(nativeTokenBalance?.displayValue))}{" "}
            {nativeTokenBalance?.symbol}
          </h1>
        )}

        {/* Card Section: Receive and Send */}
        <ConnectWallet
          theme={"light"}
          detailsBtn={() => {
            return (
              <Button
                className="w-full mt-8"
                variant="outline"
                style={{ width: "100%" }}
              >
                Logout
              </Button>
            );
          }}
          switchToActiveChain={true}
          welcomeScreen={{
            img: {
              src: "https://app.defichain-domains.com/static/media/Full-Logo_White.f9598476.svg",
              width: 150,
              height: 50,
            },
            title: "Connect a wallet to use Defichain Domains Pay",
            subtitle:
              "Wallets help you access your digital assets and sign in to web3 applications.",
          }}
          modalTitleIconUrl={""}
          style={{ width: "90%", marginBottom: 12 }}
        />
        <div className="w-full flex flex-row justify-center items-center gap-2 lg:gap-4 mt-6 lg:mt-12">
          <Card
            className="w-1/2 flex flex-col items-center justify-start gap-2 py-2 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer"
            onClick={() => router.push("/receive")}
          >
            <Image
              src={`/receive.svg`}
              width={100}
              height={100}
              alt="Receive"
              className="mb-4"
            />

            <p className="text-lg font-semibold flex flex-row items-center gap-2">
              Receive
            </p>
          </Card>
          <Card
            className="w-1/2 flex flex-col items-center justify-start gap-2 py-2 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer"
            onClick={() => router.push("/send")}
          >
            <Image
              src={`/send.svg`}
              width={100}
              height={100}
              alt="Send"
              className="mb-4"
            />

            <p className="text-lg font-semibold flex flex-row items-center gap-2">
              Send
            </p>
          </Card>
        </div>
      </div>
    </AppContainer>
  );
}
