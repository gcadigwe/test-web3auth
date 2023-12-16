import { Flex, Img, Icon } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

import { Dispatch, SetStateAction } from "react";

export default function ImagePreviewer({
  images,
  removeImage,
}: {
  images: any[];
  removeImage: (index: number) => void;
}) {
  return (
    <Flex>
      {images?.map((image, index) => (
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
            onClick={() => {
              removeImage(index);
            }}
          >
            <Icon as={AiOutlineClose} />
          </Flex>
          <Flex border='1px solid white' flexDirection={"column"}>
            <Img h='80px' src={image} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}
