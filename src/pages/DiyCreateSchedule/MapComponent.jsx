import styles from './DiyCreateSchedule.module.css';
import { useState, useCallback, useRef, memo } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
  Autocomplete,
} from '@react-google-maps/api';

const containerStyle = {
  width: '80%',
  height: '60vh',
};

const center = {
  lat: 37.5665,
  lng: 126.978,
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

      const photoUrl =
        place.photos && place.photos.length > 0
          ? place.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 })
          : null;

      setSelectedPlace({
        name: place.name,
        address: place.formatted_address,
        position: { lat: location.lat(), lng: location.lng() },
        photoUrl: photoUrl,
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
      className={styles.googlemap}
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
            {selectedPlace.photoUrl && (
              <img
                src={selectedPlace.photoUrl}
                alt={selectedPlace.name}
                style={{ maxWidth: '100%', maxHeight: '150px' }}
              />
            )}
          </div>
        </InfoWindow>
      )}

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
        <div className={styles.inputs}>
          <input type="text" placeholder="관광지와 맛집을 검색하세요" />
          <input type="button" value="일정추가" />
        </div>
      </Autocomplete>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default memo(MyComponent);
