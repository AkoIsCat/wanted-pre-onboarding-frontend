import { useRef, useContext } from 'react';
import styled from 'styled-components';
import { createTodoApi } from '../../api/todo';
import { TodoDispatchContext } from '../../store/todoItem-context';

const FormTodoItem = styled.div`
  width: 25vw;
  height: 7vh;

  .form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input {
    width: 75%;
    height: 70%;
    margin: 0 10px;
    border: 0;
    border-bottom: 1px solid #a1a1a1;

    &:focus {
      outline: none;
    }
  }

  .button {
    width: 15%;
    height: 70%;
    margin: 0 10px;
    border: 1px solid #c1c1c1;
    cursor: pointer;
    font-size: 1.2em;
    font-family: 'NanumBarunGothicLight';

    &:hover {
      background: #d3d3d3;
    }
  }
`;

const TodoCreate = () => {
  const inputRef = useRef();

  const dispatch = useContext(TodoDispatchContext);

  const createTodoItem = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) {
      return;
    }
    createTodoApi(inputRef.current.value).then((res) => {
      inputRef.current.value = '';
      dispatch({ type: 'CREATE', item: res });
    });
  };

  return (
    <FormTodoItem>
      <form onSubmit={createTodoItem} className="form">
        <input
          data-testid="new-todo-input"
          ref={inputRef}
          placeholder="할 일을 입력해 주세요."
          className="input"
        />
        <button
          type="submit"
          data-testid="new-todo-add-button"
          className="button"
        >
          추가
        </button>
      </form>
    </FormTodoItem>
  );
};

export default TodoCreate;
