# Reflection - Practical 4: Full-Stack TikTok Clone Application

## a) Documentation.

### Main Concepts Applied.
**Full-Stack Architecture**
This project implements a complete full-stack application with separate frontend and backend services. The TikTok_Frontend uses Next.js 15 with React 19, while the TikTok_Server uses Express.js with Node.js, demonstrating modern full-stack development patterns.

**Next.js App Router**
The frontend utilizes Next.js 15's App Router architecture for optimal performance and server-side rendering capabilities. This includes proper file-based routing, layouts, and server components for improved SEO and loading performance.

**Database Integration with Prisma**
The backend integrates with a database using Prisma ORM, providing type-safe database access and migrations. This demonstrates modern database management practices with schema definitions and seed scripts.

**Authentication and Authorization**
JWT (JSON Web Tokens) are used for user authentication and session management. The backend implements secure password hashing with bcrypt and token-based authentication for protected routes.

**File Upload and Storage**
Multer middleware is used for handling file uploads, allowing users to upload video content. The server manages file storage in the uploads directory with proper file handling and validation.

**RESTful API Design**
The backend implements RESTful API endpoints following HTTP standards. This includes proper HTTP methods, status codes, and response formatting for consistent client-server communication.

**React Query for Data Fetching**
The frontend uses TanStack Query (React Query) for efficient data fetching, caching, and state management. This provides automatic background updates, optimistic updates, and proper loading/error states.

**Context API for Global State**
React Context API is used for managing global application state such as user authentication, theme preferences, and application-wide settings.

**Responsive Design with Tailwind CSS**
The application uses Tailwind CSS 4.0 for responsive design, ensuring optimal user experience across mobile, tablet, and desktop devices with utility-first styling approach.

**Environment Configuration**
Both frontend and backend use environment variables (.env files) for secure configuration management, including database credentials, JWT secrets, and API keys.

**Middleware and Route Protection**
Express middleware is implemented for CORS, request logging with Morgan, and authentication checks for protected routes.

**Component-Based Architecture**
The frontend follows React best practices with a modular component structure, including reusable UI components, layout components, and feature-specific components.

**Form Handling with React Hook Form**
Forms are managed using React Hook Form for efficient form validation, state management, and user input handling with minimal re-renders.

**Toast Notifications**
React Hot Toast is integrated for user feedback, providing non-intrusive notifications for user actions, errors, and success messages.

**Intersection Observer for Infinite Scroll**
The @react-hook/intersection-observer library is used for implementing infinite scroll functionality, improving performance by loading content as needed.

**Supabase Integration**
Supabase is used as a backend-as-a-service solution, providing database, authentication, and storage capabilities with real-time features.

## b) Reflection.

### What I Learned.
This project taught me the complete lifecycle of building a full-stack application from conception to deployment. I learned how to architect a scalable application with proper separation of concerns between frontend and backend.

I gained practical experience with modern web technologies including Next.js 15, React 19, and Express.js. Understanding how these technologies work together in a real-world application was invaluable.

The database integration with Prisma taught me the importance of type-safe database operations and how migrations work in practice. Managing database schemas and relationships became much clearer through this hands-on experience.

Implementing authentication and authorization taught me about security best practices, including password hashing, JWT tokens, and protecting routes. I learned how to balance security with user experience.

File upload functionality taught me about handling binary data, storage management, and the challenges of processing user-generated content. Understanding multipart form data and file validation was crucial.

React Query transformed my understanding of data fetching and state management. Learning about caching, background updates, and optimistic updates made me appreciate sophisticated state management solutions.

### Challenges Faced and Solutions.
**Database Schema Design**
Designing the database schema for a social media application required careful planning of relationships between users, videos, likes, and comments. I learned to think about data normalization and foreign key relationships.

**Authentication Flow Implementation**
Implementing the complete authentication flow from registration to protected routes was challenging. I had to understand JWT tokens, refresh tokens, and how to manage authentication state across the application.

**File Upload and Storage**
Handling video uploads presented challenges with file size limits, format validation, and storage organization. I implemented proper file validation and organized uploads in a structured directory system.

**Real-time Features**
Implementing real-time features required understanding WebSockets and event-driven architecture. I learned how to handle real-time updates for likes, comments, and notifications.

**Performance Optimization**
Optimizing the application for performance involved implementing lazy loading, code splitting, and efficient database queries. I learned to use React DevTools and database query analysis to identify bottlenecks.

**Cross-Origin Resource Sharing (CORS)**
Configuring CORS properly between the frontend and backend was challenging. I learned about preflight requests and proper CORS configuration for development and production environments.

**Environment Management**
Managing different environment configurations for development, testing, and production taught me about the importance of proper environment variable management and security.

**Component State Management**
Managing complex component state and prop drilling led me to appreciate React Context API and custom hooks for state management. I learned when to use local state vs global state.

### Summary
Building this full-stack TikTok clone gave me comprehensive experience in modern web development. The project taught me how to integrate multiple technologies, handle complex data relationships, and build scalable applications. I now understand the challenges and best practices of full-stack development, from database design to user interface implementation.

### References
- Next.js Documentation. (n.d.). App Router. From https://nextjs.org/docs/app
- React Documentation. (n.d.). React 19 Features. From https://react.dev
- Express.js Documentation. (n.d.). Guide. From https://expressjs.com/en/guide
- Prisma Documentation. (n.d.). Getting Started. From https://www.prisma.io/docs/getting-started
- TanStack Query Documentation. (n.d.). React Query. From https://tanstack.com/query/latest
- Tailwind CSS Documentation. (n.d.). Utility-First CSS. From https://tailwindcss.com
- JWT.io. (n.d.). JSON Web Tokens. From https://jwt.io
- Supabase Documentation. (n.d.). Getting Started. From https://supabase.com/docs
- React Hook Form Documentation. (n.d.). Getting Started. From https://react-hook-form.com
- MDN Web Docs. (n.d.). Fetch API. From https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
