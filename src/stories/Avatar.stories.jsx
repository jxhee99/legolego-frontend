import Avatar from '../components/Avatar/Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <Avatar {...args} />;

export const Default = Template.bind({});

Default.args = {
  nickname: 'text123',
  imageUrl: 'https://picsum.photos/seed/helloworld/200/100',
};
