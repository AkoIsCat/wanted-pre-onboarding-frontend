import { useContext, useEffect, useState } from 'react';

import { getTodoApi } from '../../api/todo';
import {
  TodoDispatchContext,
  TodoStateContext,
} from '../../store/todoItem-context';

import TodoItem from './TodoItem';

const TodoList = () => {
  const todoData = useContext(TodoStateContext);
  const dispatch = useContext(TodoDispatchContext);

  const [inputValue, setInputValue] = useState('');

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
  }, [inputValue, dispatch]);

  const updateValue = (data) => {
    setInputValue(data);
  };

  return (
    <div className="todoList">
      {todoData.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          todo={item.todo}
          isCompleted={item.isCompleted}
          updateValue={updateValue}
        />
      ))}
    </div>
  );
};

export default TodoList;
