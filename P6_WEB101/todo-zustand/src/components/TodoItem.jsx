// React needed for JSX
import React from 'react'

// Import store to get toggleTodo and removeTodo actions
import useTodoStore from '../store/todoStore'

// This component receives one 'todo' object as a prop
function TodoItem({ todo }) {

  // Pull only toggleTodo action from store
  const toggleTodo = useTodoStore((state) => state.toggleTodo)

  // Pull only removeTodo action from store
  const removeTodo = useTodoStore((state) => state.removeTodo)

  return (
    <li style={{
      display: 'flex',       // lay out children in a row
      alignItems: 'center',  // vertically center everything
      gap: '10px',
      marginBottom: '8px',
      listStyle: 'none'      // remove bullet point
    }}>

      {/* Checkbox: checked state comes from todo.completed */}
      <input
        type="checkbox"
        checked={todo.completed}                  // reflects current state
        onChange={() => toggleTodo(todo.id)}      // toggle on change
      />

      {/* Todo text: strikethrough when completed */}
      <span style={{
        flex: 1,                                                    // take up remaining space
        textDecoration: todo.completed ? 'line-through' : 'none',  // visual feedback
        color: todo.completed ? '#aaa' : '#000'                    // grey out when done
      }}>
        {todo.text}
      </span>

      {/* Delete button: calls removeTodo with this todo's id */}
      <button
        onClick={() => removeTodo(todo.id)}
        style={{ color: 'red', cursor: 'pointer' }}
      >
        Delete
      </button>

    </li>
  )
}

export default TodoItem