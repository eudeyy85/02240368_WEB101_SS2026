// React needed for JSX
import React from 'react'

// Import store to read todos and clearCompleted action
import useTodoStore from '../store/todoStore'

// Import TodoItem to render each individual todo
import TodoItem from './TodoItem'

function TodoList() {

  // Subscribe to the todos array from the store
  const todos = useTodoStore((state) => state.todos)

  // Subscribe to the clearCompleted action
  const clearCompleted = useTodoStore((state) => state.clearCompleted)

  // Check if any todos are completed (to show/hide the Clear button)
  const hasCompleted = todos.some((todo) => todo.completed)

  return (
    <div>

      {/* If no todos exist, show a helpful message */}
      {todos.length === 0 && (
        <p style={{ color: '#999' }}>No todos yet. Add one above!</p>
      )}

      {/* Render each todo as a TodoItem component */}
      <ul style={{ padding: 0 }}>
        {todos.map((todo) => (
          // key prop is required by React for list items
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>

      {/* Only show Clear button if at least one todo is completed */}
      {hasCompleted && (
        <button
          onClick={clearCompleted}
          style={{ marginTop: '12px', padding: '6px 12px' }}
        >
          Clear Completed
        </button>
      )}

    </div>
  )
}

export default TodoList
