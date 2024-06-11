import Review from '../components/Cards/Review';

export default {
  title: 'Components/Review',
  component: Review,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <Review {...args} />;

export const Default = Template.bind({});
Default.args = {
  reviewTitle: '스페인 여행 후기',
  reviewContent:
    '제가 만든 패키지는 상품화 되지 못했지만\n마침 제가 만든 패키지와 비슷한 패키지가 올라와서 여행에 다녀왔어요! 신선하고 좋았습니다!',
};
