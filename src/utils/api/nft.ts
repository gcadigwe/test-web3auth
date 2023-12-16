import axios from "axios";

export const fetchNFTById = async (id: string) => {
  try {
    const response = await axios.post(`${process.env.API_URL}fetch-nft-by-id`, {
      id,
    });

    console.log("response", response);

    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchNfts = async () => {
  try {
    const response = await axios.get(`${process.env.API_URL}fetch-nfts`);

    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchNftsByUser = async (address: string) => {
  try {
    const response = await axios.post(`${process.env.API_URL}fetch-user-nfts`, {
      address: address,
    });

    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const sendImageToIpfs = async (id: number) => {
  try {
    const response = await axios.post(`${process.env.API_URL}send-image-ipfs`, {
      id: id,
    });

    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const updatedSold = async (id: number, amount: number) => {
  try {
    const response = await axios.post(`${process.env.API_URL}update-sold`, {
      id: id,
      amount: amount,
    });

    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const listAuction = async (auctionDetails: any) => {
  const token = localStorage.getItem("atfmarketplaceToken");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${process.env.API_URL}list-auction`,
      {
        auctionDetails,
      },
      config
    );

    return response;

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const createCollection = async (createDetails: any) => {
  const token = localStorage.getItem("atfmarketplaceToken");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${process.env.API_URL}create-collection`,
      {
        createDetails,
      },
      config
    );

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const uploadImage = async (image: any) => {
  try {
    const base64 = await convertBase64(image);
    const response = await axios.post(`${process.env.API_URL}upload-image`, {
      image: base64,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const convertBase64 = async (file: any) => {
  const base64Array = [];
  for (let i = 0; i < file.length; i++) {
    const base64 = await new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file[i]);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    base64Array.push(base64);
  }
  return base64Array;
};

export const listSingleFixedFile = async (
  createDetails: any,
  thumbnail: any,
  file: any
) => {
  try {
    console.log(file);
    var bodyFormData = new FormData();
    if (file.type === "image/png") {
      bodyFormData.append("image", file);
      bodyFormData.append("thumbnail", thumbnail);
      bodyFormData.append("createDetails", JSON.stringify(createDetails));

      const token = localStorage.getItem("atfmarketplaceToken");
      const response = await axios({
        method: "post",
        url: `${process.env.API_URL}list-video-nft`,
        data: bodyFormData,

        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    } else {
      bodyFormData.append("video", file);
      bodyFormData.append("thumbnail", thumbnail);
      bodyFormData.append("createDetails", JSON.stringify(createDetails));

      const token = localStorage.getItem("atfmarketplaceToken");
      const response = await axios({
        method: "post",
        url: `${process.env.API_URL}list-video-nft`,
        data: bodyFormData,

        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateNFTAfterSale = async (id: any) => {
  const token = localStorage.getItem("atfmarketplaceToken");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(
      `${process.env.API_URL}update-nft`,
      {
        id,
      },
      config
    );

    return response;
  } catch (err) {
    console.log(err);
  }
};
