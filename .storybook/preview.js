import '../src/index.css';
import { AuthProvider } from '../src/contexts/AuthContext.jsx';

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ['autodocs']
};

export default preview;
