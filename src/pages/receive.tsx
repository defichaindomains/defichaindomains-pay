import {
  NATIVE_TOKEN_ADDRESS,
  useAddress,
  useBalance,
  useSDK,
} from "@thirdweb-dev/react";
import AppContainer from "@/components/AppContainer";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/router";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  CHAIN,
  resolverAbi,
  resolverAddress,
  reverseRegistrarAbi,
  reverseRegistrarAddress,
} from "@/const/config";
import { useQRCode } from "next-qrcode";
import WalletConnectSection from "@/components/WalletConnectSection";
import formatNumber from "@/lib/numberFormatter";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useResolveAddress from "@/hooks/useResolveAddress";

/**
 * This is where the user's can see their wallet address so they can send funds to it.
 * It takes the address from the useAddress hook and displays it in multiple ways: as a QR code, as text, and as a button to copy it to the clipboard.
 */
export default function ReceivePage() {
  // Useful to send user's to the /send and /receive pages.
  const router = useRouter();
  // Grab the currently connected wallet address.
  const address = useAddress();

  const { domainName, loading } = useResolveAddress(address);

  // We're using the next-qrcode library to generate the QR code of the wallet address
  const { Canvas } = useQRCode();

  // Load the balance of the native token, i.e. ETH on Ethereum, MATIC on Polygon, etc.
  const { data: nativeTokenBalance, isLoading: loadingNativeTokenBalance } =
    useBalance(NATIVE_TOKEN_ADDRESS);

  return (
    <AppContainer>
      <div className="container max-w-[720px] flex flex-col items-center lg:items-center h-auto min-h-[84%] px-3 py-8 lg:px-8 lg:mt-48 gap-2 lg:gap-0">
        <h1 className="scroll-m-20 text-4xl lg:text-6xl font-extrabold tracking-tight lg:mt-4 text-start lg:self-start">
          Receive Funds
        </h1>
        <Separator className="w-5/6  mt-4 lg:mt-8 lg:mb-4" />

        {address ? (
          <>
            {/* Balance Section */}
            <div className="w-full flex flex-col justify-center items-center mt-2 ml-2">
              {loadingNativeTokenBalance && (
                <Skeleton className="w-full h-24" />
              )}
              {nativeTokenBalance && (
                <>
                  <p className="text-md lg:text-lg text-muted-foreground max-w-xl leading-normal text-center lg:text-start">
                    Your Balance
                  </p>

                  <h1 className="scroll-m-20 text-2xl lg:text-4xl font-extrabold tracking-tight  text-center">
                    {formatNumber(Number(nativeTokenBalance?.displayValue))}{" "}
                    {nativeTokenBalance?.symbol}
                  </h1>
                </>
              )}
            </div>

            <Separator className="mt-4" />

            {/* QR Code: Desktop */}
            <div className="hidden lg:block">
              <Canvas
                text={address}
                options={{
                  width: 256,
                }}
              />
            </div>

            {/* QR Code: Mobile */}
            <div className="block lg:hidden">
              <Canvas
                text={address}
                options={{
                  width: 128,
                }}
              />
            </div>

            {/* Text displaying the resolved domain */}

            {loading ? (
              <Skeleton className="w-full h-12" />
            ) : domainName ? (
              <p className="text-sm lg:text-lg text-muted-foreground max-w-xl leading-normal text-center mt-4">
                Your Defichain Domain: <br />
                <strong>{domainName}</strong>
              </p>
            ) : (
              <Alert variant="default" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-sm lg:text-md">
                  No Defichain Domain found
                </AlertTitle>
                <AlertDescription className="text-xs lg:text-sm">
                  {`We couldn't resolve your address to any Defichain Domains. If you own one, you need to set your the reverse record in the Defichain Domains Manager app.`}
                </AlertDescription>
              </Alert>
            )}
            {/* Text displaying wallet address */}
            <p className="text-sm lg:text-lg text-muted-foreground max-w-xl leading-normal text-center mt-4">
              Your Wallet Address: <strong>{address}</strong>
            </p>

            {/* Button to copy wallet address */}
            <Button
              className="w-full mt-2"
              onClick={() => {
                navigator.clipboard.writeText(address);
              }}
            >
              Copy Wallet Address
            </Button>

            {/* Go back to the homepage */}
            <Button
              className="w-full mt-1"
              variant="outline"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Go Back
            </Button>
          </>
        ) : (
          // If there's no connected wallet, ask the user to connect one.
          <WalletConnectSection />
        )}
      </div>
    </AppContainer>
  );
}
