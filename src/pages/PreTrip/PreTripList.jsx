import CommentSection from './CommentSection/CommentSection';
import PreTrip from './PreTrip';

const mock = [
  {
    boardNum: 1,
    productImage:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXUpGDL3q02JzSgwG1IxH9MNfBptTCslp7Q0ndhvEkfuRPClm7GnWsTsrm7xdnwDVLl3d0CxjJisbHkIl7E8jgm2PHjCyyc9bqV2o1-EXf96z7czX4cINOmYn7HpFhL-HDIH8HFBEMhMa5_pkvyjV8FAnHaaXR5I8ytDNC34oZ9g-kQP&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=65764',
    productName: '레고 후쿠오카',
    price: 100.0,
    boardingDate: '2024-06-27T11:00:00',
    comingDate: '2024-06-28T08:35:00',
    userNickname: '짱구',
  },
  {
    boardNum: 2,
    productImage:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXUSRObvbhm5j6ZaNwpUcq65rYlKW6oJiAti7nwtWLjPs_iZe1zSYzIZaBPcuhvUY6u7NurLe4Bo5oMeTSUeFf0Y3AMNGne1Q3l1dcRFvDTkr2sktAdGTSAq9OyBsZKEi1-Suusfw8YTi46UY47vfqAxvwrsTQPP-uKucBX8I8BLC_ur&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=54302',
    productName: '레고 후쿠오카',
    price: 100.0,
    boardingDate: '2024-06-27T11:00:00',
    comingDate: '2024-06-28T08:35:00',
    userNickname: '유리',
  },
  {
    boardNum: 3,
    productImage:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXX2i2MqhvCdupBsTmP9mNEB91k2MfDX8sVzPix9B5_zsnmbUjlHI_02tqQGh61aQxhhAGLk6xlCXjIjVECzpAj1sTiIHrn56mTfwfGrWNfG1ixuFx3fYNkejxka8SVb_93WUsIDXiOT0gKcy7yrehQLKyNGicyIZdy2zvwB03L2877H&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=31455',
    productName: '레고 후쿠오카',
    price: 100.0,
    boardingDate: '2024-06-27T11:00:00',
    comingDate: '2024-06-28T08:35:00',
    userNickname: '훈이',
  },
  {
    boardNum: 4,
    productImage:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXUDRlRaYduyyOCei-dY2RpYI9gdrkLEdBbbBg87pCC5u51URLxvgUyKeWQxD5LhrEAERVxnIIfX95cPOQ38VYEmQLsthbMyKomjS8wyl20na3kjYHUvm-U7qpglxo2v4rKdWHUc74weufo-6ug6g1IXcra_JRIWNG_SJuBPpTuhSgxt&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=21498',
    productName: '레고 후쿠오카',
    price: 100.0,
    boardingDate: '2024-06-27T11:00:00',
    comingDate: '2024-06-28T08:35:00',
    userNickname: '맹구',
  },
  {
    boardNum: 5,
    productImage:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXUVb6-AeZK83bqdVAUZoua_bTb6KGYwuwZELV4_tGiNANdvsI52xnmxH4hv73c3KaTOyUAg8T8UnCMQGVfe9kxjrK_3GSvB09-VINGnqy1M9lwPizgc51B1x9m_OxrfrW1wvdOm5uoXRG4s162L_Jw_rnMpANe73NlRl2p_bsj6rcho&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=92405',
    productName: '레고 후쿠오카',
    price: 100.0,
    boardingDate: '2024-06-27T11:00:00',
    comingDate: '2024-06-28T08:35:00',
    userNickname: '철수',
  },
];

const PreTripList = () => {
  return (
    <div>
      <CommentSection data={mock} />
      <PreTrip />
    </div>
  );
};

export default PreTripList;
