import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { Container, Header, Main, ButtonWrap } from './Home';
import { signIn } from '../api/auth';

import styled from 'styled-components';

const UpdateMain = styled(Main)`
  width: 30vw;
  height: 80vh;
  background: #ffc0cb;
  border-radius: 50px;

  h1 {
    border-radius: 20px;
    background: #fff;
    padding: 15px;
  }
`;

const Form = styled.form`
  width: 25vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 20px;

  div {
    margin: 25px;
    display: flex;
    justify-content: center;
    align-items: center;

    label {
      font-size: 20px;
      margin: 0 10px;
    }

    input {
      width: 10vw;
      height: 2vh;
    }
  }
`;

const SignUp = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  let formValid = false;

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/todo');
    }
  }, [navigate]);

  const onChangeId = (e) => {
    const newUserName = e.target.value;
    setId(newUserName);
  };

  const onChangePw = (e) => {
    const newUserPassword = e.target.value;
    setPassword(newUserPassword);
  };

  if (id.includes('@') && password.length > 7) {
    formValid = true;
  } else {
    formValid = false;
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    signIn(id, password).then((response) => {
      if (response.access_token) {
        alert('로그인 되었습니다.');
        localStorage.setItem('access_token', response.access_token);
        navigate('/todo');
      } else {
        alert(response.message);
      }
    });
  };

  return (
    <Container>
      <Header>
        <div
          onClick={() => {
            navigate('/');
          }}
        >
          원티드 프리온보딩 프론트엔드 - 선발 과제
        </div>
        <div
          onClick={() => {
            navigate('/signup');
          }}
        >
          회원가입
        </div>
      </Header>
      <UpdateMain>
        <h1>로그인</h1>
        <Form onSubmit={onSubmitHandler}>
          <div>
            <label>이메일</label>
            <input
              type="email"
              data-testid="email-input"
              onChange={onChangeId}
              placeholder="@을 포함해서 입력해주세요."
            />
          </div>
          <div>
            <label>비밀번호</label>
            <input
              type="password"
              data-testid="password-input"
              onChange={onChangePw}
              placeholder="8자 이상 입력해주세요."
            />
          </div>
          <ButtonWrap>
            <button
              type="submit"
              data-testid="signin-button"
              disabled={!formValid}
            >
              로그인
            </button>
          </ButtonWrap>
        </Form>
      </UpdateMain>
    </Container>
  );
};

export default SignUp;
