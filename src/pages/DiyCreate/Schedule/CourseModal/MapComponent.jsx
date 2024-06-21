import { useState, useCallback, useRef, memo } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
  Autocomplete,
} from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import styles from './CourseModal.module.css';
import { addCourse } from '../../../../_slices/diySlice';

const containerStyle = {
  width: '100%',
  height: '50vh',
};

const center = {
  lat: 37.5665,
  lng: 126.978,
};

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

function MapComponent({ detail, closeModal }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [selectedCourse, setSelectedCourse] = useState(null);
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
  const dispatch = useDispatch();

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const location = place.geometry.location;
      setMarkerPosition({ lat: location.lat(), lng: location.lng() });

      if (map) {
        map.panTo(location);
      }

      const photoUrl =
        place.photos && place.photos.length > 0
          ? place.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 })
          : null;

      setSelectedCourse({
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
    closeModal();
  };

  const handleUpdateCourses = () => {
    if (!selectedCourse) return;

    const course = {
      dayNum: detail.dayNum,
      courses: [selectedCourse], // Assuming selectedCourse is an array of courses
      fileUrl: detail.fileUrl || '',
    };

    dispatch(addCourse(course));
    setSelectedCourse(null);
    setInfoWindowVisible(false);
    closeModal();
  };

  return isLoaded ? (
    <>
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
        {infoWindowVisible && selectedCourse && (
          <InfoWindow
            position={selectedCourse.position}
            onCloseClick={() => setInfoWindowVisible(false)}
          >
            <div>
              <h3>{selectedCourse.name}</h3>
              <p>{selectedCourse.address}</p>
              {selectedCourse.photoUrl && (
                <img
                  src={selectedCourse.photoUrl}
                  alt={selectedCourse.name}
                  style={{ maxWidth: '100%', maxHeight: '150px' }}
                />
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <div className={styles.map_search}>
        <Autocomplete
          className={styles.search_bar}
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
          <input type="search" />
        </Autocomplete>
        <button onClick={handleUpdateCourses}>일정추가</button>
      </div>
    </>
  ) : (
    <></>
  );
}

export default memo(MapComponent);
