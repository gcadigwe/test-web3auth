import WertModule from "@wert-io/module-react-component";
import { signSmartContractData } from "@wert-io/widget-sc-signer";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
// import { v4 as uuidv4, v4 } from "uuid";
import { RootState } from "@/state/store";
import { useSelector, useDispatch } from "react-redux";
import { connectWallet } from "@/walletActions";
import { setUserAddress } from "@/state/wallet";
import {
  Box,
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const Wert = ({ isWalletConect }: any) => {
  const wallet = useSelector((state: RootState) => state.wallet);
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const login = async () => {
    const userAddress = await connectWallet(true);
    dispatch(setUserAddress({ account: userAddress }));
  };
  //   const dispatch = useAppDispatch();
  //   const { user } = useAppSelector((state) => state.account.walletConfig);
  //   const { walletLogin } = useAppSelector((state) => state.walletLogin);
  // const handleConnectWallet = async () => {
  //     await dispatch(connectWallet())
  // }
  let micheline_sc_params_string = JSON.stringify({
    entrypoint: "buy",
    value: {
      prim: "Pair",
      args: [{ string: wallet.userAddress }, { int: "1000000" }],
    },
  })
    .split("")
    .map((c: any) => c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");

  //   const signedData = signSmartContractData(
  //     {
  //       address: "tz1T2uyYTshSGrEg13VGJFqsWwbi2H175hZb",
  //       commodity: "ATF",
  //       commodity_amount: 1,
  //       pk_id: "key1",
  //       sc_address: process.env.SWAP_CONTRACT_ADDRESS!,
  //       sc_id: v4(),
  //       sc_input_data: micheline_sc_params_string,
  //     },
  //     process.env.WERT_PRIVATE_KEY!
  //   );

  return (
    <>
      <Flex justifyContent={"center"} mt={20}>
        <Button onClick={() => onOpen()}>Get ATF Token </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w='100%' px={0}>
          <ModalHeader>Buy ATF Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody w='100%' px={0}>
            <Box overflowX={"hidden"} w='100%' h='500px'>
              {!isWalletConect ? (
                <Flex flexDirection={"column"} alignItems='center'>
                  <Text>Connect Web3 Wallet</Text>
                  <Text>
                    A connected Web3 wallet is needed to purchase ATF tokens and
                    interact with the shop.
                  </Text>
                  <Flex>
                    <Button onClick={() => login()}>
                      Connect Web3Auth Wallet
                    </Button>
                  </Flex>
                </Flex>
              ) : (
                // wertWidget.mount()
                <WertModule
                  //   className='h-[450px]'
                  options={{
                    commodity_amount: 1,
                    commodity: "ATF",
                    network: "ghostnet",
                    partner_id: process.env.WERT_PARTNER_ID!,
                    origin: process.env.WERT_ORIGIN!,
                    theme: "white",
                    address: wallet.userAddress,

                    // width: 400,
                    height: 500,
                    listeners: {
                      error: (name: any, message: any) => console.log(name),
                      "payment-status": async (tx: String) => {
                        if ((tx as any).status == "success") {
                          toast.success("Transaction Successful");
                          onClose();
                          //   let userToken = (walletLogin as any)?.isValidLogin
                          //     ? (walletLogin as any)?.token
                          //     : user.token;
                          //   dispatch(
                          //     setBalances({
                          //       atfBalance: await getATFBalance(userToken),
                          //       apBalance: await getAPBalance(userToken),
                          //     })
                          //   );
                        }
                      },
                    },
                  }}
                />
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Wert;
