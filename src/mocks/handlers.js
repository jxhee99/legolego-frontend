// import { http, HttpResponse } from 'msw';
// import airlineCode from './airline_code.json';
// import { rest } from 'msw';


// export const handlers = [
//   http.get('/touristSpot', () => {
//     return HttpResponse.json(airlineCode);
//   }),

//   rest.get('/', (req, res, ctx) => {
//     return res(ctx.json({ message: 'Root request intercepted' }));
//   }),

//   rest.post('/api/auth/login', (req, res, ctx) => {
//     const { email, password } = req.body;
//     return res(
//       ctx.status(200),
//       ctx.json({
//         token: 'mock-token',
//       })
//     );
//   }),

  
// ];

import { rest } from 'msw';
import airlineCode from './airline_code.json';
import packages from './pacakges.json';

export const handlers = [
  // 예제 데이터 제공 핸들러
  rest.get('/touristSpot', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(airlineCode)
    );
  }),

  // 루트 요청 핸들러
  rest.get('/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Root request intercepted' })
    );
  }),

  // 로그인 요청 핸들러
  rest.post('/api/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;
    return res(
      ctx.status(200),
      ctx.json({
        token: 'mock-token',
      })
    );
  }),

  // 패키지 데이터 제공 핸들러
  rest.get('/api/packages', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { packageNum: 1, packageName: 'Package 1', user: { userNickname: 'User1' }, packageLikedNum: 10, packageViewNum: 100 },
        { packageNum: 2, packageName: 'Package 2', user: { userNickname: 'User2' }, packageLikedNum: 20, packageViewNum: 200 },
      ])
    );
  }),

  // 패키지 삭제 요청 핸들러
  rest.delete('/api/admin/packages/:packageNum', (req, res, ctx) => {
    return res(
      ctx.status(204)
    );
  }),
];

