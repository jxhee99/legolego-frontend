import { http, HttpResponse } from 'msw';
import packages from './pacakges.json';
import airline from './airline.json';
import airlineCode from './airline_code.json';

export const handlers = [
  http.get('/packages', () => {
    return HttpResponse.json(packages);
  }),

  http.get('/api/airline', () => {
    return HttpResponse.json(airline);
  }),

  http.get('/touristSpot', () => {
    return HttpResponse.json(airlineCode);
  }),
];
