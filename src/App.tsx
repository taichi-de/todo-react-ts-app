import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      inputValue: inputText,
      id: todos.length,
      checked: false,
    }

    setTodos([newTodo, ...todos]);
    setInputText(inputText);
  }

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    })

    setTodos(newTodos);
  }

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    })

    setTodos(newTodos);
  }

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <h2>Todo list with ts</h2>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
        <input type="text" className="inputText" onChange={(e)=>{handleChange(e)}}/>
        <input type="submit" value="add" className="submitButton" onChange={()=>{}}/>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.inputValue}
            <input
              type="text"
              value={todo.inputValue}
              className="inputText"
              onChange={(e)=>handleEdit(todo.id, e.target.value)}
              disabled={todo.checked}
            />
            <input
              type="checkbox"
              onChange={()=>handleChecked(todo.id, todo.checked)}
            />
            <button onClick={()=>handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
