import Header from '../components/Header/Header';
import Logo from '../components/Logo/Logo';
import Menu from '../components/Header/Menu';
import Authentication from '../components/Header/Authentication';

export default {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    logo: <Logo />,
    Menu: <Menu />,
    authentication: <Authentication />,
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
