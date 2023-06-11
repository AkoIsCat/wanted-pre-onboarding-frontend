// Create Todo
export const createTodoApi = async (todo) => {
  try {
    const response = await fetch(
      'https://www.pre-onboarding-selection-task.shop/todos',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo }),
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

// Get Todos
export const getTodoApi = async () => {
  try {
    const response = await fetch(
      'https://www.pre-onboarding-selection-task.shop/todos',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
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

// Update Todo
export const updateTodoApi = async (id, todo, isCompleted) => {
  try {
    const response = await fetch(
      `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo, isCompleted }),
      }
    );
    console.log('api todo', todo);
    if (response !== undefined) {
      const result = await response.json();
      return result;
    }
    return response;
  } catch (error) {
    return error;
  }
};

// Delete Todo
export const deleteTodoApi = async (id) => {
  try {
    const response = await fetch(
      `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
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
