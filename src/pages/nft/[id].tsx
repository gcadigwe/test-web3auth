import { Flex, Img, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import { fetchNFTById } from "../../utils/api/nft";
// import {
//   fetchTokenInfo,
//   getSwapById,
// } from "../../utils/api-requests/minted-nts";
// import { walletInstance } from "../../utils/beacon";
// import { NetworkType } from "@airgap/beacon-sdk";
// import { tezos } from "../../utils/tezosRPC";
import { Player } from "video-react";
import { buy } from "@/contractServices";
// import { Web3Auth } from "@web3auth/modal";
// import { CHAIN_NAMESPACES } from "@web3auth/base";
// import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
// import RPC from "../../utils/tezosRPC";
// import { updateNFTAfterSale } from "../../utils/functions";
// import { Context, LegacyWalletProvider } from "@taquito/taquito";

// const { uploadImageToIpfs } = require("../../utils/ipfs");

export interface INFTDATA {
  name: string;
  price: number;
  priceType: string;
  description: string;
  maximumBid: number;
  minimumBid: number;
  images: string[];
  id: number;
  amount: number;
}

// export async function web3authProvider() {
//   console.log("provider1", tezos.wallet);
//   const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENTID as string;
//   console.log("clienId", clientId);
//   const web3auth = new Web3Auth({
//     clientId,
//     chainConfig: {
//       chainNamespace: CHAIN_NAMESPACES.OTHER,
//     },
//   });

//   const openloginAdapter = new OpenloginAdapter({
//     adapterSettings: {
//       network: "testnet",
//       uxMode: "popup",
//     },
//   });
//   web3auth.configureAdapter(openloginAdapter);
//   console.log("provider2", tezos.wallet);

//   await web3auth.initModal();
//   console.log("provider3", tezos.wallet);
//   const provider = await web3auth.connect();
//   console.log("provider4", tezos.wallet);

//   return { provider: provider, web3auth: web3auth };
// }

export default function NFT() {
  const router = useRouter();
  const { id, minted, swap, mimeType } = router.query;

  const [nftData, setNftData] = useState<any>();
  const [swapInfo, setswapInfo] = useState<any>();
  const [file, setFile] = useState<any>();

  useEffect(() => {
    const fetchNft = async () => {
      // if (minted == "true") {
      //   const nft = await fetchTokenInfo(id as string);
      //   const Swap = await getSwapById(swap as string);
      //   console.log("39", Swap);

      //   setNftData(nft[0]);
      //   setswapInfo(Swap);
      //   console.log(nft);
      // } else {
      const data = await fetchNFTById(id as string);
      setNftData(data);
      // }
    };

    fetchNft();
  }, [id]);

  function addToCart() {
    const cart = localStorage.getItem("atf-cart");
    if (cart) {
      const data = { ...nftData };
      data["amount"] = 1;

      const parsedData = JSON.parse(cart);

      if (parsedData.indexOf(data) !== -1) {
        parsedData.push(data);
        localStorage.setItem("atf-cart", JSON.stringify(parsedData));
      } else {
        console.log("Can't add again");
      }
    } else {
      const data = { ...nftData };
      data["amount"] = 1;
      localStorage.setItem("atf-cart", JSON.stringify([data]));
    }
  }

  const buyNFT = async (isweb3Auth: boolean) => {
    try {
      //   const buyTx = await buyNFT(nftData.price, "ATF", nftData.swapId);
      await buy(nftData.price, "ATF", nftData.swapId, nftData.id);
    } catch (err) {
      console.log(err);
    }
  };

  const tempBuy = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  console.log(nftData);

  return (
    <Flex
      className={styles.gelionmd}
      justifyContent={{
        sm: "unset",
        smd: "unset",
        md: "center",
        lg: "center",
        xl: "center",
      }}
      color='white'
      blur='8px'
      minH='100%'
      background='linear-gradient(90deg, rgba(101,241,216,0.8814119397759104) 0%, rgba(0,0,0,0.9990589985994398) 0%, rgba(101,38,94,0.9710477941176471) 100%)'
      pt={{ sm: 20, smd: 20, md: 0, lg: 0, xl: 0 }}
      pb={10}
      //   alignItems='center'
    >
      <Flex
        w={{ sm: "100%", smd: "100%", md: "unset", lg: "unset", xl: "unset" }}
        minH='100%'
        // px={{ sm: 4, smd: 4, md: 6, lg: 8, xl: 10 }}
        alignItems={"center"}
        flexDirection={{
          sm: "column",
          smd: "column",
          md: "row",
          lg: "row",
          xl: "row",
        }}
      >
        <Flex
          justifyContent={{
            sm: "unset",
            smd: "unset",
            md: "flex-end",
            lg: "flex-end",
            xl: "flex-end",
          }}
        >
          {nftData?.mimeType === "video/mp4" ? (
            <Player
              src={`https://ipfs.io/ipfs/${
                nftData?.metadata.displayUri.split("//")[1]
              }`}
              fluid={false}
              playsInline
              width={500}
              height={400}
            />
          ) : (
            <Img
              mt={8}
              mb={{ sm: 10, smd: 10, md: 0, lg: 0, xl: 0 }}
              h={{
                sm: "200px",
                smd: "200px",
                md: "300px",
                lg: "400px",
                xl: "500px",
              }}
              src={`https://ipfs.io/ipfs/${nftData?.images[0]}`}
            />
          )}
        </Flex>

        <Flex
          ml={{ sm: 0, smd: 0, md: 10, lg: 10, xl: 10 }}
          flexDirection={"column"}
          w='100%'
          px={{ sm: 10, smd: 10, md: 0, lg: 0, xl: 0 }}
        >
          <Text
            fontSize={{
              sm: "28px",
              smd: "30px",
              md: "32px",
              lg: "44px",
              xl: "50px",
            }}
            fontWeight='bold'
            color='white'
          >
            {nftData?.name}
          </Text>

          <Text mt={10} fontSize={"24px"} fontWeight='bold' color='white'>
            Description
          </Text>

          <Text fontSize={"16px"} color='white'>
            {nftData?.description}
          </Text>

          <Flex
            mt={5}
            justifyContent={{
              sm: "space-between",
              smd: "space-between",
              md: "unset",
              lg: "unset",
              xl: "unset",
            }}
          >
            <Flex
              mr={{ sm: 0, smd: 0, md: 20, lg: 20, xl: 20 }}
              flexDirection={"column"}
              alignItems='center'
            >
              <Text fontSize={"24px"} fontWeight='bold' color='white'>
                Available
              </Text>

              <Text fontSize={"16px"} color='white'>
                1
              </Text>
            </Flex>

            <Flex flexDirection={"column"}>
              <Text fontSize={"24px"} fontWeight='bold' color='white'>
                Price
              </Text>

              <Text fontSize={"16px"} color='white'>
                {nftData?.price} ATF
              </Text>
            </Flex>
          </Flex>
          <Button
            // onClick={() => uploadImageToIpfs(nftData?.images[0] as string)}
            onClick={() => buyNFT(true)}
            color='#2B2C2E'
            mt={10}
          >
            Buy
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
