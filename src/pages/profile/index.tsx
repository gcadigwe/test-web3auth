import { Flex, Img, Text, Icon, Button } from "@chakra-ui/react";
// import styles from "../../styles/Home.module.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
// import { fetchNftsFromBlockchain } from "../../utils/api-requests/minted-nts";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
// import MintedNFT from "../../components/profile/minted_nft";
import { useFetchNFTByUser } from "../../hooks/useFetchNfts";
import { INFTDATA } from "../nft/[id]";
import NFT from "../../components/landing/nft";
import { MdOutlineAddAPhoto } from "react-icons/md";

interface nfts {
  token: {
    metadata: {
      name: string;
      thumbnailUri: string;
    };
    tokenId: string;
    contract: {
      address: string;
    };
  };
}

export default function Profile() {
  const [tabIndex, setTabIndex] = useState(0);
  const { wallet } = useSelector((state: RootState) => state);
  const [ownedNFTs, setownedNFTs] = useState<Array<nfts>>([]);
  // const [listedNFTs, setlistedNFTs] = useState<INFTDATA[]>([])
  const handleTabsChange = (index: number) => {
    console.log("index", index);
    setTabIndex(index);
  };

  const [refresh, setRefresh] = useState(false);

  const { nfts } = useFetchNFTByUser(refresh);

  const hiddenOffersTab = useRef<any>(null);
  const hiddenHistoryTab = useRef<any>(null);
  const hiddenAuctionTab = useRef<any>(null);

  //   useEffect(() => {
  //     const fetch = async () => {
  //       const nft = await fetchNftsFromBlockchain(wallet?.userAddress);
  //       const filter = nft.filter((item: any) => item.balance !== "0");
  //       setownedNFTs(filter);
  //       console.log(nft);
  //     };

  //     fetch();
  //   }, [wallet?.userAddress]);
  return (
    <Flex
      //   className={styles.gelionmd}
      alignItems={"center"}
      color='white'
      blur='8px'
      minH='100vh'
      fontFamily={"gelionmd"}
      background='linear-gradient(90deg, rgba(101,241,216,0.8814119397759104) 0%, rgba(0,0,0,0.9990589985994398) 0%, rgba(101,38,94,0.9710477941176471) 100%)'
      //   pt={10}
      //   pb={10}
      flexDirection={"column"}
    >
      <Flex
        w='100vw'
        position={"relative"}
        h='300px'
        bgColor={"#ccc"}
        _hover={{ bgColor: "#636364" }}
        cursor='pointer'
      >
        <Flex justifyContent={"center"} w='100%' alignItems={"center"}>
          <Icon w='100px' h='100px' as={MdOutlineAddAPhoto} />
        </Flex>
        <Img
          position={"absolute"}
          top={52}
          border='2px solid white'
          borderRadius={"50%"}
          ml={10}
          w='150px'
          h='150px'
          src='https://images.unsplash.com/photo-1674841151927-0012be37e7ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2400&q=80'
        />
      </Flex>
      <Flex mt={16} pl={16} w='100%' flexDirection={"column"}>
        <Text fontSize={"24px"} fontWeight={"bold"}>
          Unnamed
        </Text>
        <Text>0xc352...6541</Text>
      </Flex>

      <Tabs
        tabIndex={tabIndex}
        onChange={handleTabsChange}
        mt={20}
        px={10}
        w='100%'
      >
        <TabList>
          <Tab _selected={{ color: "white", borderColor: "#672B60" }}>
            Created
          </Tab>
          <Tab _selected={{ color: "white", borderColor: "#672B60" }}>
            Collected
          </Tab>
          <Tab _selected={{ color: "white", borderColor: "#672B60" }}>
            Owned
          </Tab>
          <Tab _selected={{ color: "white", borderColor: "#672B60" }}>
            Activity
          </Tab>
          <Tab _selected={{ color: "white", borderColor: "#672B60" }}>
            Listings
          </Tab>
          <Tab display={"none"} ref={hiddenOffersTab}>
            Offers
          </Tab>
          <Tab display={"none"} ref={hiddenHistoryTab}>
            History
          </Tab>
          <Tab display={"none"} ref={hiddenAuctionTab}>
            Auction
          </Tab>

          <Menu>
            <MenuButton
              color={tabIndex > 4 ? "#672B60" : "white"}
              bgColor={"transparent"}
              _hover={{ bgColor: "transparent" }}
              _active={{ bgColor: "transparent" }}
              as={Button}
              rightIcon={<Icon as={BsChevronDown} />}
            >
              More
            </MenuButton>
            <MenuList bgColor={"black"}>
              <MenuItem
                onClick={() => hiddenOffersTab.current.click()}
                bgColor={"black"}
              >
                Offers
              </MenuItem>
              <MenuItem
                onClick={() => hiddenHistoryTab.current.click()}
                bgColor={"black"}
              >
                History
              </MenuItem>
              <MenuItem
                onClick={() => hiddenAuctionTab.current.click()}
                bgColor={"black"}
              >
                Auctions
              </MenuItem>
            </MenuList>
          </Menu>
          {/* </Tab> */}
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>created</p>
          </TabPanel>
          <TabPanel>
            <p>collected</p>
          </TabPanel>
          <TabPanel>
            <Flex>
              {/* {ownedNFTs.length > 0 &&
                ownedNFTs?.map((nft) => (
                  <MintedNFT
                    contractAddress={nft?.token?.contract.address}
                    name={nft?.token?.metadata.name ?? ""}
                    previewImg={
                      nft?.token?.metadata.thumbnailUri.split("//")[1] ?? ""
                    }
                    tokenId={nft?.token?.tokenId}
                  />
                ))} */}
            </Flex>
          </TabPanel>
          <TabPanel>
            <p>Activity</p>
          </TabPanel>
          <TabPanel>
            {nfts &&
              nfts?.map((nft) => (
                <NFT
                  nft={nft}
                  // minted={false}
                  edit={true}
                  remove={true}
                  // refresh={() => setRefresh(!refresh)}
                />
              ))}
          </TabPanel>
          <TabPanel>
            <p>offers</p>
          </TabPanel>
          <TabPanel>
            <p>History</p>
          </TabPanel>
          <TabPanel>
            <p>Auctions</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
