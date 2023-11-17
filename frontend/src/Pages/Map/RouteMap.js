import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  geocode,
  fromLatLng,
} from "react-geocode";
import { Button, Mark, useControllableProp, useToast } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MyComponent() {
  setDefaults({
    key: "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY", // Your API key here.
    language: "en", // Default language for responses.
    region: "es", // Default region for responses.
  });
  const [amount, setAmount] = useState(null);
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

  const toast = useToast();
  ////console.log(location);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY",
    libraries: ["maps", "places"],
    mapIds: ["7e437361629e930a"],
    nonce: "grabway@123",
  });

  // const [directionResponse, setDirectionResponse] = useState([]);

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

  //Directions service
  const [directionResponse, setDirectionResponse] = useState([]);
  async function calculateRoute() {
    if (!location.state.markers) {
      return;
    }
    /* eslint-disable */
    const directionService = new google.maps.DirectionsService();
    let Directiontmparr = [];
    for (var k = 0; k < location.state.markers.length - 1; k++) {
      let results = await directionService.route({
        origin: new google.maps.LatLng(
          location.state.markers[k].latitude,
          location.state.markers[k].longitude
        ),
        destination: new google.maps.LatLng(
          location.state.markers[k + 1].latitude,
          location.state.markers[k + 1].longitude
        ),
        /* eslint-disable */
        travelMode: google.maps.TravelMode.TRANSIT,
      });
      Directiontmparr.push(results);
      setDirectionResponse(Directiontmparr);
    }
    setDirectionResponse(Directiontmparr);
  }

  useEffect(() => {
    calculateRoute();
    console.log(directionResponse);
  }, []);

  console.log(directionResponse);
  return isLoaded ? (
    <>
      <div className="flex justify-center items-center ">
        <div className="mt-[4%]">
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={10}
            options={mapOptions}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {location.state.markers.map((item) => {
              return (
                <MarkerF
                  position={{ lat: item.latitude, lng: item.longitude }}
                />
              );
            })}

            {directionResponse &&
              directionResponse.map((item) => {
                return <DirectionsRenderer directions={item} />;
              })}
          </GoogleMap>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
