import { Flex, Img, Text, useMediaQuery } from "@chakra-ui/react";
import AVATAR from "../../../public/avatar1.png";
import styles from "../../styles/Home.module.css";

export const Landing = () => {
  const [isMobileDevice] = useMediaQuery("(max-width: 659px)");
  return (
    <Flex mt={10} alignItems={"center"} justifyContent={"center"}>
      {/* <Flex mt={10}>
        <Img display={isMobileDevice ? "none" : undefined} src={AVATAR.src} />
      </Flex> */}
      <Flex
        // fontWeight={"800"}
        // fontSize={"30px"}
        flexDirection={"column"}
        textAlign={"center"}
        lineHeight={"1.4"}
      >
        <Text
          fontSize={{
            sm: "40px",
            smd: "42px",
            md: "50px",
            lg: "60px",
            xl: "70px",
          }}
          fontFamily={"winnersansbd"}
          className={styles.strokeHero}
        >
          A FAN-CENTRIC
        </Text>
        <Text
          fontSize={{
            sm: "40px",
            smd: "42px",
            md: "50px",
            lg: "60px",
            xl: "70px",
          }}
          fontFamily={"winnersansbd"}
          color='white'
        >
          DIGITAL
        </Text>
        <Text
          fontSize={{
            sm: "40px",
            smd: "42px",
            md: "50px",
            lg: "60px",
            xl: "70px",
          }}
          fontFamily={"winnersansbd"}
          color='white'
        >
          ECOSYSTEM
        </Text>

        <Text
          color='#ffffff'
          fontSize={{
            sm: "14px",
            smd: "14px",
            md: "14px",
            lg: "16px",
            xl: "16px",
          }}
        >
          Lorem ipsum dolor sit amet, consetetur <br />
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore.
        </Text>

        <Flex py={10} justifyContent={"center"}>
          <Flex
            borderRadius={"25px"}
            px={5}
            py={4}
            justifyContent={"center"}
            bgColor={"white"}
          >
            <Text className={styles.button}>ALL PRODUCTS</Text>
          </Flex>
        </Flex>
      </Flex>
      {/* <Flex mt={10} display={isMobileDevice ? "none" : undefined}>
        <Img src={AVATAR.src} />
      </Flex> */}
    </Flex>
  );
};
