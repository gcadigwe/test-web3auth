import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { INFTDATA } from "../pages/nft/[id]";
// import { RootState } from "../state/store";
import { fetchNFTById, fetchNfts, fetchNftsByUser } from "../utils/api/nft";

export function useFetchNfts() {
  const [nfts, setnfts] = useState<any>();
  const [mintednfts, setmintednfts] = useState<any>();

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchNfts();
      // const nft = await fetchListedNFTs();
      // setmintednfts(nft);
      // console.log("nft", nft);
      setnfts(data);
    };

    fetch();
  }, []);

  return { nfts, mintednfts };
}

export const useFetchNftById = (id: string) => {
  const [nft, setnft] = useState<INFTDATA>();

  useEffect(() => {
    const fetch = async () => {
      try {
        const nft = await fetchNFTById(id);
        setnft(nft);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [id]);

  return { nft };
};

export const useFetchNFTByUser = (refresh: boolean) => {
  const [nfts, setnfts] = useState<INFTDATA[]>();
  const userAddress = "";
  //   useSelector((state: RootState) => state.wallet);

  useEffect(() => {
    const fetch = async () => {
      try {
        const nfts = await fetchNftsByUser(userAddress);
        setnfts(nfts);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [userAddress, refresh]);

  return { nfts };
};
