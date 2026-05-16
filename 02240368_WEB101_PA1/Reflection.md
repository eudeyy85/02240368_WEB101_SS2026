# Reflection - Practical Assignment 1: Twitter (X) Website Recreation

## a) Documentation.

### Main Concepts Applied.
**React Component-Based Architecture**
React allows breaking down complex user interfaces into smaller, reusable components. Each component manages its own state and props, making the codebase modular and maintainable. The Twitter interface was decomposed into logical components like App.jsx, HomePage.jsx, TweetCard.jsx, and LoginPage.jsx.

**State Management with useState**
React's useState hook was used extensively to manage component state throughout the application. Global state was managed in App.jsx for authentication, navigation, and modal visibility, while individual components managed their local states for likes, retweets, and form inputs.

**Conditional Rendering**
React's conditional rendering was used to show different UI elements based on application state. This included showing/hiding the login page, displaying different content based on authentication status, and toggling mobile vs desktop layouts.

**Responsive Design with CSS Media Queries**
Responsive behavior was implemented using CSS media queries injected via <style> tags and through a custom useResponsive hook. The application adapts its layout for mobile, tablet, and desktop viewports with appropriate breakpoints.

**Event Handling**
React event handlers were used for all user interactions including button clicks, form submissions, and navigation. Event handlers were properly bound and passed down as props to child components.

**Props and Component Communication**
Data flow between components was managed through props. Parent components passed down functions and data to child components, and child components called these functions to communicate back to parents.

**CSS-in-JS and Inline Styling**
Styling was implemented using a combination of inline styles and CSS-in-JS techniques. This allowed for dynamic styling based on component state and props.

**Vite Build Tool**
Vite was used as the build tool for fast development and optimized production builds. The vite.config.js file was configured to set the development server port to 3000.

## b) Reflection.

### What I Learned.
This assignment taught me how to think in terms of components and break down a complex user interface into manageable pieces. I learned that React's component-based architecture makes it easier to organize and maintain large applications.

I gained practical experience with state management and understanding when to lift state up to parent components versus keeping it local. Managing authentication state, navigation state, and individual component states helped me understand the flow of data in React applications.

The responsive design implementation taught me the importance of thinking about different screen sizes from the beginning. Using CSS media queries and custom hooks for responsive behavior made the application work seamlessly across devices.

I also learned about the challenges of building a single-page application without a routing library. Implementing navigation using useState and conditional rendering showed me both the simplicity and limitations of this approach.

### Challenges Faced and Solutions.
**Vite Port Configuration Issue**
The development server was running on port 5173 instead of the expected port 3000. I learned that Vite defaults to port 5173, and I needed to explicitly configure the port in vite.config.js by adding `server: { port: 3000 }`.

**Responsive Sidebar Behavior on Tablet**
The sidebar needed to show only icons on tablet view without duplicating navigation code. This was solved using CSS classes with media queries that hide labels and resize buttons at specific breakpoints (1100px).

**Mobile Navigation Implementation**
Twitter's mobile experience hides the sidebar and shows a bottom navigation bar. This required implementing a custom useResponsive hook with window resize listeners and managing mobile drawer state separately from the desktop sidebar.

**Component State Synchronization**
Managing like/retweet/bookmark states across multiple tweet cards required careful state management. Each TweetCard manages its own state, and the counts update appropriately when users interact with the buttons.

**Form Validation and User Input**
Implementing the login form with proper validation, password visibility toggle, and loading states taught me about controlled components and form handling in React.

### Summary
Overall this assignment gave me comprehensive experience building a complete React application from scratch. The challenges I faced taught me problem-solving skills and the importance of understanding the tools and frameworks I'm working with. I now feel confident building complex React applications with proper component architecture, state management, and responsive design.

### References
- React Team. (n.d.). Learn React. From https://react.dev/learn
- React Team. (n.d.). useState Hook. From https://react.dev/reference/react/useState
- React Team. (n.d.). Passing Props to Components. From https://react.dev/learn/passing-props-to-a-component
- React Team. (n.d.). State: A Component's Memory. From https://react.dev/learn/state-a-components-memory
- Vite. (n.d.). Vite Guide. From https://vite.dev/guide/
- Mozilla Developer Network. (n.d.). Responsive Design. From https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design
- W3Schools. (n.d.). CSS Media Queries. From https://www.w3schools.com/css/css_rwd_mediaqueries.asp
- GeeksforGeeks. (2025). React Components. From https://www.geeksforgeeks.org/react-components/
- Pluralsight. (n.d.). Inline Styling with React. From https://www.pluralsight.com/resources/blog/guides/inline-styling-with-react
