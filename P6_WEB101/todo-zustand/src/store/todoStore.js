// Import 'create' from zustand to make our store
import { create } from 'zustand'

// Import 'persist' middleware so todos survive page refresh
import { persist } from 'zustand/middleware'

// Create and export the store as a custom hook called useTodoStore
const useTodoStore = create(

  // Wrap everything in persist() to enable localStorage saving
  persist(

    // 'set' is zustand's function to update state
    (set) => ({

      // ── STATE ──────────────────────────────────────────
      todos: [], // starts as empty array

      // ── ACTIONS ────────────────────────────────────────
      // addTodo: takes text, adds a new todo object to the array
      addTodo: (text) => set((state) => ({
        todos: [
          ...state.todos,             // keep all existing todos
          {
            id: Date.now(),           // unique id using timestamp
            text: text,               // the text user typed
            completed: false          // new todos start uncomplete
          }
        ]
      })),

      // toggleTodo: flips completed true/false for one todo by id
      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      })),

      // removeTodo: removes a todo from the array by id
      removeTodo: (id) => set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id)
      })),

      // clearCompleted: removes all todos where completed is true
      clearCompleted: () => set((state) => ({
        todos: state.todos.filter((todo) => !todo.completed)
      }))

    }),

    // persist config: name is the localStorage key
    { name: 'todo-storage' }
  )
)

export default useTodoStore