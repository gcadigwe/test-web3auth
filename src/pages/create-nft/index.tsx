import {
  Select,
  Flex,
  Text,
  Input,
  Button,
  Textarea,
  Icon,
  Spinner,
  Img,
  useMediaQuery,
  Switch,
} from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
import { useRef, useState } from "react";
import { AiFillFileAdd, AiFillEdit } from "react-icons/ai";
import { uploadImage, listSingleFixedFile } from "../../utils/api/nft";
import ImageComponent from "../../components/Create/ImageComponent";
import { createCollection, listAuction } from "../../utils/api/nft";
import DatePicker from "../../components/Create/DatePicker";
import { toast } from "react-toastify";
import axios from "axios";
import { Player } from "video-react";
import ImagePreviewer from "../../components/Create/ImagePreview";
import { useRouter } from "next/router";

enum FileType {
  "NONE" = "0",
  "JPG/PNG" = "1",
  "MP4" = "2",
}

enum Attributes {
  "NONE" = "NONE",
  "Chest" = "Chest",
  "Legs" = "Legs",
  "Feet" = "Feet",
}

export default function CreateNFT() {
  const hiddenFileInput = useRef<any>(null);
  const hiddenThumbnailInput = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [imageurl, setimageUrl] = useState<{
    secure_url: string;
    public_id: string;
  }>({
    secure_url: "",
    public_id: "",
  });
  const [collectionimageurls, setcollectionimageUrls] =
    useState<Array<{ secure_url: string; public_id: string }>>();
  const [nftType, setnftType] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [minimumBid, setMinimumBid] = useState("");
  const [maximumBid, setMaximumBid] = useState("");
  const [nftAmount, setnftAmount] = useState(1);
  const [fileType, setfileType] = useState(FileType["NONE"]);
  const [uploadedPreviewFile, setuploadedPreviewFile] = useState<any>();
  const [uploadedFile, setuploadedFile] = useState<any>();
  const [thumbnailFile, setthumbnailFile] = useState<any>();
  const [thumbnailPreviewFile, setthumbnailPreviewFile] = useState<any>();
  const [transactionLoading, setTransactionLoading] = useState(false);

  const [startTime, setstartTime] = useState(new Date());

  const [endTime, setEndTime] = useState(new Date());

  const [selectedPriceType, setselectedPriceType] = useState("");

  const [isMobileDevice] = useMediaQuery("(max-width: 659px)");

  const [attributeType, setAttributeType] = useState(Attributes["NONE"]);
  const [isWearable, setisWearable] = useState(false);
  const [attributeValue, setattributeValue] = useState("");
  const router = useRouter();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleThumbnailSelect = () => {
    hiddenThumbnailInput.current.click();
  };

  // console.log(Math.round(startTime.getTime() / 1000));

  const handleThumbnailChange = async (event: any) => {
    const thumbnail = event.target.files[0];
    setthumbnailFile(thumbnail);
    setthumbnailPreviewFile(URL.createObjectURL(thumbnail));
    hiddenThumbnailInput.current.value = null;
  };

  const handleChange = async (event: any) => {
    try {
      if (nftType === "unique") {
        setLoading(true);
        const fileUploaded = event.target.files[0];
        console.log("uploaded", fileUploaded);
        if (fileUploaded.type == "video/mp4") {
          var url = URL.createObjectURL(fileUploaded);
          setuploadedPreviewFile(url);
          setuploadedFile(fileUploaded);
          setLoading(false);
        } else {
          var url = URL.createObjectURL(fileUploaded);
          console.log("url", url);
          setuploadedPreviewFile(url);
          setuploadedFile(fileUploaded);
          setLoading(false);
          // setimageUrl({ url: url.secure_url, public_id: url.public_id });
        }
      } else {
        setLoading(true);
        const fileUploaded = event.target.files;
        console.log("uploaded", fileUploaded);
        const url = await uploadImage(fileUploaded);
        console.log(url);

        if (collectionimageurls) {
          url?.map((item: any) =>
            setcollectionimageUrls((prev) => [
              ...(prev as Array<{ secure_url: string; public_id: string }>),
              { secure_url: item.secure_url, public_id: item.public_id },
            ])
          );
        } else {
          setcollectionimageUrls(url);
        }
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createNFT = async () => {
    setTransactionLoading(true);
    if (nftType === "unique") {
      if (selectedPriceType == "Fixed") {
        if (fileType == FileType["MP4"]) {
          const response = await listSingleFixedFile(
            {
              name,
              description,
              price_type: selectedPriceType,
              price,
              minimum_bid: minimumBid,
              maximum_bid: maximumBid,
              wearable: isWearable,
            },
            thumbnailFile,
            uploadedFile
          );

          if (response?.status == 200) {
            toast.success(response.data.msg);
          }

          setTransactionLoading(false);
        } else {
          console.log("image");
          const response = await listSingleFixedFile(
            {
              name,
              description,
              price_type: selectedPriceType,
              price,
              minimum_bid: minimumBid,
              maximum_bid: maximumBid,
              wearable: isWearable,
              feature: attributeType,
              featureValue: attributeValue,
            },
            uploadedFile,
            uploadedFile
          );

          if (response?.status == 200) {
            toast.success(response.data.msg);
          }

          setTransactionLoading(false);
          router.push("/");
        }
      } else {
        const response = await listAuction({
          name,
          description,
          price_type: selectedPriceType,
          price,
          minimum_bid: minimumBid,
          maximum_bid: maximumBid,
          images: [imageurl.secure_url],
          amount: nftAmount,
          startTime: Math.round(startTime.getTime() / 1000),
          endTime: Math.round(endTime.getTime() / 1000),
        });

        if (response?.data.status == true) {
          toast.success("✅ Auction has been successfully created and listed");
        } else {
          toast.error("An error occurred");
        }
      }
    } else {
      const images = [];

      if (collectionimageurls) {
        for (let i = 0; i < collectionimageurls?.length; i++) {
          images.push(collectionimageurls[i].secure_url);
        }
      }

      const response = await createCollection({
        name,
        description,
        images,
        price,
      });

      console.log(response);
    }
  };

  return (
    <Flex
      className={styles.gelionmd}
      justifyContent={"center"}
      color='white'
      blur='8px'
      minH='100vh'
      background='linear-gradient(90deg, rgba(101,241,216,0.8814119397759104) 0%, rgba(0,0,0,0.9990589985994398) 0%, rgba(101,38,94,0.9710477941176471) 100%)'
      pt={10}
      pb={10}
    >
      <Flex flexDirection={"column"} h='100%'>
        <Text
          textAlign={"center"}
          fontSize={{
            sm: "18px",
            smd: "20px",
            md: "22px",
            lg: "24px",
            xl: "26px",
          }}
          fontFamily='winnersansbd'
        >
          Create New NFT
        </Text>

        <Flex
          mt={10}
          flexDirection='column'
          w={{
            sm: "300px",
            smd: "300px",
            md: "320px",
            lg: "420px",
            xl: "500px",
          }}
        >
          <Text mb={2} fontSize={"20px"}>
            NFT Type
          </Text>
          <Select
            onChange={(e) => setnftType(e.target.value)}
            placeholder='Select NFT Type'
          >
            <option value='collection'>Collection</option>
            <option value='unique'>Unique</option>
          </Select>
        </Flex>

        {nftType === "unique" ? (
          <>
            <Flex mt={5} justifyContent={"center"} flexDirection='column'>
              <Flex alignItems={"center"}>
                <Text mb={2} fontSize={"20px"}>
                  Name
                </Text>
                <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                  *
                </Text>
              </Flex>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                w={{
                  sm: "300px",
                  smd: "300px",
                  md: "320px",
                  lg: "420px",
                  xl: "500px",
                }}
              />
            </Flex>
            <Flex mt={5} justifyContent={"center"} flexDirection='column'>
              <Flex alignItems={"center"}>
                <Text mb={2} fontSize={"20px"}>
                  Description
                </Text>
                <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                  *
                </Text>
              </Flex>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                h='100'
                w={{
                  sm: "300px",
                  smd: "300px",
                  md: "320px",
                  lg: "420px",
                  xl: "500px",
                }}
              />
            </Flex>

            <Flex mt={5} justifyContent={"center"} flexDirection='column'>
              <Flex flexDirection={"column"} mb={5}>
                <Flex alignItems={"center"}>
                  <Text mb={2} fontSize={"20px"}>
                    File Type
                  </Text>
                  <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                    *
                  </Text>
                </Flex>

                <Select
                  onChange={(e) =>
                    setfileType(
                      e.target.value == "0"
                        ? FileType["NONE"]
                        : e.target.value == "1"
                        ? FileType["JPG/PNG"]
                        : FileType["MP4"]
                    )
                  }
                >
                  <option value={FileType["NONE"]}>Select File Type</option>
                  <option value={FileType["JPG/PNG"]}>.PNG/.JPG</option>
                  <option value={FileType["MP4"]}>.MP4</option>
                </Select>
              </Flex>

              <Flex flexDirection={"column"} mb={2}>
                <Flex alignItems={"center"}>
                  <Text mb={2} fontSize={"20px"}>
                    Wearable?
                  </Text>
                  <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                    *
                  </Text>
                </Flex>

                <Switch
                  colorScheme={"purple"}
                  size='lg'
                  onChange={(e) => {
                    setisWearable(e.target.checked);
                  }}
                />
              </Flex>
              <Flex mb={5} display={isWearable ? undefined : "none"}>
                <Flex gap={2}>
                  <Select
                    onChange={(e) => {
                      console.log(e.target.value);
                      setAttributeType(e.target.value as any);
                    }}
                  >
                    <option value={Attributes["NONE"]}>Attributes</option>
                    <option value={Attributes["Chest"]}>Chest</option>
                    <option value={Attributes["Legs"]}>Legs</option>
                    <option value={Attributes["Feet"]}>Feet</option>
                  </Select>

                  <Input
                    value={attributeValue}
                    onChange={(e) => setattributeValue(e.target.value)}
                    placeholder='Value'
                    _placeholder={{ color: "white" }}
                  />
                </Flex>
              </Flex>

              <Flex alignItems={"center"}>
                <Text mb={2} fontSize={"20px"}>
                  Upload File
                </Text>
                <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                  *
                </Text>
              </Flex>
              <Input
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
                type={"file"}
                accept='.png,.jpg,.mp4'
              />

              <Input
                ref={hiddenThumbnailInput}
                onChange={handleThumbnailChange}
                style={{ display: "none" }}
                type={"file"}
                accept='.png,.jpg,.mp4'
              />
              <Flex alignItems={"center"} mb={5}>
                <Button
                  isDisabled={fileType === FileType["NONE"]}
                  onClick={() => handleClick()}
                  border='1px solid white'
                  bgColor={"transparent"}
                  _hover={{
                    bgColor: "transparent",
                  }}
                  _active={{
                    bgColor: "transparent",
                  }}
                  w='30%'
                  px={0}
                >
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Icon mr={2} as={AiFillFileAdd} />
                    <Text>Select File</Text>
                  </Flex>
                </Button>
                {loading && <Spinner ml={2} />}
                {imageurl && (
                  <Icon
                    onClick={() => handleClick()}
                    w='24px'
                    h='24px'
                    ml={2}
                    as={AiFillEdit}
                  />
                )}
              </Flex>
              {uploadedFile?.type === "image/png" && (
                <Img w='250px' h='250px' src={uploadedPreviewFile} />
              )}

              {uploadedFile?.type === "video/mp4" && (
                <Player
                  src={uploadedPreviewFile}
                  fluid={false}
                  playsInline
                  width={480}
                  height={272}
                />
              )}
            </Flex>

            {fileType === FileType["MP4"] && (
              <Flex mt={4} flexDirection={"column"}>
                <Flex alignItems={"center"}>
                  <Text mb={2} fontSize={"20px"}>
                    Upload thumbnail
                  </Text>
                  <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                    *
                  </Text>
                </Flex>

                <Button
                  onClick={() => handleThumbnailSelect()}
                  border='1px solid white'
                  bgColor={"transparent"}
                  _hover={{
                    bgColor: "transparent",
                  }}
                  _active={{
                    bgColor: "transparent",
                  }}
                  w='30%'
                  px={0}
                >
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Icon mr={2} as={AiFillFileAdd} />
                    <Text>Select File</Text>
                  </Flex>
                </Button>
              </Flex>
            )}

            {fileType === FileType["MP4"] && thumbnailPreviewFile && (
              <ImagePreviewer
                images={[thumbnailPreviewFile]}
                removeImage={() => {
                  setthumbnailFile(null);
                  setthumbnailPreviewFile(null);
                }}
              />
            )}
            <Flex mt={5} flexDirection='column'>
              <Flex alignItems={"center"}>
                <Text mb={2} fontSize={"20px"}>
                  Price Type
                </Text>
                <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                  *
                </Text>
              </Flex>
              <Select
                onChange={(e) => setselectedPriceType(e.target.value)}
                placeholder='Select Price Type'
              >
                <option value='Fixed'>Fixed Price</option>
                <option value='Aution'>Auction</option>
              </Select>
            </Flex>

            {selectedPriceType === "Fixed" ? (
              <Flex mt={5} justifyContent={"center"} flexDirection='column'>
                <Flex alignItems={"center"}>
                  <Text mb={2} fontSize={"20px"}>
                    Price
                  </Text>
                  <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                    *
                  </Text>
                </Flex>
                <Input
                  value={price}
                  onChange={(e) => {
                    const regex = /^\d+$/;

                    if (regex.test(e.target.value) || e.target.value === "") {
                      setPrice(e.target.value);
                    }
                  }}
                  w={{
                    sm: "300px",
                    smd: "300px",
                    md: "320px",
                    lg: "420px",
                    xl: "500px",
                  }}
                />
              </Flex>
            ) : selectedPriceType === "Aution" ? (
              <>
                <Flex mt={5} flexDirection='column'>
                  <Flex alignItems={"center"}>
                    <Text mb={2} fontSize={"20px"}>
                      Start Time
                    </Text>
                    <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                      *
                    </Text>
                  </Flex>
                  <DatePicker value={startTime} onChange={setstartTime} />
                </Flex>

                <Flex mt={5} flexDirection='column'>
                  <Flex alignItems={"center"}>
                    <Text mb={2} fontSize={"20px"}>
                      End Time
                    </Text>
                    <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                      *
                    </Text>
                  </Flex>
                  <DatePicker value={endTime} onChange={setEndTime} />
                </Flex>

                <Flex mt={5} justifyContent={"center"} flexDirection='column'>
                  <Flex alignItems={"center"}>
                    <Text mb={2} fontSize={"20px"}>
                      Minimum Bid
                    </Text>
                    <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                      *
                    </Text>
                  </Flex>
                  <Input
                    value={minimumBid}
                    onChange={(e) => {
                      const regex = /^\d+$/;

                      if (regex.test(e.target.value) || e.target.value === "") {
                        setMinimumBid(e.target.value);
                      }
                    }}
                    w={{
                      sm: "300px",
                      smd: "300px",
                      md: "320px",
                      lg: "420px",
                      xl: "500px",
                    }}
                  />
                </Flex>
                <Flex mt={5} justifyContent={"center"} flexDirection='column'>
                  <Flex alignItems={"center"}>
                    <Text mb={2} fontSize={"20px"}>
                      Maximum Bid
                    </Text>
                    <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                      *
                    </Text>
                  </Flex>
                  <Input
                    value={maximumBid}
                    onChange={(e) => {
                      const regex = /^\d+$/;

                      if (regex.test(e.target.value) || e.target.value === "") {
                        setMaximumBid(e.target.value);
                      }
                    }}
                    w={{
                      sm: "300px",
                      smd: "300px",
                      md: "320px",
                      lg: "420px",
                      xl: "500px",
                    }}
                  />
                </Flex>

                <Flex mt={5} justifyContent={"center"} flexDirection='column'>
                  <Flex alignItems={"center"}>
                    <Text mb={2} fontSize={"20px"}>
                      NFT Amount
                    </Text>
                    <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                      *
                    </Text>
                  </Flex>
                  <Input
                    value={nftAmount}
                    type={"number"}
                    onChange={(e) => {
                      setnftAmount(parseFloat(e.target.value));
                      // const regex = /^\d+$/;

                      // if (regex.test(e.target.value) || e.target.value === "") {
                      //   setMaximumBid(e.target.value);
                      // }
                    }}
                    w={{
                      sm: "300px",
                      smd: "300px",
                      md: "320px",
                      lg: "420px",
                      xl: "500px",
                    }}
                  />
                </Flex>
              </>
            ) : null}
            <Button onClick={() => createNFT()} mt={10} color='#2B2C2E'>
              {transactionLoading ? <Spinner /> : "Create and List NFT"}
            </Button>
          </>
        ) : nftType === "collection" ? (
          <>
            <Flex mt={5} justifyContent={"center"} flexDirection='column'>
              <Flex alignItems={"center"}>
                <Text mb={2} fontSize={"20px"}>
                  Name
                </Text>
                <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                  *
                </Text>
              </Flex>

              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                w={{
                  sm: "300px",
                  smd: "300px",
                  md: "320px",
                  lg: "420px",
                  xl: "500px",
                }}
              />
            </Flex>
            <Flex mt={5} justifyContent={"center"} flexDirection='column'>
              <Flex alignItems={"center"}>
                <Text mb={2} fontSize={"20px"}>
                  Description
                </Text>
                <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                  *
                </Text>
              </Flex>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                h='100'
                w={{
                  sm: "300px",
                  smd: "300px",
                  md: "320px",
                  lg: "420px",
                  xl: "500px",
                }}
              />
            </Flex>

            <Flex mt={5} justifyContent={"center"} flexDirection='column'>
              <Flex alignItems={"center"}>
                <Text mb={2} fontSize={"20px"}>
                  Upload File
                </Text>
                <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                  *
                </Text>
              </Flex>
              <Input
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
                type={"file"}
                accept='.png,.jpg'
                multiple={true}
              />
              <Flex alignItems={"center"}>
                <Button
                  onClick={() => handleClick()}
                  border='1px solid white'
                  bgColor={"transparent"}
                  _hover={{
                    bgColor: "transparent",
                  }}
                  _active={{
                    bgColor: "transparent",
                  }}
                  w='30%'
                  px={0}
                  disabled={imageurl?.secure_url !== ""}
                >
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Icon mr={2} as={AiFillFileAdd} />
                    <Text>Select File</Text>
                  </Flex>
                </Button>
                {loading && <Spinner ml={2} />}
                {imageurl && (
                  <Icon
                    onClick={() => handleClick()}
                    w='24px'
                    h='24px'
                    ml={2}
                    as={AiFillEdit}
                  />
                )}
              </Flex>
              {collectionimageurls && collectionimageurls?.length > 0 && (
                <Flex
                  w={{
                    sm: "300px",
                    smd: "300px",
                    md: "320px",
                    lg: "420px",
                    xl: "500px",
                  }}
                  h='200px'
                  overflowY={"scroll"}
                  flexWrap={"wrap"}
                >
                  {collectionimageurls &&
                    collectionimageurls?.length > 0 &&
                    collectionimageurls.map((image) => (
                      <ImageComponent
                        setimageUrl={() =>
                          setimageUrl({ secure_url: "", public_id: "" })
                        }
                        image={image}
                      />
                    ))}
                </Flex>
              )}
            </Flex>

            <Flex mt={5} justifyContent={"center"} flexDirection='column'>
              <Flex alignItems={"center"}>
                <Text mb={2} fontSize={"20px"}>
                  Price
                </Text>
                <Text color='red' fontSize={"24px"} ml={1} mt={1}>
                  *
                </Text>
              </Flex>
              <Input
                value={price}
                onChange={(e) => {
                  const regex = /^\d+$/;

                  if (regex.test(e.target.value) || e.target.value === "") {
                    setPrice(e.target.value);
                  }
                }}
                w={{
                  sm: "300px",
                  smd: "300px",
                  md: "320px",
                  lg: "420px",
                  xl: "500px",
                }}
              />
            </Flex>

            <Button onClick={() => createNFT()} mt={10} color='#2B2C2E'>
              Create Collection
            </Button>
          </>
        ) : null}
      </Flex>
    </Flex>
  );
}
