import { http, HttpResponse } from 'msw';
import airlineCode from './airline_code.json';

export const handlers = [
  http.get('/touristSpot', () => {
    return new HttpResponse.json(airlineCode);
  }),
];
