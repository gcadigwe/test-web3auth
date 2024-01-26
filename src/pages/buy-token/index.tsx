import Wert from "@/components/WertModal";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SSOComponent from "@/components/sso/SSOComponent";

export default function BuyToken() {
  const wallet = useSelector((state: RootState) => state.wallet);
  const router = useRouter();
  const { session, type } = router.query;

  return (
    <Flex
      fontFamily={"gelionmd"}
      justifyContent={"center"}
      color='white'
      blur='8px'
      minH='100vh'
      background='linear-gradient(90deg, rgba(101,241,216,0.8814119397759104) 0%, rgba(0,0,0,0.9990589985994398) 0%, rgba(101,38,94,0.9710477941176471) 100%)'
      pt={10}
      pb={10}
      //   px={4}
    >
      <SSOComponent sessionId={session as string} type={type as string} />
      <Wert isWalletConect={wallet.userAddress ? true : false} />{" "}
    </Flex>
  );
}
