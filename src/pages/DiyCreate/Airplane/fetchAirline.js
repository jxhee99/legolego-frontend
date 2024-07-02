// import { formatDate } from '../../../utils/util';
// import { formatTimeString } from '../../../utils/DateTime';
// import apiClient from '../../../api/apiClient';

// function extractCode(inputString) {
//   return inputString.split(', ')[0];
// }

// export const fetchAirline = async (startDate, endDate, startLocation, endLocation, setStartFlight, setReturnFlight) => {
//   try {

//     const response = await apiClient.get(
//       `/user/airline?schDate=${formatDate(startDate)}&returnDate=${formatDate(endDate)}&schDeptCityCode=${extractCode(startLocation)}&schArrvCityCode=${extractCode(endLocation)}`);

//     console.log(response.data);
//     console.log(startDate);
//     const flightData = response.data;

//     const newStartFlights = flightData.startData.map((flight) => ({
//       flightNum: flight.internationalNum,
//       date: `${startDate}T${formatTimeString(flight.internationalTime)}:00`,
//       airlineName: flight.airlineKorean,
//       startingPoint: flight.airport,
//       destination: flight.city,
//     }));

//     setStartFlight((prevStartFlights) => [
//       ...prevStartFlights,
//       ...newStartFlights,
//     ]);

//     const newReturnFlights = flightData.returnData.map((flight) => ({
//       flightNum: flight.internationalNum,
//       date: `${endDate}T${formatTimeString(flight.internationalTime)}:00`,
//       airlineName: flight.airlineKorean,
//       startingPoint: flight.airport,
//       destination: flight.city,
//     }));

//     setReturnFlight((prevReturnFlights) => [
//       ...prevReturnFlights,
//       ...newReturnFlights,
//     ]);
//   } catch (error) {
//     console.error('Error fetching airline data:', error);
//   }
// };

import { formatDate } from '../../../utils/util';
import { formatTimeString } from '../../../utils/DateTime';
import apiClient from '../../../api/apiClient';

function extractCode(inputString) {
  return inputString.split(', ')[0];
}

export const fetchAirline = async (startDate, endDate, startLocation, endLocation, setStartFlight, setReturnFlight) => {
  try {
    const response = await apiClient.get(
      `/user/airline`, {
        params: {
          schDate: formatDate(startDate),
          returnDate: formatDate(endDate),
          schDeptCityCode: extractCode(startLocation),
          schArrvCityCode: extractCode(endLocation)
        }
      }
    );

    console.log(response.data);
    console.log(startDate);
    const flightData = response.data;

    const newStartFlights = flightData.startData.map((flight) => ({
      flightNum: flight.internationalNum,
      date: `${startDate}T${formatTimeString(flight.internationalTime)}:00`,
      airlineName: flight.airlineKorean,
      startingPoint: flight.airport,
      destination: flight.city,
    }));

    setStartFlight((prevStartFlights) => [
      ...prevStartFlights,
      ...newStartFlights,
    ]);

    const newReturnFlights = flightData.returnData.map((flight) => ({
      flightNum: flight.internationalNum,
      date: `${endDate}T${formatTimeString(flight.internationalTime)}:00`,
      airlineName: flight.airlineKorean,
      startingPoint: flight.airport,
      destination: flight.city,
    }));

    setReturnFlight((prevReturnFlights) => [
      ...prevReturnFlights,
      ...newReturnFlights,
    ]);
  } catch (error) {
    console.error('Error fetching airline data:', error);
  }
};
