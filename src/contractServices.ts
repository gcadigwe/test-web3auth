import { Tezos } from "./walletActions";

let marketplace_contract_address = process.env.MARKETPLACE_CONTRACT_ADDRESS;
let atf_token_contract_address = process.env.ATF_TOKEN_CONTRACT_ADDRESS;
let ap_token_contract_address = process.env.ACTION_CONTRACT_ADDRESS;
let marketplace_contract = Tezos.wallet.at(marketplace_contract_address!);
let atf_token_contract = Tezos.contract.at(atf_token_contract_address!);
let ap_token_contract = Tezos.contract.at(ap_token_contract_address!);

export const buy = async () => {
  try {
    console.log("commencing");
    let atf_token_methods = (await atf_token_contract).methodsObject;
    let ap_token_methods = (await ap_token_contract).methodsObject;

    let batch = Tezos.wallet.batch([]);

    batch.withContractCall(
      atf_token_methods.approve({
        value: 0,
        spender: marketplace_contract_address,
      }) as any
    );

    const tx = await (await batch.send()).confirmation();

    if (tx?.completed) {
      console.log("successful");
    }
  } catch (err) {
    console.log(err);
  }
};
