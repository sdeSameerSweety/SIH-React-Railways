import React, { useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import {FaCircleDot} from "react-icons/fa6";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  border,
  Button,
  Toast,
} from "@chakra-ui/react";
import "./Homepage.css"
const Homepage = () => {
  const sourceDesk = useRef();
  const nonceVal="grabway@123"
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY",
    libraries: ["maps", "places"],
    mapIds: ["7e437361629e930a"],
    nonce: nonceVal,
  });
  return( 
  <>
  {isLoaded?<div className="mt-[2%] flex justify-center items-center w-[100%] gap-10">
    <div className="flex justify-center items-center w-[45%]">
    <div>
                <Card
                  variant="filled"
                  sx={{ boxShadow: "0px 0px 0px 10px white" }}
                >
                  <CardHeader>
                    <Heading size="lg">
                      <div className="font-ubuntu">Enter Origin Station</div>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      <div className="flex flex-row">
                        <div className="source flex justify-center items-center">
                          <InputGroup sx={{
                            borderRadius:'30px'
                          }}>
                            <InputLeftElement
                              sx={{
                                paddingLeft: "10px",
                                marginTop: "25px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              pointerEvents="none"
                            >
                              <FaCircleDot fill="green" />
                            </InputLeftElement>
                            <Autocomplete className=" font-ubuntu text-center">
                              <Input
                                className="card"
                                variant="filled"
                                sx={{
                                  border: "2px solid grey",
                                  padding: "20px",
                                  paddingLeft: "50px",
                                }}
                                type="text"
                                w={400}
                                placeholder="From where ?"
                                ref={sourceDesk}
                              />
                            </Autocomplete>
                          </InputGroup>
                        </div>
                      </div>
                    </Text>
                  </CardBody>
                </Card>
              </div>
    </div>
    <div className="flex justify-center items-center w-[45%]">
      <img src="/assets/images/homepageImage.png"/>
    </div>
  </div>:<div>Loading</div>}
  </>
  );
};

export default Homepage;
