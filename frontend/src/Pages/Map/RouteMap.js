import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { haversine } from "haversine-distance";
import { AiFillLock } from "react-icons/ai";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import {
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  geocode,
  fromLatLng,
} from "react-geocode";
import {
  Button,
  Mark,
  Stat,
  useControllableProp,
  useToast,
} from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Station from "../../distanceGraph/finalIndexing.json";
import "./map.css";

function MyComponent() {
  setDefaults({
    key: "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY", // Your API key here.
    language: "en", // Default language for responses.
    region: "es", // Default region for responses.
  });
  const [amount, setAmount] = useState(null);
  const [dis, setdis] = useState("flex");
  //   const [windowSize, setWindowSize] = useState(window.innerWidth);
  //   useEffect(() => {
  //     const handleWindowResize = () => {
  //       setWindowSize(window.innerWidth);
  //     };

  //     window.addEventListener("resize", handleWindowResize);
  //     return () => {
  //       window.removeEventListener("resize", handleWindowResize);
  //     };
  //   }, []);
  const containerStyle = {
    // width: `${windowSize <= 600 ? "500px" : "1000px"}`,
    width: "1000px",
    height: "500px",
    border: "1px solid white",
    borderRadius: "30px",
  };
  const navigate = useNavigate();
  const usData = JSON.parse(localStorage.getItem("grabwayUser"));
  ////console.log(usData);
  const location = useLocation();
  if (!location.state) {
    <Navigate to={"/"} />;
  }
  const routeData = location.state;
  console.log(routeData);
  const [begin, setbegin] = useState(
    Station[location.state.data.routePoints[0]]
  );
  const toast = useToast();
  ////console.log(location);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY",
    libraries: ["maps", "places"],
    mapIds: ["7e437361629e930a"],
    nonce: "grabway@123",
  });

  const onway = () => {
    let tmparr = [];
    for (var pp = 1; pp < location.state.markers.length - 1; pp++) {
      tmparr.push({
        location: {
          lat: location.state.markers[pp].latitude,
          lng: location.state.markers[pp].longitude,
        },
        stopover: true,
      });
    }
    console.log(tmparr);
    return tmparr;
  };

  const [directionResponse, setDirectionResponse] = useState("");
  async function calculateRoute(org, dest) {
    /* eslint-disable */
    const directionService = new google.maps.DirectionsService();
    const results = await directionService
      .route({
        origin: new google.maps.LatLng(org.latitude, org.longitude),
        destination: new google.maps.LatLng(dest.latitude, dest.longitude),
        // waypoints: onway(),
        /* eslint-disable */
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((res) => {
        setDirectionResponse(res);
      })
      .catch((err) => console.log(err));
  }

  console.log("Tanisha", directionResponse);
  const [currIndex, setcurrindex] = useState(0);

  useEffect(() => {
    let l1 = location.state.markers[currIndex + 1];
    let l2 = location.state.markers[currIndex];
    calculateRoute(l1, l2);
  }, []);

  const mapOptions = {
    mapId: "7e437361629e930a",
    disableDefaultUI: true,
  };

  const center = {
    lat: 23.7925537,
    lng: 86.4254662,
  };
  const [map, setMap] = React.useState(null);
  let markerfill = [];
  console.log(markerfill);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  console.log(currIndex);
  useEffect(() => {
    let l4 = location.state.markers[currIndex + 1];
    let l5 = location.state.markers[currIndex];
    calculateRoute(l4, l5);
  }, [currIndex]);

  console.log(location.state);
  return isLoaded ? (
    <div className="flex">
      {/* {directionResponse && (
        <> */}
      <div style={{ marginLeft: "20px" }}>
        <div
          className="flex justify-center items-center "
          style={{ marginTop: "20px" }}
        >
          <div className="mt-[10%]">
            {/* {damn.length != 0 ? (
                <>
                  {damn.map((item22) => {
                    console.log(directionResponse);
                    return (
                      <> */}
            <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={10}
              options={mapOptions}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {/* {location.state.markers.map((item) => {
              return (
                <MarkerF
                  position={{
                    lat: item.latitude,
                    lng: item.longitude,
                  }}
                />
              );
            })} */}
              <MarkerF
                position={{
                  lat: location.state.markers[currIndex].latitude,
                  lng: location.state.markers[currIndex].longitude,
                }}
              />
              <MarkerF
                position={{
                  lat: location.state.markers[currIndex + 1].latitude,
                  lng: location.state.markers[currIndex + 1].longitude,
                }}
              />

              {directionResponse && (
                <DirectionsRenderer directions={directionResponse} />
              )}
            </GoogleMap>
            {/* </>
                    );
                  })}
                </>
              ) : (
                <></>
              )} */}
          </div>
        </div>

        <div
          className="flex justify-center items-center w-[100vw] gap-10"
          style={{ marginTop: "20px" }}
        >
          <div
            className="button"
            onClick={() => {
              if (currIndex > 0) setcurrindex(currIndex - 1);
              else {
                toast({
                  title: "Previous route not available",
                  status: "warning",
                  isClosable: true,
                  position: "bottom",
                });
              }
            }}
          >
            <div class="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
              <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span class="relative z-20 flex items-center text-sm gap-2">
                <FaArrowLeft />
                Previous
              </span>
            </div>
          </div>

          <div
            className="button"
            onClick={() => {
              if (currIndex + 1 < location.state.markers.length - 1) {
                setcurrindex(currIndex + 1);
              } else {
                toast({
                  title: "Next route not available",
                  status: "warning",
                  isClosable: true,
                  position: "bottom",
                });
              }
            }}
          >
            <div class="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
              <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span class="relative z-20 flex items-center text-sm gap-2">
                <FaArrowRight />
                Next
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <div
          className="flex"
          style={{
            marginLeft: "100px",
            marginTop: "50px",
            borderTop: "10px solid black",
          }}
        >
          <div style={{ paddingRight: "50px" }}>
            <span
              style={{
                fontFamily: "serif",
                fontSize: "x-large",
                fontWeight: "bold",
                color: "blue",
                paddingTop: "10px",
              }}
            >
              Station ID
            </span>
            {location.state.data.routePoints.map((item, index) => {
              return (
                <>
                  <div
                    style={{
                      fontSize: "large",
                      // color: "red",
                      fontWeight: "700",
                      paddingTop: "20px",
                      textAlign: "center",
                      border: "2px solid white",
                      cursor: "pointer",
                      // background: "black",
                      borderRadius: "12px",
                      paddingBottom: "2px",
                    }}
                    className="textid"
                    onClick={() =>
                      setbegin(Station[location.state.data.routePoints[index]])
                    }
                  >
                    {item}
                  </div>
                </>
              );
            })}
          </div>
          <div>
            <span
              style={{
                display: `${dis}`,
                fontFamily: "serif",
                fontSize: "x-large",
                fontWeight: "bold",
                color: "blue",
              }}
            >
              Weights Taken
            </span>
            {location.state.data.routePoints.map((item, index) => {
              return (
                <>
                  <div
                    style={{
                      fontSize: "large",
                      color: "black",
                      fontWeight: "700",
                      paddingTop: "20px",
                      textAlign: "center",
                    }}
                  >
                    {location.state.data.weightsEach[index]}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center" style={{ paddingTop: "20%" }}>
          <div
            style={{
              marginLeft: "50px",
              padding: "6px",
              color: "white",
              fontSize: "large",
              fontWeight: "700",
              borderLeft: "5px solid red",
              borderBottom: "5px solid grey",
              borderRadius: "10px",
              background: "black",
              marginRight: "10px",
            }}
          >
            {begin}
          </div>
        </div>
      </div>
    </div>
  ) : (
    //     )}
    <></>
  );
}

export default React.memo(MyComponent);
