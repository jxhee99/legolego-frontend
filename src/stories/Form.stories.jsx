import Form from '../components/Form/Form';
import InputFiled from '../components/Form/InputField';
import SubmitButton from '../components/Form/SubmitButton';

export default {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
    componentSubtitle: '폼 컴포넌트 예시 - 로그인',
  },
};

const Template = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: [
    <InputFiled type="email" text="로그인" />,
    <InputFiled type="password" text="비밀번호" />,
  ],
  submitButton: <SubmitButton text="로그인" />,
  findAccount: '아이디 찾기 / 비밀번호 찾기',
};
