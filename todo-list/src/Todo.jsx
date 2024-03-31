import React from '../core/React.js'

export function Todos() {
  const [inputValue, setInputValue] = React.useState('')
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'todo 1', status: 'done' },
    { id: 2, text: 'todo 2', status: 'done' },
    { id: 3, text: 'todo 3', status: 'done' },
  ])

  function handleAdd() {
    addTodo(inputValue)
    setInputValue('')
  }

  function addTodo(text) {
    setTodos((todos) => [...todos, { id: crypto.randomUUID, text: text, status: 'action' }])
  }

  function removeTodo(id) {
    setTodos((todos) => todos.filter(todo => todo.id !== id))
  }

  function doneTodo(id) {
    setTodos((todos) => todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status: 'done' }
      }
      return todo
    })
    )
  }

  function cancelTodo(id) {
    setTodos((todos) => todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status: 'action' }
      }
      return todo
    })
    )
  }

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul>
        {...todos.map(todo => {
          return (

            <li key={todo.id} className={todo.status}>
              {todo.text}
              <button onClick={() => removeTodo(todo.id)}> remove </button>
              {
                todo.status === 'done' ? <button onClick={() => cancelTodo(todo.id)}> cancel </button> :
                  <button onClick={() => doneTodo(todo.id)}> done </button>
              }
            </li>
            // <TodoItem todo="{todo}" removeTodo={removeTodo} doneTodo={doneTodo} cancelTodo={cancelTodo}></TodoItem>

          )
        })
        }
      </ul >
    </div>
  )
}


function TodoItem({ todo, removeTodo, doneTodo, cancelTodo }) {
  return (
    <li key={todo.id} className={todo.status}>
      {todo.text}
      <button onClick={() => removeTodo(todo.id)}> remove </button>
      {
        todo.status === 'done' ? <button onClick={() => cancelTodo(todo.id)}> cancel </button> :
          <button onClick={() => doneTodo(todo.id)}> done </button>
      }
    </li>
  )
}
