import { http, HttpResponse } from 'msw';
import packages from './pacakges.json';
import airline from './airline.json';

export const handlers = [
  http.get('/packages', () => {
    return HttpResponse.json(packages);
  }),

  http.get('/api/airline', () => {
    return HttpResponse.json(airline);
  }),
];
