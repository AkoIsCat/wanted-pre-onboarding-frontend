import styled from 'styled-components';
import { TodoDispatchContext } from '../../store/todoItem-context';
import { useContext, useState } from 'react';
import { deleteTodoApi, updateTodoApi } from '../../api/todo';

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin: 20px 15px;
  font-family: 'NanumBarunGothicLight';

  button {
    width: 50px;
    height: 50px;
    margin: 0 10px;
    border: 1px solid #c1c1c1;
    cursor: pointer;
    font-size: 1em;
    font-family: 'NanumBarunGothicLight';

    &:hover {
      background: #d3d3d3;
    }
  }

  label {
    display: flex;
    align-items: center;
  }

  .button {
    width: 40px;
    height: 40px;
    border: 1px solid #c1c1c1;
    cursor: pointer;

    &:hover {
      background: #f3f3f3;
    }
  }

  .todo {
    font-size: 1.5em;
    margin: 0 10px;
    width: 13vw;
    color: ${(props) => (props.toCompleted ? '#736f6e' : '000')};
    text-decoration: ${(props) =>
      props.toCompleted ? 'line-through' : 'none'};
  }

  .editInput {
    width: 13.6vw;
  }
`;

const TodoItem = ({ id, todo, isCompleted, updateValue }) => {
  const [activateEdit, setActivateEdit] = useState(false);
  const [inputValue, setInputValue] = useState(todo);
  const [isChecked, setIsChecked] = useState(isCompleted);

  const dispatch = useContext(TodoDispatchContext);

  const toggleHandler = () => {
    updateTodoApi(id, todo, !isCompleted);
    dispatch({ type: 'TOGGLE', id });
  };

  const deleteHandler = () => {
    deleteTodoApi(id);
    dispatch({ type: 'DELETE', id });
  };

  const editHandler = (e) => {
    e.stopPropagation();
    setActivateEdit(true);
  };

  const cancelEdit = () => {
    setActivateEdit(false);
    setInputValue(todo);
  };

  const onChangeCheckboxHandler = () => {
    setIsChecked(!isChecked);
  };

  const onChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const submitHandler = () => {
    const updatedTodo = {
      id,
      todo: inputValue,
      isCompleted,
    };
    updateTodoApi(id, inputValue, isCompleted);
    dispatch({ type: 'EDIT', item: updatedTodo });
    setActivateEdit(false);
    updateValue(inputValue);
  };

  return (
    <ListItem key={id} toCompleted={isChecked}>
      <label>
        <input
          type="checkbox"
          className="button"
          onClick={toggleHandler}
          checked={isChecked}
          onChange={onChangeCheckboxHandler}
        />
        {!activateEdit && <span className="todo">{inputValue}</span>}
        {activateEdit && (
          <input
            data-testid="modify-input"
            value={inputValue}
            onChange={onChangeInputValue}
            className="editInput"
          />
        )}
      </label>
      {!activateEdit && (
        <div>
          <button
            data-testid="modify-button"
            onClick={editHandler}
            type="button"
          >
            수정
          </button>
          <button data-testid="delete-button" onClick={deleteHandler}>
            삭제
          </button>
        </div>
      )}
      {activateEdit && (
        <div>
          <button
            type="submit"
            data-testid="submit-button"
            onClick={submitHandler}
          >
            제출
          </button>
          <button
            type="cancel"
            data-testid="cancel-button"
            onClick={cancelEdit}
          >
            취소
          </button>
        </div>
      )}
    </ListItem>
  );
};

export default TodoItem;
