// React is needed to use JSX syntax
import React from 'react'

// TodoInput handles the text input and Add button
import TodoInput from './components/TodoInput'

// TodoList renders all the todo items
import TodoList from './components/TodoList'

// useTodoStore lets us read data from the Zustand store
import useTodoStore from './store/todoStore'

function App() {

  // Read just the total number of todos from the store
  const todoCount = useTodoStore((state) => state.todos.length)

  // Count how many todos have completed = true
  const completedCount = useTodoStore(
    (state) => state.todos.filter((todo) => todo.completed).length
  )

  return (
    // Outer wrapper div with basic centering styles
    <div style={{
      maxWidth: '500px',
      width: '100%',
      margin: '40px auto',
      padding: '24px',
      fontFamily: 'sans-serif',
      background: '#f3e8ff',        /* light purple card */
      border: '2px solid #c084fc',  /* purple border */
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(168, 85, 247, 0.2)'  /* purple shadow */
    }}>

      {/* Page title */}
      <h1 style={{ 
        fontSize: '24px', 
        marginBottom: '16px', 
        textAlign: 'center',
        color: '#7c3aed'   /* deep purple title */
      }}>Todo List with Zustand</h1>
      {/* TodoInput component: handles typing and adding todos */}
      <TodoInput />

      {/* Stats section: shows live counts from the store */}
      <div style={{ marginBottom: '16px', color: '#555' }}>
        <p>Total todos: {todoCount}</p>        {/* updates automatically */}
        <p>Completed: {completedCount}</p>     {/* updates automatically */}
      </div>

      {/* TodoList component: renders all todos */}
      <TodoList />

    </div>
  )
}

export default App
