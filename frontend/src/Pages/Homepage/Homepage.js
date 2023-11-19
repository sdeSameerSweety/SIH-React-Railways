import React, { useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { FaCircleDot } from "react-icons/fa6";
import graphPlot from ".././../distanceGraph/all_dist.json";
import stationPoints from "../../distanceGraph/finalIndexing.json";
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
import {
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  RequestType,
  geocode,
  fromLatLng,
} from "react-geocode";
import Spinner from "../../components/Spinner/Spinner";
import "./Homepage.css";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import haversine from 'haversine-distance'

const Homepage = () => {
  const [markerData, setmarkerData] = useState([]);
  const [sendData, setsendData] = useState("");
  const [navigateOrnot, setNavigateorNot] = useState(false);
  const [loaderState, setLoaderState] = useState(false);
  setDefaults({
    key: "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY", // Your API key here.
    language: "en", // Default language for responses.
    region: "es", // Default region for responses.
  });
  const navigate = useNavigate();
  const djangoUrl = "http://127.0.0.1:8000/";
  const toast = useToast();
  const sourceDesk = useRef();
  const nonceVal = "grabway@123";
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY",
    libraries: ["maps", "places"],
    mapIds: ["7e437361629e930a"],
    nonce: nonceVal,
  });

  async function getNearby(locationName, tmparr, llpp, databack, Origin) {
    const addressResponse = await geocode(RequestType.ADDRESS, locationName, {
      language: "en",
      region: "in",
    });

    // console.log(addressResponse.results[0].geometry.location)
    const apiKey = "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY"; // Replace with your actual API key
    await fetch("https://places.googleapis.com/v1/places:searchNearby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.location",
      },
      body: JSON.stringify({
        includedTypes: ["train_station"],
        maxResultCount: 1,
        rankPreference: "DISTANCE",
        locationRestriction: {
          circle: {
            center: {
              latitude: addressResponse.results[0].geometry.location.lat,
              longitude: addressResponse.results[0].geometry.location.lng,
            },
            radius: 1000.0,
          },
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        tmparr.push(data.places[0].location);
        console.log(tmparr);
        setmarkerData(tmparr);
        if (tmparr.length === llpp.length) {
          setNavigateorNot(true);
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  const [trainNo, setTrainNo] = useState();
  const [wagcap, setWagcap] = useState();
  const [wagno, setWagNo] = useState();
  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
  //Station Data

  //Graph
  //for distance
  //for demo a destination is provided:
  const destinationText =
    "Railway Station Bokaro Steel City, Jharkhand, Marafari, Bokaro Steel City, Bokaro, Jharkhand, India";
  const [distanceNum, setDistanceNum] = useState(null);
  const [distanceText, setDistanceText] = useState(null);
  async function distanceMatrix(originText, destinationText, tmp, k) {
    try {
      /* eslint-disable */
      const service = new google.maps.DistanceMatrixService();
      const request = {
        origins: [originText],
        destinations: [destinationText],
        /* eslint-disable */
        travelMode: google.maps.TravelMode.TRANSIT,
        /* eslint-disable */

        /* eslint-disable */
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      };
      const responseDistanceMatrix = await service
        .getDistanceMatrix(request)
        .then((res) => {
          setDistanceNum(res.rows[0].elements[0].distance.value);
          tmp[k] = res.rows[0].elements[0].distance.value;
          setDistanceText(res.rows[0].elements[0].distance.text);
          //setDurationNum(res.rows[0].elements[0].duration.value);
          //setDurationText(res.rows[0].elements[0].duration.text);
          console.log(res);
          //packagePrice(res.rows[0].elements[0].distance.value);
        });
      //setShowCards(true);
    } catch (err) {
      console.log(err);
      // toast({
      //   title: "Didn't find Any such Route",
      //   description: "Presently we dont provide service in requested route",
      //   status: "error",
      //   duration: 3000,
      //   isClosable: true,
      // });
      //setShowCards(false);
    }
  }

  async function goAhead(llpp, data, Origin) {
    console.log(llpp);
    let tmparr = [];
    for (const pp in llpp) {
      getNearby(stationPoints[pp], tmparr, llpp, data, Origin);
    }
  }
  const [routeData, setRouteData] = useState({});
  async function handleSearch() {
    //console.log('clicked');
    setNavigateorNot(false);
    if (
      sourceDesk.current.value.length === 0 ||
      trainNo.length === 0 ||
      wagcap.length === 0 ||
      wagno.length === 0
    ) {
      toast({
        title: "Fields Cannot be left Blank",
        status: "warning",
        isClosable: true,
        position: "bottom",
      });
    } else {
      setLoaderState(true);
      console.log(sourceDesk.current.value);
      let OriginText = sourceDesk.current.value;
      let tmp = {};
      const addro = await geocode(RequestType.ADDRESS, OriginText, {
        language: "en",
        region: "in",
      });
      let oo = 1;
      for (const k in stationPoints) {
        if (stationPoints[k] !== OriginText) {
          const addrd = await geocode(RequestType.ADDRESS, stationPoints[k], {
            language: "en",
            region: "in",
          });
          console.log("Origin",addro.results[0].geometry.location);
          console.log("Destination",addrd.results[0].geometry.location);
          const dist = haversine(addro.results[0].geometry.location,addrd.results[0].geometry.location);
          console.log(dist);
          tmp[k] = dist;
        }
      }
      graphPlot[0] = tmp;
      stationPoints[0] = OriginText;
      console.log(graphPlot);
      const resData = await axios
        .post(djangoUrl + "getRoute/", { graphPlot, trainNo, wagcap, wagno })
        .then((res) => {
          // console.log(res);
          setRouteData(JSON.parse(res.data));
          const markerL = [];
          let ddr = JSON.parse(res.data);
          console.log(ddr);
          for (let k = 0; k < ddr.routePoints.length; k++) {
            setsendData(res.data);
            // console.log("Hello");
            // console.log(stationPoints[ddr.routePoints[k]]);
            let dd = stationPoints[ddr.routePoints[k]];
            console.log(dd);
            fromAddress(dd).then(({ results }) => {
              const ddpo = results[0].geometry.location;
              // console.log(ddpo);
              markerL.push(results[0].geometry.location);
              if (markerL.length === ddr.routePoints.length) {
                setLoaderState(false);
                goAhead(ddr.routePoints, res.data, OriginText);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }
  console.log(routeData);
  console.log(navigateOrnot);
  console.log(markerData);

  if (navigateOrnot) {
    navigate("/routeDetails", {
      state: {
        data: JSON.parse(sendData),
        stationPoints: stationPoints,
        start: sourceDesk.current.value,
        markers: markerData,
      },
    });
  }
  if (!Cookies.get("userEmail")) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      {isLoaded ? (
        <>
          {!loaderState && (
            <div className="mt-[2%] flex justify-center items-center w-[100%] gap-10">
              <div className="flex flex-col justify-center items-center w-[45%] gap-10">
                <div>
                  <Card
                    variant="filled"
                    sx={{ boxShadow: "0px 0px 0px 10px white" }}
                  >
                    <CardBody>
                      <CardHeader>
                        <Heading size="md">
                          <div className="font-ubuntu">
                            Enter Origin Station
                          </div>
                        </Heading>
                      </CardHeader>
                      <Text>
                        <div className="flex flex-row">
                          <div className="source flex justify-center items-center">
                            <InputGroup
                              sx={{
                                borderRadius: "30px",
                              }}
                            >
                              <InputLeftElement pointerEvents="none">
                                <FaCircleDot fill="green" />
                              </InputLeftElement>
                              <Autocomplete className=" font-ubuntu text-center">
                                <Input
                                  className="card"
                                  variant="filled"
                                  sx={{
                                    border: "2px solid grey",
                                    borderRadius: "10px",
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
                      <CardHeader>
                        <Heading size="md">
                          <div className="font-ubuntu">
                            Enter Rake Unique ID
                          </div>
                        </Heading>
                      </CardHeader>
                      <Text>
                        <div className="flex flex-row">
                          <div className="source flex justify-center items-center">
                            <InputGroup
                              sx={{
                                borderRadius: "30px",
                              }}
                            >
                              <InputLeftElement pointerEvents="none">
                                <FaCircleDot fill="red" />
                              </InputLeftElement>

                              <Input
                                className="card font-ubuntu"
                                variant="filled"
                                sx={{
                                  border: "2px solid grey",
                                  borderRadius: "10px",
                                  padding: "20px",
                                  paddingLeft: "50px",
                                }}
                                type="text"
                                w={400}
                                placeholder="Can I know The Id ?"
                                onChange={(e) => setTrainNo(e.target.value)}
                              />
                            </InputGroup>
                          </div>
                        </div>
                      </Text>
                      <CardHeader>
                        <Heading size="md">
                          <div className="font-ubuntu">
                            Enter Number of Wagons
                          </div>
                        </Heading>
                      </CardHeader>
                      <Text>
                        <div className="flex flex-row">
                          <div className="source flex justify-center items-center">
                            <InputGroup
                              sx={{
                                borderRadius: "30px",
                              }}
                            >
                              <InputLeftElement pointerEvents="none">
                                <FaCircleDot fill="black" />
                              </InputLeftElement>

                              <Input
                                className="card font-ubuntu"
                                variant="filled"
                                sx={{
                                  border: "2px solid grey",
                                  borderRadius: "10px",
                                  padding: "20px",
                                  paddingLeft: "50px",
                                }}
                                type="text"
                                w={400}
                                placeholder="Tell me number of wagons ?"
                                onChange={(e) => setWagNo(e.target.value)}
                              />
                            </InputGroup>
                          </div>
                        </div>
                      </Text>
                      <CardHeader>
                        <Heading size="md">
                          <div className="font-ubuntu">
                            Enter Capacity/Wagon (in Tonnes)
                          </div>
                        </Heading>
                      </CardHeader>
                      <Text>
                        <div className="flex flex-row">
                          <div className="source flex justify-center items-center">
                            <InputGroup
                              sx={{
                                borderRadius: "30px",
                              }}
                            >
                              <InputLeftElement pointerEvents="none">
                                <FaCircleDot fill="black" />
                              </InputLeftElement>

                              <Input
                                className="card font-ubuntu"
                                variant="filled"
                                sx={{
                                  border: "2px solid grey",
                                  borderRadius: "10px",
                                  padding: "20px",
                                  paddingLeft: "50px",
                                }}
                                type="text"
                                w={400}
                                placeholder="Capcity per Wagon ?"
                                onChange={(e) => setWagcap(e.target.value)}
                              />
                            </InputGroup>
                          </div>
                        </div>
                      </Text>
                    </CardBody>
                  </Card>
                </div>
                <div className="button">
                  <button
                    onClick={handleSearch}
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
                <img src="/assets/images/homepageImage.png" />
              </div>
            </div>
          )}
          {loaderState && (
            <div className="flex justify-center item-center w-[100vw] h-[80vh]">
              <img
                src="/assets/images/loader.gif"
                className="rounded-lg mt-[2%]"
                alt="loading..."
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center w-[100%]">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default Homepage;
