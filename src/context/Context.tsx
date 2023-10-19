import { createContext, useEffect, useState } from 'react';
import { ContextType, Todo } from '../types';

const initContext: ContextType = {
  todos: [],
  editedId: 0,
  setEditedId: function () {},
  addTodo: function () {},
  toggleAll: function () {},
  updateTodo: function () {},
  removeTodo: function () {},
  removeCompleted: function () {},
  filter: 'all',
  setFilter: function () {},
};

const STORAGE_KEY = 'react-todo';
const initList = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

export const Context = createContext<ContextType>(initContext);

export function AppContext({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [todos, setTodos] = useState<Todo[]>(initList);
  const [filter, setFilter] = useState('all');
  const [editedId, setEditedId] = useState(0);

  function addTodo(event: React.KeyboardEvent) {
    const el = event.target as HTMLInputElement;
    const value = el.value.trim();
    if (value) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: value,
          completed: false,
        },
      ]);
    }
  }

  function toggleAll(event: React.FormEvent<HTMLInputElement>) {
    const el = event.target as HTMLInputElement;
    const togled = todos.map((todo: Todo) => {
      return { id: todo.id, title: todo.title, completed: el.checked };
    });
    setTodos(togled);
  }

  function removeTodo(todoId: number) {
    setTodos([...todos.filter((el: Todo) => el.id !== todoId)]);
  }

  function updateTodo(todo: Todo) {
    const newTodos = todos.map((el: Todo) => {
      if (el.id === todo.id)
        return { id: todo.id, title: todo.title, completed: todo.completed };
      return el;
    });
    setTodos(newTodos);
  }

  function removeCompleted() {
    setTodos([...todos.filter((el: Todo) => el.completed === false)]);
  }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const contextValue: ContextType = {
    todos,
    editedId,
    setEditedId,
    addTodo,
    toggleAll,
    updateTodo,
    removeTodo,
    removeCompleted,
    filter,
    setFilter,
  };

  return <Context.Provider value={contextValue}>{children} </Context.Provider>;
}
