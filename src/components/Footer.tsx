import { useContext, useEffect, useState } from 'react';
import { ContextType } from '../types';
import { Context } from '../context/Context';

export default function Footer() {
  const { todos, filter, setFilter, removeCompleted } =
    useContext<ContextType>(Context);
  const [remaining, setRemaining] = useState(
    todos.filter((el) => el.completed !== true).length
  );
  const [completed, setCompleted] = useState(
    todos.filter((el) => el.completed === true).length
  );

  useEffect(() => {
    setRemaining(todos.filter((el) => el.completed !== true).length);
    setCompleted(todos.filter((el) => el.completed === true).length);
  }, [todos, filter]);

  return (
    todos.length && (
      <footer className="footer">
        <span className="todo-count">
          <strong>{remaining}</strong>
          <span>{remaining === 1 ? ' item' : ' items'} left</span>
        </span>
        <ul className="filters">
          <li>
            <a
              href="#/all"
              className={`${filter === 'all' ? 'selected' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#/active"
              className={`${filter === 'active' ? 'selected' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#/completed"
              className={`${filter === 'completed' ? 'selected' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </a>
          </li>
        </ul>
        {completed ? (
          <button className="clear-completed" onClick={removeCompleted}>
            Clear completed
          </button>
        ) : (
          <></>
        )}
      </footer>
    )
  );
}
