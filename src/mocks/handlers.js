import { http, HttpResponse } from 'msw';
import packages from './pacakges.json';

export const handlers = [
  http.get('/packages', () => {
    return HttpResponse.json(packages);
  }),
];
