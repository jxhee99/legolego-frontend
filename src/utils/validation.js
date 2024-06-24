const validateForm = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = '이름을 입력하세요.';
  }

  if (!values.nickname.trim()) {
    errors.nickname = '닉네임을 입력하세요.';
  }

  if (!values.email) {
    errors.email = '이메일을 입력하세요.';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = '유효한 이메일을 입력하세요.';
  }

  if (!values.mobile) {
    errors.mobile = '휴대전화를 입력하세요.';
  } else if (!/^010-\d{4}-\d{4}$/.test(values.mobile)) {
    errors.mobile = '유효한 휴대전화 번호를 입력하세요. (예: 010-1234-5678)';
  }

  if (!values.password) {
    errors.password = '비밀번호를 입력하세요.';
  } else if (values.password.length < 6) {
    errors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
  }

  if (!values.checkPassword) {
    errors.checkPassword = '비밀번호를 재확인하세요.';
  } else if (values.password !== values.checkPassword) {
    errors.checkPassword = '비밀번호가 일치하지 않습니다.';
  }

  return errors;
};

export default validateForm;
