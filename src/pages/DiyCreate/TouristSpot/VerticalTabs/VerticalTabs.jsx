import styles from './VerticalTabs.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { touristSpots } from '../../../../constans/tourist_spot';
import { updateAirline } from '../../../../_slices/diySlice';

const countries = Object.keys(touristSpots);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function VerticalTabs() {
  const [value, setValue] = useState(0);
  const [nestedValue, setNestedValue] = useState(0);
  const dispatch = useDispatch();

  const handleChange = (e, newValue) => {
    setValue(newValue);
    setNestedValue(0);
  };

  const handleNestedChange = (e, newValue) => {
    setNestedValue(newValue);
  };

  const handleUpdateStartingPoint = (e) => {
    const newStartingPoint = e.target.textContent;
    if (e.target.tagName === 'LI') {
      dispatch(updateAirline({ startingPoint: newStartingPoint }));
    }
  };

  return (
    <div className={styles.VerticalTabs}>
      {/* countries */}
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {countries.map((country, index) => (
          <Tab key={index} label={country} {...a11yProps(index)} />
        ))}
      </Tabs>

      {/* country */}
      {countries.map((country, index) => (
        <TabPanel
          value={value}
          index={index}
          key={index}
          className={styles.country}
        >
          {Object.keys(touristSpots[country]).length > 0 ? (
            <div style={{ display: 'flex' }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={nestedValue}
                onChange={handleNestedChange}
                aria-label="Nested vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
              >
                {Object.keys(touristSpots[country]).map(
                  (region, nestedIndex) => (
                    <Tab
                      key={nestedIndex}
                      label={region}
                      {...a11yProps(nestedIndex)}
                    />
                  )
                )}
              </Tabs>

              {/* regions */}
              {Object.keys(touristSpots[country]).map((region, nestedIndex) => (
                <TabPanel
                  value={nestedValue}
                  index={nestedIndex}
                  key={nestedIndex}
                >
                  <ul
                    className={styles.regions}
                    onClick={handleUpdateStartingPoint}
                  >
                    {touristSpots[country][region].map((spot, spotIndex) => (
                      <li key={spotIndex}>{spot}</li>
                    ))}
                  </ul>
                </TabPanel>
              ))}
            </div>
          ) : (
            ''
          )}
        </TabPanel>
      ))}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
