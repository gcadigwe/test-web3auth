import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import { Web3Auth } from "@web3auth/modal";
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
// import RPC, { tezos } from "../../../utils/tezosRPC";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   setWeb3Auth,
//   setWeb3authProvider,
//   setUserAddress,
//   setBeaconDappClient,
// } from "../../../state/wallet";
import { RootState } from "../../../state/store";
// import { DAppClient, TezosOperationType } from "@airgap/beacon-sdk";
// import { dAppClient, walletInstance } from "../../../utils/beacon";
import { verifySignature, b58cencode } from "@taquito/utils";
// import { loginWallet, shortenAddress } from "../../../utils/functions";
import jwtDecode from "jwt-decode";
// import BeaconRPC, { Tezos } from "../../../utils/beaconRPC";
// import { NetworkType, SigningType } from "@airgap/beacon-sdk";
import { TezosToolkit } from "@taquito/taquito";
// import { BeaconWallet } from "@taquito/beacon-wallet";

interface ConnectTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectTypeModal({
  isOpen,
  onClose,
}: ConnectTypeModalProps) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  // const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  // const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
  //   null
  // );
  const [account, setAccount] = useState("");

  const { userAddress } = useSelector((state: RootState) => state.wallet);

  const dispatch = useDispatch();

  // useEffect(() => {
  const connect = async () => {
    if (localStorage.getItem("connectoratf") === "beaconsdk") {
      // loginWithBeacon();
      // const activeAccount = await dAppClient.getActiveAccount();
      // if (activeAccount) {
      //   console.log("Already connected:", activeAccount.address);
      //   dispatch(setUserAddress({ account: activeAccount.address }));
      //   dispatch(setBeaconDappClient({ beaconclient: dAppClient }));
      // } else {
      //   const permissions = await dAppClient.requestPermissions();
      //   console.log("permissions", permissions);
      //   console.log("New connection:", permissions.address);
      //   dispatch(setUserAddress({ account: permissions.address }));
      //   dispatch(setBeaconDappClient({ beaconclient: dAppClient }));
      // }
    }
  };
  // connect();
  // }, []);

  const disconnect = async () => {
    try {
      if (localStorage.getItem("connectoratf") === "web3auth") {
      } else if (localStorage.getItem("connectoratf") === "beaconsdk") {
        localStorage.removeItem("atfmarketplaceToken");
        localStorage.removeItem("connectoratf");
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log("provider", account);

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{account}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {!userAddress ? (
              <Flex alignItems={"center"} flexDirection={"column"}>
                <>
                  <Flex
                    mb={5}
                    onClick={() => {
                      // login();
                      onClose();
                    }}
                  >
                    <Button>
                      <Text>Connect with Web3 Auth</Text>
                    </Button>
                  </Flex>
                  <Flex onClick={() => {}}>
                    <Button>
                      <Text>Connect with Beacon SDK</Text>
                    </Button>
                  </Flex>
                </>
              </Flex>
            ) : (
              <Flex alignItems={"center"} flexDirection={"column"}>
                <>
                  <Flex onClick={() => disconnect()}>
                    <Button>
                      <Text>Disconnect</Text>
                    </Button>
                  </Flex>
                </>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
