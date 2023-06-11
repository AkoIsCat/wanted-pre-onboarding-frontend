import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

import styled from 'styled-components';
import { Container, Header, Main } from './Home';
import TodoCreate from '../components/todo/TodoCreate';
import { getTodoApi } from '../api/todo';
import { TodoDispatchContext } from '../store/todoItem-context';

import TodoList from '../components/todo/TodoList';

const TodoWrap = styled.div`
  width: 100%;
  background: pink;
  padding: 20px 0;
  margin: 20px 0;

  .todoList {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Todo = () => {
  const dispatch = useContext(TodoDispatchContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/signin');
    }
  }, [navigate]);

  useEffect(() => {
    const getData = () =>
      getTodoApi()
        .then((res) => {
          dispatch({ type: 'INIT', initTodos: res });
        })
        .catch((err) => {
          throw new Error(err);
        });

    if (localStorage.getItem('access_token')) {
      getData();
    }
  }, [dispatch]);
  // console.log(todo);

  const onClickLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <div
          onClick={() => {
            navigate('/todo');
          }}
        >
          TodoList
        </div>
        <div onClick={onClickLogout}>로그아웃</div>
      </Header>
      <Main>
        <TodoWrap className="contentWrap">
          <TodoCreate />
          <TodoList />
        </TodoWrap>
      </Main>
    </Container>
  );
};

export default Todo;
