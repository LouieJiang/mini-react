import React from '../core/React.js'

export function Todos() {
  const [filter, setFilter] = React.useState('all')
  const [inputValue, setInputValue] = React.useState('')
  const [displayTodos, setDisplayTodos] = React.useState(todos)
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'todo 1', status: 'done' },
    { id: 2, text: 'todo 2', status: 'done' },
    { id: 3, text: 'todo 3', status: 'done' },
  ])

  React.useEffect(() => {
    const todos = localStorage.getItem('todos')
    if (todos) {
      setTodos(JSON.parse(todos))
    }
  }, [])

  React.useEffect(() => {
    if (filter === 'all') {
      setDisplayTodos(todos)
    } else if (filter === 'done') {
      setDisplayTodos(todos.filter(todo => todo.status === 'done'))
    } else if (filter === 'action') {
      setDisplayTodos(todos.filter(todo => todo.status === 'action'))
    }
  }, [filter])

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

  function saveTodo() {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
        <div>
          <button onClick={saveTodo} >save</button>
        </div>
        <div>
          <input type="radio" name='filter' id="all" checked={filter === 'all'} onChange={() => setFilter('all')} />
          <label htmlFor="all">All</label>
          <input type="radio" name='filter' id="done" checked={filter === 'done'} onChange={() => setFilter('done')} />
          <label htmlFor="done">Done</label>
          <input type="radio" name='filter' id="action" checked={filter === 'action'} onChange={() => setFilter('action')} />
          <label htmlFor="action">Action</label>
        </div>
      </div>
      <ul>
        {...displayTodos.map(todo => {
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
