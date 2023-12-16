import { Flex, Img, Text, Icon } from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
import POLYICON from "../../assets/polygon.svg";
import { AiOutlineHeart } from "react-icons/ai";
import { INFTDATA } from "../../pages/nft/[id]";
import { useRouter } from "next/router";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import Link from "next/link";
// import { removeNFT } from "../../utils/functions";

export default function NFT({
  nft,
  // minted,
  edit,
  remove,
}: {
  nft: any;
  // minted: boolean;
  edit?: boolean;
  remove?: boolean;
}) {
  const router = useRouter();
  //   const removenft = async () => {
  //     try {
  //       await removeNFT(nft.id);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  return (
    <>
      <Flex
        cursor={"pointer"}
        borderRadius={"6px"}
        border='1px'
        borderColor='#ccc'
        p={2}
        bgColor={"#2B2C2E"}
        mt={5}
        minW='180px'
        // h='230px'
        flexDirection={"column"}
        position='relative'
        // mb={20}
        display={nft?.display === true ? undefined : "none"}
      >
        {/* {remove && (
          <Icon
            onClick={() => removenft()}
            cursor={"pointer"}
            w='24px'
            h='24px'
            left={2}
            color='white'
            position={"absolute"}
            as={MdOutlineCancel}
          />
        )} */}
        {edit ? (
          <Link href={`/edit-nft/${nft.id}`}>
            <Icon
              cursor={"pointer"}
              w='18px'
              h='18px'
              right={2}
              color='white'
              position={"absolute"}
              as={FiEdit2}
            />
          </Link>
        ) : (
          <Icon
            w='24px'
            h='24px'
            right={2}
            color='white'
            position={"absolute"}
            as={AiOutlineHeart}
          />
        )}
        <Flex
          onClick={() => router.push(`/nft/${nft?.id}`)}
          justifyContent={"center"}
        >
          <Img
            mt={8}
            w='150px'
            h='100px'
            src={`https://ipfs.io/ipfs/${nft?.images[0]}`}
          />
        </Flex>

        <Flex
          onClick={() => router.push(`/nft/${nft?.id}`)}
          mt={8}
          color='#ffffff'
          flexDirection={"column"}
        >
          <Text fontFamily={"winnersansbd"} fontSize='12px'>
            {nft?.name}
          </Text>
          <Flex alignContent={"center"} justifyContent={"space-between"}>
            <Flex alignContent={"center"}>
              <Img w='16px' mr={1} src={POLYICON.src} />
              <Text className={styles.gelionmd}>{nft?.price} ATF</Text>
            </Flex>
            <Text className={styles.gelionmd}>Buy</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
