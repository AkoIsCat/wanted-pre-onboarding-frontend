import { useNavigate } from 'react-router';
import { useEffect } from 'react';

import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'NanumBarunGothic';
`;

export const Header = styled.header`
  width: 100vw;
  background: #ffc0cb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  div {
    margin: 0 50px;
    font-size: 2em;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: 50px 0;
  justify-content: center;
  align-items: center;
`;

export const ButtonWrap = styled.div`
  display: flex;
  width: 15vw;
  height: 10vh;
  margin: 30px 100px;

  button {
    width: 100%;
    height: 100%;
    background: pink;
    font-size: 1.5em;
    color: #000;
    cursor: pointer;
    font-family: 'NanumBarunGothic';
  }
`;

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/todo');
    }
  }, [navigate]);

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
      </Header>
      <Main>
        <h1>어서오세요 반가워요</h1>
        <ButtonWrap>
          <button
            onClick={() => {
              navigate('/signin');
            }}
          >
            로그인
          </button>
        </ButtonWrap>
        <ButtonWrap>
          <button
            onClick={() => {
              navigate('/signup');
            }}
          >
            회원가입
          </button>
        </ButtonWrap>
      </Main>
    </Container>
  );
};

export default Home;
