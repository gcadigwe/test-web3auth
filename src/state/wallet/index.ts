import { createSlice } from "@reduxjs/toolkit";
import { Web3Auth } from "@web3auth/modal";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { DAppClient } from "@airgap/beacon-sdk";

interface walletInfoType {
  web3auth: Web3Auth | null;
  web3authprovider: SafeEventEmitterProvider | null;
  beacondappclient: DAppClient | null;
  userAddress: string;
}

const initialState: walletInfoType = {
  web3authprovider: null,
  beacondappclient: null,
  web3auth: null,
  userAddress: "",
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWeb3authProvider(state, action) {
      state.web3authprovider = action.payload.provider;
    },
    setBeaconDappClient(state, action) {
      state.beacondappclient = action.payload.beaconclient;
    },
    setUserAddress(state, action) {
      state.userAddress = action.payload.account;
    },
    setWeb3Auth(state, action) {
      state.web3auth = action.payload.web3auth;
    },
  },
});

export const {
  setWeb3authProvider,
  setBeaconDappClient,
  setUserAddress,
  setWeb3Auth,
} = walletSlice.actions;

export default walletSlice.reducer;
