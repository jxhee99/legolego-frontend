import Review from '../pages/About/Review/Review';
import Avatar from '../components/Avatar/Avatar';

export default {
  title: 'About/Review',
  component: Review,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <Review {...args} />;

export const Default = Template.bind({});
Default.args = {
  reviewContent:
    '제가 만든 패키지는 상품화 되지 않았지만\n 마음에 드는 패키지가 사이트에 올라와서 여행에 다녀왔어요!\n 패키지 여행 선정 방식이 신선하고 재밌어요!',
  user: (
    <Avatar
      nickname="text123"
      imageUrl="https://picsum.photos/seed/helloworld/200/100"
    />
  ),
};
