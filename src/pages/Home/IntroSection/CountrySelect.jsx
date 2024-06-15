import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CountrySelect() {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="어디로 여행가고 싶으신가요?"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  { code: 'AD', label: '안도라 (Andorra)', phone: '376' },
  { code: 'AE', label: '아랍에미리트 (United Arab Emirates)', phone: '971' },
  { code: 'AF', label: '아프가니스탄 (Afghanistan)', phone: '93' },
  { code: 'AG', label: '앤티가 바부다 (Antigua and Barbuda)', phone: '1-268' },
  { code: 'AI', label: '앵귈라 (Anguilla)', phone: '1-264' },
  { code: 'AL', label: '알바니아 (Albania)', phone: '355' },
  { code: 'AM', label: '아르메니아 (Armenia)', phone: '374' },
  { code: 'AO', label: '앙골라 (Angola)', phone: '244' },
  { code: 'AQ', label: '남극대륙 (Antarctica)', phone: '672' },
  { code: 'AR', label: '아르헨티나 (Argentina)', phone: '54' },
  { code: 'AS', label: '미국령 사모아 (American Samoa)', phone: '1-684' },
  { code: 'AT', label: '오스트리아 (Austria)', phone: '43' },
  { code: 'AU', label: '오스트레일리아 (Australia)', phone: '61' },
  { code: 'AW', label: '아루바 (Aruba)', phone: '297' },
  { code: 'AX', label: '올란드 제도 (Åland Islands)', phone: '358' },
  { code: 'AZ', label: '아제르바이잔 (Azerbaijan)', phone: '994' },
  {
    code: 'BA',
    label: '보스니아 헤르체고비나 (Bosnia and Herzegovina)',
    phone: '387',
  },
  { code: 'BB', label: '바베이도스 (Barbados)', phone: '1-246' },
  { code: 'BD', label: '방글라데시 (Bangladesh)', phone: '880' },
  { code: 'BE', label: '벨기에 (Belgium)', phone: '32' },
  { code: 'BF', label: '부르키나파소 (Burkina Faso)', phone: '226' },
  { code: 'BG', label: '불가리아 (Bulgaria)', phone: '359' },
  { code: 'BH', label: '바레인 (Bahrain)', phone: '973' },
  { code: 'BI', label: '부룬디 (Burundi)', phone: '257' },
  { code: 'BJ', label: '베냉 (Benin)', phone: '229' },
  { code: 'BL', label: '생바르텔르미 (Saint Barthélemy)', phone: '590' },
  { code: 'BM', label: '버뮤다 (Bermuda)', phone: '1-441' },
  { code: 'BN', label: '브루나이 (Brunei Darussalam)', phone: '673' },
  {
    code: 'BO',
    label: '볼리비아 (Bolivia, Plurinational State of)',
    phone: '591',
  },
  {
    code: 'BQ',
    label: '보네르, 스타 테루스타, 사바 (Bonaire, Sint Eustatius and Saba)',
    phone: '599',
  },
  { code: 'BR', label: '브라질 (Brazil)', phone: '55' },
  { code: 'BS', label: '바하마 (Bahamas)', phone: '1-242' },
  { code: 'BT', label: '부탄 (Bhutan)', phone: '975' },
  { code: 'BV', label: '부베 섬 (Bouvet Island)', phone: '47' },
  { code: 'BW', label: '보츠와나 (Botswana)', phone: '267' },
  { code: 'BY', label: '벨라루스 (Belarus)', phone: '375' },
  { code: 'BZ', label: '벨리즈 (Belize)', phone: '501' },
  { code: 'CA', label: '캐나다 (Canada)', phone: '1' },
  { code: 'CC', label: '코코스 제도 (Cocos (Keeling) Islands)', phone: '61' },
  {
    code: 'CD',
    label: '콩고 민주 공화국 (Congo, the Democratic Republic of the)',
    phone: '243',
  },
  {
    code: 'CF',
    label: '중앙아프리카 공화국 (Central African Republic)',
    phone: '236',
  },
  { code: 'CG', label: '콩고 (Congo)', phone: '242' },
  { code: 'CH', label: '스위스 (Switzerland)', phone: '41' },
  { code: 'CI', label: "코트디부아르 (Côte d'Ivoire)", phone: '225' },
  { code: 'CK', label: '쿡 제도 (Cook Islands)', phone: '682' },
  { code: 'CL', label: '칠레 (Chile)', phone: '56' },
  { code: 'CM', label: '카메룬 (Cameroon)', phone: '237' },
  { code: 'CN', label: '중국 (China)', phone: '86' },
  { code: 'CO', label: '콜롬비아 (Colombia)', phone: '57' },
  { code: 'CR', label: '코스타리카 (Costa Rica)', phone: '506' },
  { code: 'CU', label: '쿠바 (Cuba)', phone: '53' },
  { code: 'CV', label: '카보베르데 (Cabo Verde)', phone: '238' },
  { code: 'CW', label: '쿠라사오 (Curaçao)', phone: '599' },
  { code: 'CX', label: '크리스마스 섬 (Christmas Island)', phone: '61' },
  { code: 'CY', label: '키프로스 (Cyprus)', phone: '357' },
  { code: 'CZ', label: '체코 (Czech Republic)', phone: '420' },
  { code: 'DE', label: '독일 (Germany)', phone: '49' },
  { code: 'DJ', label: '지부티 (Djibouti)', phone: '253' },
  { code: 'DK', label: '덴마크 (Denmark)', phone: '45' },
  { code: 'DM', label: '도미니카 연방 (Dominica)', phone: '1-767' },
  {
    code: 'DO',
    label: '도미니카 공화국 (Dominican Republic)',
    phone: '1-809, 1-829, 1-849',
  },
  { code: 'DZ', label: '알제리 (Algeria)', phone: '213' },
  { code: 'EC', label: '에콰도르 (Ecuador)', phone: '593' },
  { code: 'EE', label: '에스토니아 (Estonia)', phone: '372' },
  { code: 'EG', label: '이집트 (Egypt)', phone: '20' },
  { code: 'EH', label: '서사하라 (Western Sahara)', phone: '212' },
  { code: 'ER', label: '에리트레아 (Eritrea)', phone: '291' },
  { code: 'ES', label: '스페인 (Spain)', phone: '34' },
  { code: 'ET', label: '에티오피아 (Ethiopia)', phone: '251' },
  { code: 'FI', label: '핀란드 (Finland)', phone: '358' },
  { code: 'FJ', label: '피지 (Fiji)', phone: '679' },
  {
    code: 'FK',
    label: '포클랜드 제도 (Falkland Islands (Malvinas))',
    phone: '500',
  },
  {
    code: 'FM',
    label: '미크로네시아 연방 (Micronesia, Federated States of)',
    phone: '691',
  },
  { code: 'FO', label: '페로 제도 (Faroe Islands)', phone: '298' },
  { code: 'FR', label: '프랑스 (France)', phone: '33', suggested: true },
  { code: 'GA', label: '가봉 (Gabon)', phone: '241' },
  { code: 'GB', label: '영국 (United Kingdom)', phone: '44' },
  { code: 'GD', label: '그레나다 (Grenada)', phone: '1-473' },
  { code: 'GE', label: '조지아 (Georgia)', phone: '995' },
  { code: 'GF', label: '프랑스령 기아나 (French Guiana)', phone: '594' },
  { code: 'GG', label: '건지 섬 (Guernsey)', phone: '44' },
  { code: 'GH', label: '가나 (Ghana)', phone: '233' },
  { code: 'GI', label: '지브롤터 (Gibraltar)', phone: '350' },
  { code: 'GL', label: '그린란드 (Greenland)', phone: '299' },
  { code: 'GM', label: '감비아 (Gambia)', phone: '220' },
  { code: 'GN', label: '기니 (Guinea)', phone: '224' },
  { code: 'GP', label: '과들루프 (Guadeloupe)', phone: '590' },
  { code: 'GQ', label: '적도 기니 (Equatorial Guinea)', phone: '240' },
  { code: 'GR', label: '그리스 (Greece)', phone: '30' },
  {
    code: 'GS',
    label:
      '사우스조지아와 사우스샌드위치 제도 (South Georgia and the South Sandwich Islands)',
    phone: '500',
  },
  { code: 'GT', label: '과테말라 (Guatemala)', phone: '502' },
  { code: 'GU', label: '괌 (Guam)', phone: '1-671' },
  { code: 'GW', label: '기니 비사우 (Guinea-Bissau)', phone: '245' },
  { code: 'GY', label: '가이아나 (Guyana)', phone: '592' },
  { code: 'HK', label: '홍콩 (Hong Kong)', phone: '852' },
  {
    code: 'HM',
    label: '허드 맥도널드 제도 (Heard Island and McDonald Islands)',
    phone: '672',
  },
  { code: 'HN', label: '온두라스 (Honduras)', phone: '504' },
  { code: 'HR', label: '크로아티아 (Croatia)', phone: '385' },
  { code: 'HT', label: '아이티 (Haiti)', phone: '509' },
  { code: 'HU', label: '헝가리 (Hungary)', phone: '36' },
  { code: 'ID', label: '인도네시아 (Indonesia)', phone: '62' },
  { code: 'IE', label: '아일랜드 (Ireland)', phone: '353' },
  { code: 'IL', label: '이스라엘 (Israel)', phone: '972' },
  { code: 'IM', label: '맨섬 (Isle of Man)', phone: '44' },
  { code: 'IN', label: '인도 (India)', phone: '91' },
  {
    code: 'IO',
    label: '영국령 인도양 지역 (British Indian Ocean Territory)',
    phone: '246',
  },
  { code: 'IQ', label: '이라크 (Iraq)', phone: '964' },
  { code: 'IR', label: '이란 (Iran, Islamic Republic of)', phone: '98' },
  { code: 'IS', label: '아이슬란드 (Iceland)', phone: '354' },
  { code: 'IT', label: '이탈리아 (Italy)', phone: '39' },
  { code: 'JE', label: '저지 (Jersey)', phone: '44' },
  { code: 'JM', label: '자메이카 (Jamaica)', phone: '1-876' },
  { code: 'JO', label: '요르단 (Jordan)', phone: '962' },
  { code: 'JP', label: '일본 (Japan)', phone: '81', suggested: true },
  { code: 'KE', label: '케냐 (Kenya)', phone: '254' },
  { code: 'KG', label: '키르기스스탄 (Kyrgyzstan)', phone: '996' },
  { code: 'KH', label: '캄보디아 (Cambodia)', phone: '855' },
  { code: 'KI', label: '키리바시 (Kiribati)', phone: '686' },
  { code: 'KM', label: '코모로 (Comoros)', phone: '269' },
  {
    code: 'KN',
    label: '세인트키츠 네비스 (Saint Kitts and Nevis)',
    phone: '1-869',
  },
  { code: 'KR', label: '대한민국 (Korea, Republic of)', phone: '82' },
  { code: 'KW', label: '쿠웨이트 (Kuwait)', phone: '965' },
  { code: 'KY', label: '케이맨 제도 (Cayman Islands)', phone: '1-345' },
  { code: 'KZ', label: '카자흐스탄 (Kazakhstan)', phone: '7' },
  {
    code: 'LA',
    label: "라오스 인민 민주 공화국 (Lao People's Democratic Republic)",
    phone: '856',
  },
  { code: 'LB', label: '레바논 (Lebanon)', phone: '961' },
  { code: 'LC', label: '세인트루시아 (Saint Lucia)', phone: '1-758' },
  { code: 'LI', label: '리히텐슈타인 (Liechtenstein)', phone: '423' },
  { code: 'LK', label: '스리랑카 (Sri Lanka)', phone: '94' },
  { code: 'LR', label: '라이베리아 (Liberia)', phone: '231' },
  { code: 'LS', label: '레소토 (Lesotho)', phone: '266' },
  { code: 'LT', label: '리투아니아 (Lithuania)', phone: '370' },
  { code: 'LU', label: '룩셈부르크 (Luxembourg)', phone: '352' },
  { code: 'LV', label: '라트비아 (Latvia)', phone: '371' },
  { code: 'LY', label: '리비아 (Libya)', phone: '218' },
  { code: 'MA', label: '모로코 (Morocco)', phone: '212' },
  { code: 'MC', label: '모나코 (Monaco)', phone: '377' },
  { code: 'MD', label: '몰도바 공화국 (Moldova, Republic of)', phone: '373' },
  { code: 'ME', label: '몬테네그로 (Montenegro)', phone: '382' },
  { code: 'MF', label: '생마르탱 (Saint Martin (French part))', phone: '590' },
  { code: 'MG', label: '마다가스카르 (Madagascar)', phone: '261' },
  { code: 'MH', label: '마셜 제도 (Marshall Islands)', phone: '692' },
  {
    code: 'MK',
    label: '마케도니아 공화국 (Macedonia, the Former Yugoslav Republic of)',
    phone: '389',
  },
  { code: 'ML', label: '말리 (Mali)', phone: '223' },
  { code: 'MM', label: '미얀마 (Myanmar)', phone: '95' },
  { code: 'MN', label: '몽골 (Mongolia)', phone: '976' },
  { code: 'MO', label: '마카오 (Macao)', phone: '853' },
  {
    code: 'MP',
    label: '북마리아나 제도 (Northern Mariana Islands)',
    phone: '1-670',
  },
  { code: 'MQ', label: '마르티니크 (Martinique)', phone: '596' },
  { code: 'MR', label: '모리타니 (Mauritania)', phone: '222' },
  { code: 'MS', label: '몬트세랫 (Montserrat)', phone: '1-664' },
  { code: 'MT', label: '몰타 (Malta)', phone: '356' },
  { code: 'MU', label: '모리셔스 (Mauritius)', phone: '230' },
  { code: 'MV', label: '몰디브 (Maldives)', phone: '960' },
  { code: 'MW', label: '말라위 (Malawi)', phone: '265' },
  { code: 'MX', label: '멕시코 (Mexico)', phone: '52' },
  { code: 'MY', label: '말레이시아 (Malaysia)', phone: '60' },
  { code: 'MZ', label: '모잠비크 (Mozambique)', phone: '258' },
  { code: 'NA', label: '나미비아 (Namibia)', phone: '264' },
  { code: 'NC', label: '뉴칼레도니아 (New Caledonia)', phone: '687' },
  { code: 'NE', label: '니제르 (Niger)', phone: '227' },
  { code: 'NF', label: '노퍽섬 (Norfolk Island)', phone: '672' },
  { code: 'NG', label: '나이지리아 (Nigeria)', phone: '234' },
  { code: 'NI', label: '니카라과 (Nicaragua)', phone: '505' },
  { code: 'NL', label: '네덜란드 (Netherlands)', phone: '31' },
  { code: 'NO', label: '노르웨이 (Norway)', phone: '47' },
  { code: 'NP', label: '네팔 (Nepal)', phone: '977' },
  { code: 'NR', label: '나우루 (Nauru)', phone: '674' },
  { code: 'NU', label: '니우에 (Niue)', phone: '683' },
  { code: 'NZ', label: '뉴질랜드 (New Zealand)', phone: '64' },
  { code: 'OM', label: '오만 (Oman)', phone: '968' },
  { code: 'PA', label: '파나마 (Panama)', phone: '507' },
  { code: 'PE', label: '페루 (Peru)', phone: '51' },
  { code: 'PF', label: '프랑스령 폴리네시아 (French Polynesia)', phone: '689' },
  { code: 'PG', label: '파푸아뉴기니 (Papua New Guinea)', phone: '675' },
  { code: 'PH', label: '필리핀 (Philippines)', phone: '63' },
  { code: 'PK', label: '파키스탄 (Pakistan)', phone: '92' },
  { code: 'PL', label: '폴란드 (Poland)', phone: '48' },
  {
    code: 'PM',
    label: '생피에르 미클롱 (Saint Pierre and Miquelon)',
    phone: '508',
  },
  { code: 'PN', label: '핏케언 제도 (Pitcairn)', phone: '870' },
  { code: 'PR', label: '푸에르토리코 (Puerto Rico)', phone: '1' },
  { code: 'PN', label: '핏케언 제도 (Pitcairn)', phone: '870' },
  { code: 'PR', label: '푸에르토리코 (Puerto Rico)', phone: '1' },
  { code: 'PT', label: '포르투갈 (Portugal)', phone: '351' },
  { code: 'PW', label: '팔라우 (Palau)', phone: '680' },
  { code: 'PY', label: '파라과이 (Paraguay)', phone: '595' },
  { code: 'QA', label: '카타르 (Qatar)', phone: '974' },
  { code: 'RE', label: '레위니옹 (Reunion)', phone: '262' },
  { code: 'RO', label: '루마니아 (Romania)', phone: '40' },
  { code: 'RS', label: '세르비아 (Serbia)', phone: '381' },
  { code: 'RU', label: '러시아 연방 (Russian Federation)', phone: '7' },
  { code: 'RW', label: '르완다 (Rwanda)', phone: '250' },
  { code: 'SA', label: '사우디아라비아 (Saudi Arabia)', phone: '966' },
  { code: 'SB', label: '솔로몬 제도 (Solomon Islands)', phone: '677' },
  { code: 'SC', label: '세이셸 (Seychelles)', phone: '248' },
  { code: 'SD', label: '수단 (Sudan)', phone: '249' },
  { code: 'SE', label: '스웨덴 (Sweden)', phone: '46' },
  { code: 'SG', label: '싱가포르 (Singapore)', phone: '65' },
  { code: 'SH', label: '세인트헬레나 (Saint Helena)', phone: '290' },
  { code: 'SI', label: '슬로베니아 (Slovenia)', phone: '386' },
  {
    code: 'SJ',
    label: '스발바르 얀 마옌 제도 (Svalbard and Jan Mayen)',
    phone: '47',
  },
  { code: 'SK', label: '슬로바키아 (Slovakia)', phone: '421' },
  { code: 'SL', label: '시에라리온 (Sierra Leone)', phone: '232' },
  { code: 'SM', label: '산마리노 (San Marino)', phone: '378' },
  { code: 'SN', label: '세네갈 (Senegal)', phone: '221' },
  { code: 'SO', label: '소말리아 (Somalia)', phone: '252' },
  { code: 'SR', label: '수리남 (Suriname)', phone: '597' },
  { code: 'SS', label: '남수단 (South Sudan)', phone: '211' },
  {
    code: 'ST',
    label: '상투메 프린시페 (Sao Tome and Principe)',
    phone: '239',
  },
  { code: 'SV', label: '엘살바도르 (El Salvador)', phone: '503' },
  {
    code: 'SX',
    label: '신트마르턴 (네덜란드령) (Sint Maarten (Dutch part))',
    phone: '1-721',
  },
  {
    code: 'SY',
    label: '시리아 아랍 공화국 (Syrian Arab Republic)',
    phone: '963',
  },
  { code: 'SZ', label: '스와질란드 (Swaziland)', phone: '268' },
  {
    code: 'TC',
    label: '터크스 케이커스 제도 (Turks and Caicos Islands)',
    phone: '1-649',
  },
  { code: 'TD', label: '차드 (Chad)', phone: '235' },
  {
    code: 'TF',
    label: '프랑스령 남부와 남극 지역 (French Southern Territories)',
    phone: '262',
  },
  { code: 'TG', label: '토고 (Togo)', phone: '228' },
  { code: 'TH', label: '태국 (Thailand)', phone: '66' },
  { code: 'TJ', label: '타지키스탄 (Tajikistan)', phone: '992' },
  { code: 'TK', label: '토켈라우 (Tokelau)', phone: '690' },
  { code: 'TL', label: '동티모르 (Timor-Leste)', phone: '670' },
  { code: 'TM', label: '투르크메니스탄 (Turkmenistan)', phone: '993' },
  { code: 'TN', label: '튀니지 (Tunisia)', phone: '216' },
  { code: 'TO', label: '통가 (Tonga)', phone: '676' },
  { code: 'TR', label: '터키 (Turkey)', phone: '90' },
  {
    code: 'TT',
    label: '트리니다드 토바고 (Trinidad and Tobago)',
    phone: '1-868',
  },
  { code: 'TV', label: '투발루 (Tuvalu)', phone: '688' },
  { code: 'TW', label: '대만 (Taiwan)', phone: '886' },
  {
    code: 'TZ',
    label: '탄자니아 연합 공화국 (United Republic of Tanzania)',
    phone: '255',
  },
  { code: 'UA', label: '우크라이나 (Ukraine)', phone: '380' },
  { code: 'UG', label: '우간다 (Uganda)', phone: '256' },
  { code: 'US', label: '미국 (United States)', phone: '1', suggested: true },
  { code: 'UY', label: '우루과이 (Uruguay)', phone: '598' },
  { code: 'UZ', label: '우즈베키스탄 (Uzbekistan)', phone: '998' },
  {
    code: 'VA',
    label: '바티칸 시국 (Holy See (Vatican City State))',
    phone: '379',
  },
  {
    code: 'VC',
    label: '세인트빈센트 그레나딘 (Saint Vincent and the Grenadines)',
    phone: '1-784',
  },
  { code: 'VE', label: '베네수엘라 (Venezuela)', phone: '58' },
  {
    code: 'VG',
    label: '영국령 버진아일랜드 (British Virgin Islands)',
    phone: '1-284',
  },
  {
    code: 'VI',
    label: '미국령 버진아일랜드 (US Virgin Islands)',
    phone: '1-340',
  },
  { code: 'VN', label: '베트남 (Vietnam)', phone: '84' },
  { code: 'VU', label: '바누아투 (Vanuatu)', phone: '678' },
  { code: 'WF', label: '왈리스 퓌투나 (Wallis and Futuna)', phone: '681' },
  { code: 'WS', label: '사모아 (Samoa)', phone: '685' },
  { code: 'XK', label: '코소보 (Kosovo)', phone: '383' },
  { code: 'YE', label: '예멘 (Yemen)', phone: '967' },
  { code: 'YT', label: '마요트 (Mayotte)', phone: '262' },
  { code: 'ZA', label: '남아프리카 공화국 (South Africa)', phone: '27' },
  { code: 'ZM', label: '잠비아 (Zambia)', phone: '260' },
  { code: 'ZW', label: '짐바브웨 (Zimbabwe)', phone: '263' },
];
