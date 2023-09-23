import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  // width: `${windowSize <= 600 ? "500px" : "1000px"}`,
  width: "1000px",
  height: "500px",
  border: "1px solid white",
  borderRadius: "30px",
};
const center = {
  lat: -3.745,
  lng: -38.523,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY",
    libraries: ["maps", "places"],
    mapIds: ["7e437361629e930a"],
    nonce: "grabway@123",
  });

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

  return isLoaded ? (
    <div className="flex justify-center items-center ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options={mapOptions}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
