import { useEffect, useState } from "react";

function getValue() {
  return localStorage.getItem("Web3Auth-cachedAdapter");
}

export const useLocalStorage = () => {
  const [value, setValue] = useState(getValue());

  useEffect(() => {
    if (!value) {
      localStorage.setItem("Web3Auth-cachedAdapter", "openlogin");
      setValue("openlogin");
    }
  }, []);

  return value;
};
