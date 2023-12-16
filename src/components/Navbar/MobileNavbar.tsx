import { Flex, Slide, Icon, Text, Img, Button } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import ATSLOGO from "../../../public/atslogo.svg";
import Link from "next/link";
import { useRouter } from "next/router";
// import { web3authProvider } from "../../pages/nft/[id]";
// import RPC, { tezos } from "../../utils/tezosRPC";
import { loginWallet } from "../../utils/api/user";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUserAddress } from "../../state/wallet";
import { RootState } from "@/state/store";
import { connectWallet } from "@/walletActions";

export default function MobileNavbar({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const userAddress = useSelector(
    (state: RootState) => state.wallet.userAddress
  );

  //   const connectWallet = async () => {
  //     try {
  //       let userAccount;

  //       const keypair: any = {};

  //       // userAccount = await rpc.getAccounts();
  //       const message: any = "";

  //       console.log("keypair", keypair);

  //       const token = localStorage.getItem("atfmarketplaceToken");

  //       if (token) {
  //         const decodedToken: {
  //           exp: number;
  //           user_id: string;
  //           iat: number;
  //         } = jwtDecode(token);

  //         if (decodedToken?.exp * 1000 < Date.now()) {
  //           await loginWallet({
  //             address: userAccount,
  //             publicKey: keypair?.pk,
  //             message: message?.bytes,
  //             signature: message?.sig,
  //           });
  //         }
  //       } else {
  //         await loginWallet({
  //           address: userAccount,
  //           publicKey: keypair?.pk,
  //           message: message?.bytes,
  //           signature: message?.sig,
  //         });
  //       }
  //       // dispatch(setUserAddress({ account: userAccount }));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  const login = async () => {
    const userAddress = await connectWallet(true);
    dispatch(setUserAddress({ account: userAddress }));
  };
  return (
    <>
      <Slide
        direction='left'
        in={isOpen}
        style={{ zIndex: 10, minHeight: "100%" }}
      >
        <Flex
          minH='100%'
          flexDirection={"column"}
          bgColor='black'
          color='white'
        >
          <Flex
            justifyContent={"space-between"}
            px={8}
            pt={10}
            alignItems='center'
          >
            <Link href='/'>
              <Flex cursor={"pointer"} alignItems={"center"}>
                <Img h='50px' src={ATSLOGO.src} />
                {/* <Text ml={4}>
                  ALL TOKEN <br />
                  SPORTS
                </Text> */}
              </Flex>
            </Link>
            <Icon
              onClick={close}
              as={MdClose}
              color='white'
              w='50px'
              h='50px'
              mr={2}
            />
          </Flex>

          <Text
            onClick={() => {
              close();
              router.push("/create-nft");
            }}
            pt={20}
            textAlign='center'
            fontFamily={"winnersansbd"}
            fontSize='26px'
          >
            CREATE NFT
          </Text>

          <Flex justifyContent={"center"} pt={20}>
            {userAddress ? (
              <Flex flexDirection={"column"} alignItems='center'>
                <Text textAlign={"center"}>
                  Connected Wallet: {userAddress}
                </Text>
                <Button>Disconnect</Button>
              </Flex>
            ) : (
              <Button color='black' onClick={() => login()}>
                Connect Wallet
              </Button>
            )}
          </Flex>
        </Flex>
      </Slide>
    </>
  );
}
