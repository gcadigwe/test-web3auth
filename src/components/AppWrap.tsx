import dynamic from "next/dynamic";

import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ChainIds } from "@taquito/taquito";

const web3auth =
  typeof window !== "undefined"
    ? new Web3Auth({
        clientId:
          "BEi1u_ON9wcilchv0zM4EI_eH3-WJkuyX6B6DAaZTCxLed6HNmn22lhpU99bOKpuYKmJLeJ5-7j9UR8dGdyxlfM", // get it from Web3Auth Dashboard
        web3AuthNetwork: "testnet",
        chainConfig: {
          chainNamespace: "other", // for all non EVM and SOLANA chains, use "other"
          rpcTarget: "https://ghostnet.smartpy.io",
          displayName: "Tezos",
          blockExplorer: "https://tzstats.com",
          ticker: "XTZ",
          tickerName: "Tezos",
          chainId: "NetXnHfVqm9iesp",
        },
      })
    : null;

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    uxMode: "popup",
  },
  web3AuthNetwork: "testnet",
});

typeof window !== "undefined"
  ? web3auth?.configureAdapter(openloginAdapter)
  : null;

//   web3auth?.connectTo()
export default function AppWrap({ Component, pageProps }: any) {
  const value = useLocalStorage();
  useEffect(() => {
    const initModal = async () => {
      try {
        if (value) {
          await web3auth?.initModal();
        }
      } catch (err) {
        console.log(err);
      }
    };
    initModal();
  }, [value]);
  return (
    <>
      {/* {!user.wallet_instance ? ( */}

      <Component {...pageProps} />

      {/* ) : (
                    <div className="font-jost w-[70%] m-auto text-center my-10">
                        <p className="font-bold">Connect Web3 Wallet</p>
                        <p>
                            A connected Web3 wallet is needed to enter the shop.
                        </p>
                        {getLinkedCheck() && <p>You connected a wallet different from the one linked to your email, please connect the correct wallet</p>}
                        <div className="flex flex-col mt-10 font-bold">
                            <ConnectWallet
                                buttonStyle="rounded-full mt-10 bg-[#020202] text-[#FDE100] p-4 cursor-pointer w-44 text-center font-medium self-center"
                                containerStyle="flex flex-col pt-0 items-center justify-center space-y-5 font-jost"
                            />
                        </div>
                    </div>
                )} */}
    </>
  );
}

export { web3auth };
