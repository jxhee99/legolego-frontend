import Package from '../components/Cards/Package';
import Avatar from '../components/Avatar/Avatar';

export default {
  title: 'Components/Package',
  component: Package,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <Package {...args} />;

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
