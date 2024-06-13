import DiyCard from '../components/DiyItem/DiyItem';
import Avatar from '../components/Avatar/Avatar';

export default {
  title: 'Card/DiyCard',
  component: DiyCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <DiyCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageUrl: 'https://picsum.photos/seed/picsum/300/200',
  title: '문화재 위주로 다니는 여행',
  user: (
    <Avatar
      nickname="test123"
      imageUrl="https://picsum.photos/seed/helloworld/200/100"
    />
  ),
};
