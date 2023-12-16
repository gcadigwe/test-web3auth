import { web3auth } from "./components/AppWrap";
import { hex2buf } from "@taquito/utils";
import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";
import { loginWallet } from "./utils/api/user";
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
      await login(activeAccount, true);
      return userAddress;
    }
  } catch (error) {
    console.log(error);
    //   dispatch({
    //     type: actions.CONNECT_WALLET_ERROR,
    //   });
  }
};

export const login = async (
  accountInfo: {
    address: string;
    publicKey: string;
    sk: string;
  },
  isWeb3Auth: boolean
) => {
  try {
    if (isWeb3Auth) {
      const { sk, address, publicKey } = accountInfo;
      const signer = new InMemorySigner(sk);
      const message =
        "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";

      const signature = await signer.sign(message);
      const loginRes = await loginWallet({
        address,
        publicKey,
        message,
        signature: signature.sig,
      });
      return true;
    }
  } catch (error) {
    return error;
  }
};
