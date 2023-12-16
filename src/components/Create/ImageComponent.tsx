import { Flex, Img, Icon } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

import { Dispatch, SetStateAction } from "react";

export default function ImageComponent({
  image,
  setimageUrl,
}: {
  image: { secure_url: string; public_id: string };
  setimageUrl: () => void;
}) {
  return (
    <Flex
      position={"relative"}
      w='fit-content'
      mt={5}
      flexDirection={"column"}
      mr={5}
    >
      <Flex
        cursor={"pointer"}
        right={-1}
        top={-2}
        borderRadius='20px'
        position={"absolute"}
        mb={13}
        p={1}
        bgColor={"red"}
      >
        <Icon as={AiOutlineClose} />
      </Flex>
      <Flex border='1px solid white' flexDirection={"column"}>
        <Img h='80px' src={image?.secure_url} />
      </Flex>
    </Flex>
  );
}
