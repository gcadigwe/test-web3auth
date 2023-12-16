import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Flex,
  Img,
  Text,
  Icon,
  Divider,
  Button,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { HiMinus } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import styles from "../../../styles/Home.module.css";
import { useEffect } from "react";
// import { getNFTFromStorage } from "../../../utils/functions";
import { INFTDATA } from "../../../pages/nft/[id]";

interface ICartDrawerProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function CartDrawer({ onClose, isOpen }: ICartDrawerProps) {
  const nftData: INFTDATA[] = [];
  return (
    <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
      {/* <DrawerOverlay /> */}
      <DrawerContent mt={24}>
        <DrawerHeader
          fontSize={"16px"}
          color='black'
          className={styles.winnersansbd}
          borderBottomWidth='1px'
        >
          Summary
        </DrawerHeader>
        <DrawerBody position={"relative"}>
          <Flex
            color='black'
            className={styles.gelionmd}
            mt={-10}
            flexDirection={"column"}
          >
            {nftData?.map((nft) => (
              <>
                <Flex
                  mt={10}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Flex alignItems={"center"}>
                    <Img mr={4} w='50px' h='50px' src={nft?.images[0]} />
                    <Flex>
                      <Text>{nft?.name}</Text>
                    </Flex>
                  </Flex>
                  <Text>{nft?.price} ATF</Text>
                </Flex>
                <Flex
                  alignItems={"center"}
                  mt={1}
                  justifyContent={"space-between"}
                >
                  <Flex cursor={"pointer"} alignItems={"center"}>
                    <Icon as={MdDelete} color='#131517' />
                    <Text fontSize={"14px"}>REMOVE</Text>
                  </Flex>
                  <Flex alignItems={"center"}>
                    <Icon bgColor={"#131517"} color='white' as={IoMdAdd} />
                    <Text mx={2}>{nft?.amount}</Text>
                    <Icon bgColor={"#131517"} color='white' as={HiMinus} />
                  </Flex>
                </Flex>
                <Divider size={"md"} mt={2} />
              </>
            ))}
          </Flex>
          {nftData?.length === 0 ? null : (
            <Flex justifyContent={"center"} mt={10}>
              {" "}
              <Button>Proceed to checkout</Button>
            </Flex>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
