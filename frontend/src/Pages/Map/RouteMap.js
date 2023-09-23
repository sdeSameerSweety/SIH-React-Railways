import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Button, Mark, useControllableProp, useToast } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MyComponent() {
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

  const [directionResponse, setDirectionResponse] = useState("");
  async function calculateRoute() {
    /* eslint-disable */
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: rideDataText.source,
      destination: rideDataText.destination,
      /* eslint-disable */
      travelMode: google.maps.TravelMode.TRANSIT,
    });
    setDirectionResponse(results);
  }

  const mapOptions = {
    mapId: "7e437361629e930a",
    disableDefaultUI: true,
  };
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  console.log(isLoaded);
  return isLoaded ? (
    <>
      <div className="flex justify-center items-center ">
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={14}
            options={mapOptions}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* <MarkerF position={fromVerifed ? finalPosition : initialPosition} />
            {directionResponse && (
              <DirectionsRenderer directions={directionResponse} />
            )} */}
          </GoogleMap>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
