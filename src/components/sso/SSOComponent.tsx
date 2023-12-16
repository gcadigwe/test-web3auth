import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../state/hooks";
// import { connectWallet } from "../state/walletActions";
import { buildWeb3AuthConnection, decryptSessionId } from "../../utils";
import { connectWallet } from "@/walletActions";

const SSOComponent = ({
  sessionId,
  type,
}: {
  sessionId: string;
  type: string;
}) => {
  //   const dispatch = useAppDispatch();
  //   const { walletLogin, account }: any = useAppSelector(
  //     (state) => state.walletLogin
  //   );

  //   const { walletConfig }: any = useAppSelector((state) => state.account);
  //   useEffect(() => {
  //     if (!walletConfig.user.userAddress) {
  //       const connect = async () => {
  //         const handleConnectWallet = async (isWeb3Auth: boolean) => {
  //           await dispatch(connectWallet(walletLogin, isWeb3Auth));
  //         };
  //         console.log("path", sessionId);
  //         // if (window?.localStorage?.getItem("openlogin_store") && sessionId) {
  //         //   await handleConnectWallet(true);
  //         // } else

  //         if (sessionId && type) {
  //           const decodedSessionId = decryptSessionId(sessionId);
  //           const result = buildWeb3AuthConnection(
  //             decodedSessionId as string,
  //             type as string
  //           );
  //           console.log("decoded", decodedSessionId);
  //           window?.localStorage.setItem(
  //             "openlogin_store",
  //             JSON.stringify(result)
  //           );
  //           window?.localStorage.setItem("Web3Auth-cachedAdapter", "openlogin");
  //           await handleConnectWallet(true);
  //         }
  //       };

  //       connect();
  //     }
  //   }, [sessionId]);

  return <div className='hidden'>sso</div>;
};

export default SSOComponent;
