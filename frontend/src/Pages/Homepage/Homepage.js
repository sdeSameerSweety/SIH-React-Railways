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
import { useToast } from "@chakra-ui/react";

const Homepage = () => {
  const toast=useToast();
  const sourceDesk = useRef();
  const nonceVal="grabway@123"
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY",
    libraries: ["maps", "places"],
    mapIds: ["7e437361629e930a"],
    nonce: nonceVal,
  });

  //for distance
  async function distanceMatrix(originText, destinationText) {
    try {
      /* eslint-disable */
      const service = new google.maps.DistanceMatrixService();
      const request = {
        origins: [originText],
        destinations: [destinationText],
        /* eslint-disable */
        travelMode: google.maps.TravelMode.TRANSIT,
        /* eslint-disable */
        transitMode:google.maps.TransitMode.RAIL,
        /* eslint-disable */
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      };
      const responseDistanceMatrix = await service
        .getDistanceMatrix(request)
        .then((res) => {
          setDistanceNum(res.rows[0].elements[0].distance.value);
          setDistanceText(res.rows[0].elements[0].distance.text);
          setDurationNum(res.rows[0].elements[0].duration.value);
          setDurationText(res.rows[0].elements[0].duration.text);
          //console.log(res);
          packagePrice(res.rows[0].elements[0].distance.value);
        });
      setShowCards(true);
    } catch (err) {
      //console.log("Error while calculating distnace");
      toast({
        title: "Didn't find Any such Route",
        description: "Presently we dont provide service in requested route",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setShowCards(false);
    }
  }

  async function handleSearch(){
    //console.log('clicked');
    if (
      sourceDesk.current.value.length === 0
    ) {
      toast({
        title: `warning toast`,
        status: "warning",
        isClosable: true,
        position:'bottom'
      })
    }  
     else {
      console.log('hello');

    }
  }


  return( 
  <>
  {isLoaded?<div className="mt-[2%] flex justify-center items-center w-[100%] gap-10">
    <div className="flex flex-col justify-center items-center w-[45%] gap-10">
      <div>
                <Card
                  variant="filled"
                  sx={{ boxShadow: "0px 0px 0px 10px white" }}
                >
                  <CardHeader>
                    <Heading size="lg">
                      <div className="font-ubuntu mb-[2%]">Enter Origin Station</div>
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
                                  borderRadius:'10px',
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
      <div className="button">
          <button onClick={handleSearch}
            className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
          >
            <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span className="relative z-20 flex items-center text-sm gap-2">
             
              Search
            </span>
          </button>
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
