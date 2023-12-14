import { web3auth } from "./components/AppWrap";
import { hex2buf } from "@taquito/utils";
import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";
const tezosCrypto =
  typeof window !== "undefined"
    ? require("@tezos-core-tools/crypto-utils")
    : undefined;

export const Tezos = new TezosToolkit("https://ghostnet.ecadinfra.com");
export const connectWallet = async (isWeb3Auth: boolean) => {
  try {
    let user = {};
    let activeAccount: any;
    let userAddress: any;

    if (isWeb3Auth) {
      const provider = (await web3auth?.connect())!;
      console.log(await web3auth?.getUserInfo());
      const privateKey = (await provider.request({
        method: "private_key",
      })) as string;
      const keyPair = tezosCrypto.utils.seedToKeyPair(hex2buf(privateKey));
      activeAccount = {
        address: keyPair.pkh,
        publicKey: keyPair.pk,
        sk: keyPair.sk,
      };
      userAddress = activeAccount.address;
      console.log(activeAccount);
      Tezos.setSignerProvider(await InMemorySigner.fromSecretKey(keyPair?.sk));
      return userAddress;
    }
  } catch (error) {
    console.log(error);
    //   dispatch({
    //     type: actions.CONNECT_WALLET_ERROR,
    //   });
  }
};
