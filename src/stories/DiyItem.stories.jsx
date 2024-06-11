import DiyItem from '../components/DiyItem/DiyItem';

export default {
  title: 'Diy/DiyItem',
  component: DiyItem,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <DiyItem {...args} />;

export const Default = Template.bind({});
Default.args = { imageUrl: 'https://picsum.photos/seed/picsum/300/200' };
