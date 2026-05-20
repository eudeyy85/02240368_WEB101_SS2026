# Reflection - Practical Assignment 6: Todo List Application with Zustand

## a) Documentation.

### Main Concepts Applied.
**Zustand Store Creation with create()**
Zustand is a minimal, unopinionated state management library for React. Unlike Redux, it requires no reducers, action types, or Provider wrappers. The create() function takes a callback that receives a set function and returns an object containing both state and actions. In this project, the useTodoStore hook was created this way, holding the todos array alongside addTodo, toggleTodo, removeTodo, and clearCompleted actions all in one place. Any component can call useTodoStore() to access state or trigger actions without any extra setup.

**Selective State Subscription**
Zustand allows components to subscribe to only the specific slice of state they need by passing a selector function to the store hook — for example, useTodoStore(state => state.todos) or useTodoStore(state => state.addTodo). This means a component only re-renders when the specific piece of state it selected changes, not on every store update. TodoInput only subscribes to addTodo, TodoItem subscribes to toggleTodo and removeTodo, and App subscribes to computed counts.

**Immutable State Updates with set()**
All state mutations in Zustand go through the set() function. Rather than mutating the array directly, each action returns a new object. addTodo spreads the existing todos and appends a new object. toggleTodo uses Array.map() to return a new array where only the matching item has its completed field flipped. removeTodo uses Array.filter() to return a new array excluding the deleted item. This immutable pattern ensures React detects changes and re-renders correctly.

**Persist Middleware for localStorage**
The persist middleware from zustand/middleware wraps the entire store definition inside create(). It intercepts every set() call and serialises the updated state to localStorage under a configurable key (in this project, 'todo-storage'). On page load, it reads the stored value and rehydrates the store before the first render. This added persistent storage with a single import and one wrapper function, requiring no manual localStorage.getItem or setItem calls anywhere in the codebase.

**Controlled Inputs with useState**
TodoInput uses React's local useState hook to manage the text field value independently from the global Zustand store. The input value is bound to the text state variable and onChange updates it on every keystroke. Only when the user submits does the value get passed to the global addTodo action and the local state reset to an empty string. This separation keeps ephemeral UI state local and persistent application state global.

**Component Composition**
The application was split into four focused components: TodoInput (handles user input and submission), TodoItem (renders a single todo with toggle and delete), TodoList (maps the todos array to TodoItem components and conditionally shows the Clear Completed button), and App (assembles all components and shows summary statistics). Each component has a single responsibility and communicates with shared state exclusively through the Zustand store, with no prop drilling between them.

---

## b) Reflection.

### What I Learned.
This assignment gave me a clear understanding of how Zustand solves the state management problem more simply than alternatives like Context API or Redux. Before this practical, I thought managing global state always required a Provider wrapper and significant boilerplate. Zustand showed me that a store can be created in a single file and used anywhere with just one import and one hook call.

I learned the importance of selective subscriptions. By passing a selector to useTodoStore(), each component only listens to the exact piece of state it needs. This prevents unnecessary re-renders and makes the data flow easy to trace — you can look at any component and immediately know what state it depends on.

Working with the persist middleware taught me that middleware in Zustand is just a higher-order function that wraps the store creator. Understanding this pattern makes it easier to reason about other middleware and to write custom middleware in the future.

I also gained a clearer understanding of when to use local state versus global state. The input field text belongs in local useState because it is temporary UI state that no other component cares about. The todos array belongs in the Zustand store because multiple components — TodoList, TodoItem, and App — all need to read or modify it.

The project reinforced good React practices such as controlled inputs, conditional rendering (showing Clear Completed only when relevant), and the use of Array.map(), Array.filter(), and the spread operator for immutable updates.

### Challenges Faced and Solutions.
**PowerShell echo Command Not Recognised**
When following the setup instructions, running echo. > src\components\TodoInput.jsx in PowerShell produced a CommandNotFoundException error. PowerShell does not support the echo. syntax used in Command Prompt. The solution was to use New-Item src\components\TodoInput.jsx instead, which is the correct PowerShell command for creating empty files.

**Dev Server Port Conflict**
When running npm run dev, Vite reported that port 5173 was already in use and automatically switched to port 5174. This happened because another Vite project was already running in a separate terminal. The solution was to use the new port (localhost:5174) without any configuration changes, since Vite handles the fallback automatically.

**H1 Title Wrapping Awkwardly**
The page title "Todo List with Zustand" rendered across two lines in the browser because the default h1 font size was too large for the container width. The fix was to add a fontSize style directly to the h1 element, reducing it to 24px, which kept the title on one line while remaining readable.

**Persist Middleware Import Path**
Initially the persist import was written as import { persist } from 'zustand' which threw a module export error at runtime. The persist middleware is a separate export from the middleware sub-path. The correct import is import { persist } from 'zustand/middleware', which resolved the error immediately.

**TodoItem Export Missing**
After creating TodoItem.jsx using New-Item, the file was initially empty. When TodoList tried to import TodoItem, the browser showed a SyntaxError about an unexpected end of input. The cause was that the file had no export default statement yet. Adding the complete component code including export default TodoItem resolved the import error.

### Summary
Overall this practical gave me hands-on experience with Zustand as a lightweight alternative to more complex state management solutions. The key lesson was that state management does not need to be complicated — Zustand's create(), set(), and persist cover the majority of real-world needs with minimal code. I now feel confident creating a Zustand store, defining actions that update state immutably, subscribing selectively from different components, and adding localStorage persistence. These skills directly apply to any React project that needs to share state across components without prop drilling.

---

### References
- Zustand Team. (n.d.). Zustand Documentation. From https://github.com/pmndrs/zustand
- Zustand Team. (n.d.). Persisting Store Data. From https://docs.pmnd.rs/zustand/integrations/persisting-store-data
- React Team. (n.d.). useState Hook. From https://react.dev/reference/react/useState
- React Team. (n.d.). Thinking in React. From https://react.dev/learn/thinking-in-react
- Vite Team. (n.d.). Vite Documentation. From https://vitejs.dev/guide/
- MDN Web Docs. (n.d.). localStorage. From https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- MDN Web Docs. (n.d.). Array.prototype.filter(). From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
- MDN Web Docs. (n.d.). Spread Syntax. From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
