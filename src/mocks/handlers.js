import { http, HttpResponse } from 'msw';
import airlineCode from './airline_code.json';
import packages from './pacakges.json';

export const handlers = [
  http.get('/touristSpot', () => {
    return HttpResponse.json(airlineCode);
  }),

  http.get('/api/products', async () => {
    return HttpResponse.json(packages, { status: 200 });
  }),

  http.get('/api/products/1', async () => {
    return HttpResponse.json({
      productNum: 1,
      partnerName: '모두투어',
      productName: '신나는 태국 여행',
      productImage:
        'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXVSgjkrTtRv9FD32qqMAFzRYmCJ95-Si8UyRecdbIuXy7xxfyUwlHuuZwgd_P5hZjMgD3Q1s7PeJHinek_qu11UkHiouDNM-RF9RCH7ou30v3snS_Cs0XYWUfDVCpSNT5VqAZ7J2kLsmxCqPw-J_wzzhMoOfIJpUX6ImpzyvKHdPKhy&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=75694',
      price: 700000.0,
      regDate: '2024-06-20T01:39:47.282+00:00',
      recruitmentDeadline: '2024-12-31T14:59:59.000+00:00',
      recruitmentConfirmed: false,
      productViewNum: 0,
      wishlistCount: 0,
      userNickname: '코코',
      airline: {
        airlineNum: 1,
        startAirlineName: '아시아나',
        startingPoint: 'Seoul',
        destination: 'New York',
        startFlightNum: 'EX1234',
        boardingDate: '2024-06-12T10:00:00',
        comeAirlineName: '아시아나',
        comeFlightNum: 'EX5678',
        comingDate: '2024-06-15T10:00:00',
      },
      route: {
        routeNum: 1,
        startDate: '2024-06-12',
        lastDate: '2024-06-20',
      },
      detailCourse: [
        {
          detailCourseNum: 1,
          dayNum: '2024-06-12',
          courses: ['코스1', '코스2'],
        },
        {
          detailCourseNum: 2,
          dayNum: '2024-06-13',
          courses: ['코스1', '코스2'],
        },
        {
          detailCourseNum: 3,
          dayNum: '2024-06-14',
          courses: ['코스1', '코스2'],
        },
      ],
    });
  }),
];
