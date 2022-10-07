import "./App.css";
import { useState } from "react";

const initialTodos = [
  { id: 0, title: "first todo", content: "do that" },
  { id: 1, title: "second todo", content: "do this" },
];
let nextIndex = 2;

function style(target) {
  target.style.color = "#7895b2";
  setTimeout(() => (target.style.color = ""), 500);
}

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

  function handleAddTodo(title, content) {
    const newTodo = { id: nextIndex++, title: title, content: content };
    setTodos([...todos, newTodo]);
    setMessage(
      `Todo n°${newTodo.id + 1} (${
        newTodo.title ? newTodo.title : "no-title"
      }) added`
    );
  }

  function handleDeleteTodo(todo) {
    setTodos(todos.filter((t) => t.id !== todo.id));
    setMessage(
      `Todo n°${todo.id + 1} (${todo.title ? todo.title : "no-title"}) deleted`
    );
  }

  function handleSearchTodo(input) {
    setFilter(input);
    setMessage(
      `${
        todos.filter((todo) => {
          return (
            todo.title.toLowerCase().includes(input.toLowerCase()) ||
            todo.content.toLowerCase().includes(input.toLowerCase())
          );
        }).length
      } todo(s) found`
    );
  }

  function handlePointerMove(e) {
    setPointerPos({ x: e.clientX, y: e.clientY });
  }

  return (
    <div className="App dot-container" onPointerMove={handlePointerMove}>
      <Dot position={pointerPos} />
      <Header message={message} />
      <ToolBar onAddTodo={handleAddTodo} onSearchTodo={handleSearchTodo} />
      <TodoList list={todos} filter={filter} onDeleteTodo={handleDeleteTodo} />
    </div>
  );
}

export default App;

function Dot({ position }) {
  return (
    <div
      className="dot"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    ></div>
  );
}

function Header({ message }) {
  return (
    <div className="header">
      <h1 className="header-title" onClick={() => window.location.reload()}>
        This is a Todo List
      </h1>
      <p className="message-section">{message}</p>
    </div>
  );
}

function ToolBar({ onAddTodo, onSearchTodo }) {
  return (
    <div className="toolbar">
      <AddTodo onAddTodo={onAddTodo} />
      <SearchTodo onSearchTodo={onSearchTodo} />
    </div>
  );
}

function SearchTodo({ onSearchTodo }) {
  const inputHandler = (e) => {
    let inputLowerCase = e.target.value.toLowerCase();
    onSearchTodo(inputLowerCase);
  };

  return (
    <div className="search-todo">
      <h2>Search TODO</h2>
      <input
        type="text"
        id="user-input"
        placeholder="search"
        onChange={inputHandler}
        onClick={(e) => e.target.select()}
        onDoubleClick={(e) => (e.target.value = "")}
      />
    </div>
  );
}

function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="add-todo">
      <h2>Add a new TODO</h2>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        placeholder="content"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <button
        onClick={() => {
          onAddTodo(title, content);
          setTitle("");
          setContent("");
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

function TodoList({ list, filter, onDeleteTodo }) {
  list = list
    .filter((todo) => {
      return (
        todo.title.toLowerCase().includes(filter.toLowerCase()) ||
        todo.content.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .map((element) => {
      return <Todo key={element.id} todo={element} onDelete={onDeleteTodo} />;
    });
  return <ul className="todolist">{list}</ul>;
}

function Todo({ todo, onDelete }) {
  return (
    <li className="todo" key={todo.id}>
      <h3 className="todo-title" onMouseOver={(e) => style(e.target, "#777")}>
        TODO n°{todo.id + 1} : {todo.title}
        <button className="delete-todo" onClick={() => onDelete(todo)}>
          delete
        </button>
      </h3>
      <p className="todo-content">{todo.content}</p>
    </li>
  );
}
