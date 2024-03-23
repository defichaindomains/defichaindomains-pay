import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";
import {
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  phantomWallet,
  rainbowWallet,
  trustWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";

// What chain do you want the app to run on?
// This const is used throughout the app for the chain's name, native currency, explorer URL, RPC, etc.
export const CHAIN = {
  // === Required information for connecting to the network === \\
  chainId: 1130, // Chain ID of the network
  // Array of RPC URLs to use
  rpc: [`https://eth.mainnet.ocean.jellyfishsdk.com`],

  // === Information for adding the network to your wallet (how it will appear for first time users) === \\
  // Information about the chains native currency (i.e. the currency that is used to pay for gas)
  nativeCurrency: {
    decimals: 18,
    name: "DFI",
    symbol: "DFI",
  },
  shortName: "DMC mainnet", // Display value shown in the wallet UI
  slug: "dmc-mainnet", // Display value shown in the wallet UI
  testnet: false, // Boolean indicating whether the chain is a testnet or mainnet
  chain: "Defichain MetaChain", // Name of the network
  name: "Defichain MetaChain", // Name of the network
};

export const explorerUrl = "https://blockscout.mainnet.ocean.jellyfishsdk.com";

// What wallet options do you want to show when the user clicks "Connect Wallet"
export const byoWalletOptions = [metamaskWallet(), walletConnect()];

// What wallet options do you want to show when the user clicks "Sign up with Email?"
export const createWalletOptions = [
  embeddedWallet({
    auth: {
      options: ["email", "facebook", "apple", "google"],
    },
    recommended: true,
  }),
];

export const DEFICHAINDOMAINS_REGISTRY_ADDRESS =
  "0x6F5D8377e0aB05341A00EA8c40a58622C1D365D2";
