import axios from "axios";

export const loginWallet = async (loginDetails: {
  address: string;
  publicKey: string;
  message: string;
  signature: string;
}) => {
  try {
    console.log("happen before login");

    const response = await axios.post(`${process.env.API_URL}login-wallet`, {
      loginDetails,
    });

    console.log("happen login response1", response);

    localStorage.setItem("atfmarketplaceToken", response.data.token);
  } catch (err) {
    console.log("happen error", err);
    console.log(err);
  }
};
