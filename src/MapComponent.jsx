import { useState, useCallback, useRef, memo } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
  Autocomplete,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const autocompleteRef = useRef();
  const autocompleteListener = useRef();

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const location = place.geometry.location;
      setMarkerPosition({ lat: location.lat(), lng: location.lng() });
      map.panTo(location);
      setSelectedPlace({
        name: place.name,
        address: place.formatted_address,
        position: { lat: location.lat(), lng: location.lng() },
      });
      setInfoWindowVisible(true);
    }
  };

  const handleMarkerClick = () => {
    setInfoWindowVisible(!infoWindowVisible);
  };

  return isLoaded ? (
    <GoogleMap
      options={{ disableDefaultUI: true }}
      mapContainerStyle={containerStyle}
      center={markerPosition}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <MarkerF position={markerPosition} onClick={handleMarkerClick} />
      {infoWindowVisible && selectedPlace && (
        <InfoWindow
          position={selectedPlace.position}
          onCloseClick={() => setInfoWindowVisible(false)}
        >
          <div>
            <h3>{selectedPlace.name}</h3>
            <p>{selectedPlace.address}</p>
          </div>
        </InfoWindow>
      )}
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <Autocomplete
          onLoad={(autocomplete) => {
            autocompleteRef.current = autocomplete;
            autocompleteListener.current = autocomplete.addListener(
              'place_changed',
              onPlaceChanged
            );
          }}
          onUnmount={() => {
            if (autocompleteListener.current) {
              autocompleteListener.current.remove();
            }
          }}
        >
          <input type="text" placeholder="Search location" />
        </Autocomplete>
      </div>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default memo(MyComponent);
