// import { Navbar } from "../components/navbar";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Landing } from "../components/Landing";
import NFT from "../components/Landing/nft";
// import styles from "../styles/Home.module.css";
import { useFetchNfts } from "../hooks/useFetchNfts";
// import { useFetchAuctions } from "../hooks/useAuction";
// import Auction from "../components/landing/auction";
// // import { ICollection, useFetchCollections } from "../hooks/useCollection";
// import Collection from "../components/landing/collection";
// import { useTransactions } from "../hooks/useTransactions";
import SSOComponent from "../components/sso/SSOComponent";
import { useRouter } from "next/router";

function App() {
  const { nfts } = useFetchNfts();
  // const auctions = useFetchAuctions();
  // const collections = useFetchCollections();
  // const transactions = useTransactions();

  console.log("nft", nfts);
  const router = useRouter();
  const { session, type } = router.query;
  return (
    <>
      <Box bg='#131517' minH='100vh'>
        {/* <SSOComponent sessionId={session as string} type={type as string} /> */}
        <Flex
          minH={{
            sm: "70vh",
            smd: "70vh",
            md: "70vh",
            lg: "100vh",
            xl: "100vh",
          }}
          bg='linear-gradient(90deg, rgba(25,82,74,1) 0%, rgba(124,14,55,1) 35%, rgba(124,14,55,1) 74%, rgba(101,38,94,1) 96%);'
          justifyContent={"center"}
        >
          <Landing />
        </Flex>
        <Flex minH='100vh' flexDirection={"column"}>
          <Text
            px={{ sm: 4, smd: 4, md: 6, lg: 10, xl: 10 }}
            mt={10}
            fontSize={{
              sm: "20px",
              smd: "20px",
              md: "20px",
              lg: "22px",
              xl: "24px",
            }}
            fontFamily={"winnersansbd"}
            color='white'
          >
            LATEST DROPS
          </Text>
          <Flex
            gap={2}
            pl={{ sm: 4, smd: 4, md: 6, lg: 10, xl: 10 }}
            pb={10}
            overflowX='scroll'
          >
            {nfts?.map(
              (item: any) =>
                item.display && <NFT nft={item} edit={false} remove={false} />
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default App;
