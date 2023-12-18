import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../state/hooks";
// import { connectWallet } from "../state/walletActions";
import { buildWeb3AuthConnection, decryptSessionId } from "../../utils";
import { connectWallet } from "@/walletActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setUserAddress } from "@/state/wallet";

const SSOComponent = ({
  sessionId,
  type,
}: {
  sessionId: string;
  type: string;
}) => {
  const dispatch = useDispatch();
  const { userAddress } = useSelector((state: RootState) => state.wallet);

  //   const { walletConfig }: any = useAppSelector((state) => state.account);
  useEffect(() => {
    if (!userAddress) {
      const connect = async () => {
        const handleConnectWallet = async (isWeb3Auth: boolean) => {
          const connectedUser = await connectWallet(true);
          dispatch(setUserAddress({ account: connectedUser }));
        };
        console.log("path", sessionId);
        // if (window?.localStorage?.getItem("openlogin_store") && sessionId) {
        //   await handleConnectWallet(true);
        // } else

        if (sessionId && type) {
          const decodedSessionId = decryptSessionId(sessionId);
          const result = buildWeb3AuthConnection(
            decodedSessionId as string,
            type as string
          );
          console.log("decoded", decodedSessionId);
          window?.localStorage.setItem(
            "openlogin_store",
            JSON.stringify(result)
          );
          window?.localStorage.setItem("Web3Auth-cachedAdapter", "openlogin");
          await handleConnectWallet(true);
        }
      };

      connect();
    }
  }, [sessionId]);

  return <div style={{ color: "white" }}>sso</div>;
};

export default SSOComponent;
