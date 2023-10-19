import React, { useContext, useState } from 'react';
import './App.css';
import { ContextType } from './types';
import { Context } from './context/Context';
import List from './components/List';
import Footer from './components/Footer';

function App(): JSX.Element {
  const { addTodo } = useContext<ContextType>(Context);
  const [titleInput, setTitleinput] = useState('');

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTitleinput(e.target.value);
  }

  function keyHandler(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      addTodo(event);
      setTitleinput('');
    }
  }

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            autoFocus
            placeholder="What needs to be done?"
            value={titleInput}
            onChange={changeHandler}
            onKeyUp={(e: React.KeyboardEvent<HTMLElement>) => keyHandler(e)}
          />
        </header>
        <List />
        <Footer />
      </section>
    </>
  );
}

export default App;
