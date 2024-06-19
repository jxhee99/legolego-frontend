import styles from './AirportTabs.module.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateAirline } from '../../../_slices/diySlice';

const AirportTabs = () => {
  const dispatch = useDispatch();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [data, setData] = useState({});

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setSelectedCountry(null);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  useEffect(() => {
    fetch('/touristSpot', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleClickData = (e) => {
    const code = e.target.dataset.code;
    if (e.target.tagName === 'LI') {
      dispatch(updateAirline({ startingPoint: code }));
    }
  };

  return (
    <div className={styles.airport_tab_menu}>
      <div className={styles.tap_menu}>
        {Object.keys(data).map((region) => (
          <button
            key={region}
            className={`${styles.tab} ${selectedRegion === region ? 'active' : ''}`}
            onClick={() => handleRegionClick(region)}
          >
            {region}
          </button>
        ))}
      </div>

      <div className={styles.tap_content}>
        {selectedRegion && (
          <div>
            <h2>{selectedRegion}</h2>
            <div className="countries">
              {Object.keys(data[selectedRegion]).map((country) => (
                <button
                  key={country}
                  className={`${styles.tab} ${selectedCountry === country ? 'active' : ''}`}
                  onClick={() => handleCountryClick(country)}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedCountry && (
          <div>
            <h3>{selectedCountry}</h3>
            <ul className={styles.airports} onClick={handleClickData}>
              {data[selectedRegion][selectedCountry].map((airport) => (
                <li key={airport.id} data-code={airport.IATA}>
                  {airport.city} - {airport.name} ({airport.IATA})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AirportTabs;
