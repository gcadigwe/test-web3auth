import {
  Flex,
  Button,
  Img,
  Text,
  Icon,
  Collapse,
  useMediaQuery,
} from "@chakra-ui/react";
// import { ConnectTypeModal } from "./modals/ConnectTypeModal";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { setWeb3authProvider, setUserAddress } from "../../state/wallet";
import ATSLOGO from "../../../public/atslogo.svg";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { BsFillPersonFill } from "react-icons/bs";
import {
  MdAccountBalanceWallet,
  MdCollections,
  MdLogout,
} from "react-icons/md";
import { ImCart } from "react-icons/im";
import { IoIosCreate } from "react-icons/io";
import { AiTwotoneSetting, AiOutlineHeart } from "react-icons/ai";
import {
  Popover,
  PopoverContent,
  PopoverBody,
  useDisclosure,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import ConnectTypeModal from "./modals/ConnectTypeModal";
import CartDrawer from "./modals/CartDrawer";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileNavbar from "./MobileNavbar";

export function Navbar() {
  const [openModal, setopenModal] = useState(false);
  const initRef = useRef();
  const [openCart, setopenCart] = useState(false);
  const [isMobileDevice] = useMediaQuery("(max-width: 659px)");
  const { isOpen, onToggle } = useDisclosure();

  const {
    isOpen: profile,
    onToggle: profileToggle,
    onClose: profileClose,
  } = useDisclosure();

  const { userAddress, web3auth } = useSelector(
    (state: RootState) => state.wallet
  );

  const dispatch = useDispatch();

  const logout = async () => {
    if (localStorage.getItem("connectoratf") === "web3auth") {
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      await web3auth.logout();
      dispatch(setWeb3authProvider({ provider: null }));
      dispatch(setUserAddress({ account: "" }));
    }
  };

  console.log("window", typeof window ? typeof window : typeof window);

  return (
    <>
      <Flex
        px={10}
        py={5}
        alignItems={"center"}
        justifyContent={"space-between"}
        bgColor={"#131517"}
      >
        <Link href='/'>
          <Flex cursor={"pointer"} alignItems={"center"}>
            <Img h='50px' src={ATSLOGO.src} />
            <Text className={styles.testFont} ml={4}>
              ALL TOKEN <br />
              SPORTS
            </Text>
          </Flex>
        </Link>

        {isMobileDevice ? (
          <>
            <Icon
              onClick={onToggle}
              color='white'
              w='50px'
              h='50px'
              mr={2}
              as={RxHamburgerMenu}
            />
          </>
        ) : (
          <Flex zIndex={2}>
            <Flex
              onMouseEnter={() => {
                profileToggle();
                console.log("in");
              }}
              onMouseLeave={() => {
                profileClose();
              }}
            >
              <Icon
                cursor={"pointer"}
                w='30px'
                h='30px'
                color={"#fff"}
                mr={10}
                as={BsFillPersonFill}
              />
              <Collapse in={profile} animateOpacity>
                <Flex
                  display={profile ? "block" : "none"}
                  position={"absolute"}
                  top={"57px"}
                  right={40}
                  w='200px'
                  mb={4}
                  ml={5}
                  justifyContent={"center"}
                  flexDirection={"column"}
                  // px={4}
                  bgColor={"white"}
                >
                  <Link href={"/profile"}>
                    <Flex
                      _hover={{
                        bgColor: "#eee",
                      }}
                      px={2}
                      py={2}
                      cursor={"pointer"}
                      alignItems={"center"}
                    >
                      <Icon w='20px' h='20px' mr={2} as={BsFillPersonFill} />
                      <Text className={styles.popovertext}>Profile</Text>
                    </Flex>
                  </Link>
                  <hr
                    style={{ borderBottomWidth: "1px", borderColor: "#eee" }}
                  />

                  <Flex
                    _hover={{
                      bgColor: "#eee",
                    }}
                    px={2}
                    py={2}
                    cursor={"pointer"}
                    alignItems={"center"}
                  >
                    <Icon w='20px' h='20px' mr={2} as={AiOutlineHeart} />
                    <Text className={styles.popovertext}>Favourite</Text>
                  </Flex>
                  <hr
                    style={{ borderBottomWidth: "1px", borderColor: "#eee" }}
                  />

                  <Link href={"/create-nft"}>
                    <Flex
                      _hover={{
                        bgColor: "#eee",
                      }}
                      px={2}
                      py={2}
                      cursor={"pointer"}
                      alignItems={"center"}
                    >
                      <Icon w='20px' h='20px' mr={2} as={IoIosCreate} />
                      <Text className={styles.popovertext}>Create</Text>
                    </Flex>
                  </Link>
                  <hr
                    style={{ borderBottomWidth: "1px", borderColor: "#eee" }}
                  />

                  <Flex
                    _hover={{
                      bgColor: "#eee",
                    }}
                    px={2}
                    py={2}
                    cursor={"pointer"}
                    alignItems={"center"}
                  >
                    <Icon w='20px' h='20px' mr={2} as={MdCollections} />
                    <Text className={styles.popovertext}>My Collections</Text>
                  </Flex>
                  <hr
                    style={{ borderBottomWidth: "1px", borderColor: "#eee" }}
                  />

                  <Flex
                    _hover={{
                      bgColor: "#eee",
                    }}
                    px={2}
                    py={2}
                    cursor={"pointer"}
                    alignItems={"center"}
                  >
                    <Icon w='20px' h='20px' mr={2} as={AiTwotoneSetting} />
                    <Text className={styles.popovertext}>Settings</Text>
                  </Flex>
                  <hr
                    style={{ borderBottomWidth: "1px", borderColor: "#eee" }}
                  />

                  <Flex
                    _hover={{
                      bgColor: "#eee",
                    }}
                    px={2}
                    py={2}
                    cursor={"pointer"}
                    alignItems={"center"}
                  >
                    <Icon w='20px' h='20px' mr={2} as={MdLogout} />
                    <Text className={styles.popovertext}>Log Out</Text>
                  </Flex>
                  <hr
                    style={{ borderBottomWidth: "1px", borderColor: "#eee" }}
                  />
                </Flex>
              </Collapse>
            </Flex>

            <Icon
              cursor={"pointer"}
              mr={10}
              w='30px'
              h='30px'
              color={"#fff"}
              as={MdAccountBalanceWallet}
              onClick={() => setopenModal(true)}
            />
            <Icon
              onClick={() => setopenCart(true)}
              cursor={"pointer"}
              w='30px'
              h='30px'
              color={"#fff"}
              as={ImCart}
            />
          </Flex>
        )}
      </Flex>

      <ConnectTypeModal
        isOpen={openModal}
        onClose={() => setopenModal(false)}
      />

      <CartDrawer isOpen={openCart} onClose={() => setopenCart(false)} />

      <MobileNavbar isOpen={isOpen} close={onToggle} />
    </>
  );
}
