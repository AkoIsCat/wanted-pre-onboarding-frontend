// 회원가입
export const signUpApi = async (email, password) => {
  try {
    const response = await fetch(
      'https://www.pre-onboarding-selection-task.shop/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );
    if (response !== undefined) {
      const result = await response.json();
      return result;
    }
    return response;
  } catch (error) {
    return error;
  }
};

// 로그인
export const signIn = async (email, password) => {
  try {
    const response = await fetch(
      'https://www.pre-onboarding-selection-task.shop/auth/signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
