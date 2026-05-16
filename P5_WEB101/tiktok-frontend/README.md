# Github repo link
https://github.com/eudeyy85/02240368_WEB101_SS2026.git

# TikTok Clone Application
 
**StudentID:** 02240368
**Name:** Tshering Euden
**Module:** WEB101
**Date:** 5/5/2026

# Aim 
The aim of this project is to build a full-stack TikTok clone application with modern web technologies. This includes implementing a complete frontend with Next.js 15 and React 19, a backend API with Express.js and Node.js, database integration with Prisma, user authentication, video upload functionality, and real-time features.

# Implementation Steps
## Step 1: Project Setup 
Two separate projects were initialized - one for the frontend and one for the backend:

### Frontend Setup (TikTok_Frontend)
A Next.js 15 project was initialized with React 19 using the following command:
```bash
npx create-next-app@latest TikTok_Frontend --typescript --tailwind --eslint --app
```

### Backend Setup (TikTok_Server)
An Express.js server project was initialized with the following structure:
```bash
mkdir TikTok_Server && cd TikTok_Server
npm init -y
npm install express prisma @prisma/client bcrypt jsonwebtoken cors dotenv morgan multer
```

### The project structure was organized as:
```
P4_WEB101/
├── TikTok_Frontend/     # Next.js frontend application
│   ├── src/
│   │   ├── app/         # Next.js App Router pages
│   │   ├── components/  # React components
│   │   ├── contexts/    # React contexts
│   │   ├── hooks/       # Custom hooks
│   │   ├── lib/         # Utility functions
│   │   └── services/    # API services
│   └── package.json
└── TikTok_Server/       # Express.js backend API
    ├── src/
    │   ├── controllers/ # Route controllers
    │   ├── middleware/  # Express middleware
    │   ├── routes/      # API routes
    │   ├── services/    # Business logic
    │   └── lib/         # Utility functions
    ├── prisma/          # Database schema and migrations
    └── package.json
```

## Step 2: Database Design and Setup
The database schema was designed using Prisma ORM to handle users, videos, likes, comments, and follows.

### Database Schema Includes:
- **User Model**: Handles user authentication, profiles, and preferences
- **Video Model**: Stores video metadata, file paths, and engagement metrics
- **Like Model**: Tracks user likes on videos
- **Comment Model**: Manages comments and replies
- **Follow Model**: Handles user following relationships

### Prisma Schema Configuration:
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  password  String
  avatar    String?
  createdAt DateTime @default(now())
  videos    Video[]
  likes     Like[]
  comments  Comment[]
  followers Follow[]   @relation("following")
  following Follow[]   @relation("followers")
}

model Video {
  id          String   @id @default(cuid())
  caption     String
  videoUrl    String
  thumbnailUrl String?
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  likes       Like[]
  comments    Comment[]
  createdAt   DateTime @default(now())
}
```

## Step 3: Backend API Development
The Express.js backend was developed with RESTful API endpoints for all major functionality.

### i.	Authentication System - Complete user registration and login system with JWT tokens, password hashing with bcrypt, and protected routes middleware.

### ii.	User Management - CRUD operations for user profiles, avatar uploads, and user discovery features.

### iii.	Video Management - Video upload functionality with Multer, video metadata storage, and video serving endpoints.

### iv.	Engagement System - Like/unlike videos, comment management, and follow/unfollow user functionality.

### v.	File Storage System - Organized file upload handling for videos and avatars with proper validation and storage management.

## Step 4: Frontend Application Development
The Next.js frontend was built with modern React patterns and responsive design.

### i.	Authentication Pages - Login and signup pages with form validation, loading states, and error handling using React Hook Form.

### ii.	Home Feed - Main feed page with infinite scroll, video player integration, and engagement buttons (like, comment, share).

### iii.	User Interface Components - Reusable components for video cards, user avatars, navigation, and modal overlays.

### iv.	Profile Pages - User profile display with video grid, follower counts, and edit functionality.

### v.	Upload Interface - Video upload form with progress tracking, caption input, and thumbnail generation.

## Step 5: State Management and Data Fetching
Advanced state management was implemented using React Query and Context API.

### i.	React Query Integration - Efficient data fetching, caching, and background updates for all API calls.

### ii.	Global Context - User authentication state, theme preferences, and application-wide settings.

### iii.	Optimistic Updates - Immediate UI updates for likes and follows with rollback on error.

## Step 6: Real-time Features and Performance
Performance optimizations and real-time features were implemented.

### i.	Infinite Scroll - Intersection Observer API for efficient video loading as users scroll.

### ii.	Video Optimization - Lazy loading, compression, and CDN-like serving for video content.

### iii.	Toast Notifications - Non-intrusive user feedback for all actions using React Hot Toast.

## Challenges and Solutions
1.	Database Relationship Management - Complex relationships between users, videos, and likes required careful Prisma schema design and query optimization.

2.	File Upload Handling - Large video files presented challenges with upload limits, progress tracking, and storage organization. Solved using Multer with chunked uploads and progress callbacks.

3.	Authentication State Synchronization - Keeping frontend and backend authentication state synchronized required careful JWT token management and refresh token implementation.

4.	Performance Optimization - Video loading and rendering performance issues were solved using lazy loading, virtualization, and proper React.memo usage.

5.	CORS Configuration - Proper cross-origin resource sharing setup between frontend and backend during development and production environments.

6.	Environment Management - Different configurations for development, testing, and production required careful environment variable management and security practices.

# References
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
