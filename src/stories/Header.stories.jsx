import Header from '../components/Header/Header';

export default {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isLoggedIn: true,
  },
};

const Template = (args) => <Header {...args} />;

export const LoggedIn = {
  args: {
    isLoggedIn: false,
  },
};

export const LoggedOut = {
  args: {
    isLoggedIn: true,
  },
};
