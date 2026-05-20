// React is needed to use JSX syntax
import React, { useState } from 'react'

// Import our store hook to access the addTodo action
import useTodoStore from '../store/todoStore'

function TodoInput() {

  // Local state just for the input field value
  const [text, setText] = useState('')

  // Pull only the addTodo action from the store (not the whole state)
  const addTodo = useTodoStore((state) => state.addTodo)

  // Called when user clicks Add or presses Enter
  const handleSubmit = () => {
    if (text.trim()) {       // don't add empty/whitespace-only todos
      addTodo(text.trim())   // add the todo to the store
      setText('')            // clear the input after adding
    }
  }

  // Allow pressing Enter key to submit instead of clicking button
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>

      {/* Controlled input: value tied to 'text' state */}
      <input
        type="text"
        value={text}                                    // controlled by state
        onChange={(e) => setText(e.target.value)}       // update state on every keystroke
        onKeyDown={handleKeyDown}                       // submit on Enter
        placeholder="Add a new todo..."
        style={{ flex: 1, padding: '8px', fontSize: '16px' }}
      />

      {/* Button triggers handleSubmit on click */}
      <button onClick={handleSubmit} style={{ padding: '8px 16px' }}>
        Add
      </button>

    </div>
  )
}

export default TodoInput
