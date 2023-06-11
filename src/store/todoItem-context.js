import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return [...action.initTodos];
    case 'CREATE':
      return [...state, action.item];
    case 'TOGGLE':
      return state.map((item) =>
        item.id === action.id
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      );
    case 'EDIT':
      return state.map((task) =>
        task.id === action.item.id ? { ...action.item } : task
      );
    case 'DELETE':
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
};

export const TodoStateContext = React.createContext('');
export const TodoDispatchContext = React.createContext('');

const initialData = [];

const TodoListProvider = (props) => {
  const [todo, dispatch] = useReducer(reducer, initialData);

  return (
    <TodoStateContext.Provider value={todo}>
      <TodoDispatchContext.Provider value={dispatch}>
        {props.children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export default TodoListProvider;
