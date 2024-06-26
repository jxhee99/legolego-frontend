import { http, HttpResponse } from 'msw';
import airlineCode from './airline_code.json';
import packages from './pacakges.json';

export const handlers = [
  http.get('/touristSpot', () => {
    return HttpResponse.json(airlineCode);
  }),
];
