export interface ContextType {
  todos: Todo[];
  editedId: number;
  setEditedId: (todoId: number) => void;
  addTodo: (event: React.KeyboardEvent) => void;
  toggleAll: (event: React.FormEvent<HTMLInputElement>) => void;
  updateTodo: (todo: Todo) => void;
  removeTodo: (todoId: number) => void;
  removeCompleted: () => void;
  filter: string;
  setFilter: (filter: string) => void;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
