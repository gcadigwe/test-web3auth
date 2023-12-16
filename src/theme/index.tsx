import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "300px",
  smd: "420px",
  md: "660px",
  lg: "1100px",
  xl: "1800px",
  //   "2xl": "1536px",
};

const theme = extendTheme({
  fonts: {
    heading: `'Gelion-Bold', sans-serif`,
    body: `'Gelion-Bold', sans-serif`,
  },
  breakpoints,
});

export default theme;
