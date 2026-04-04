DOCUMENTATION
Describe the main concepts you applied.
Main Concepts Applied :
1.	Develop a TikTok like application using Next.js, which is a React-based framework. Next.js helps in building fast, efficient, and well-structured applications by providing features like file-based routing and optimized performance which help simplifies the development process and allows us to create scalable web applications easily.
2.	Organized the project by creating a proper folder structure like components, layout, ui, and app directories. The organization helps to understand code and easy to manage. A well-structured project helps developers to locate files, update code and work without confusion.
3.	Used a component- based approach where the user interface is divided into smaller reusable components (MainLayout, VideoCard, and VideoFeed) which reduces code duplication and make the application maintainable. It also allows developers to reuse components in different part of application which save time and effort.
4.	Design a user interface similar to the TikTok we application including features like sidebar navigation, video feed, profile page and upload page. This helps us to understand how real world applications are structured and hoe to create visually appealing and user friendly interfaces.
5.	Implemented routing by creating multiple pages such as Home, Profile, Upload, Explore and Following which allows users to navigate easily between different sections of the application. Next.js makes routing simple using file-based system which automatically connects pages to URLS.
6.	Created login and signup forms using React Hook Form, which helps manage form data efficiently. We also implemented validation techniques such as required fields, email format checking, and password rules that ensure the users enter correct information and improves the reliability of the application.
7.	Added basic interaction features such as likes, comments, and shares in the video feed. We also implemented loading states to give feedback to users during actions like form submission. This features improve the overall user experience and make the application more interactive and realistic.
2.Reflection
Discuss what you learned.
What I Learned
1.	To build a modern web application using Next.js and React. I understood how to set up a project from scratch by using the correct configurations and organizing files properly. Learned the importance of separating UI into reusable components for better maintainability.
2.	Importance of maintaining a clean project structure by creating different folders such as components, layout, ui, and app. This helped me understand how organized code makes development easier and more efficient.
3.	Learned how to build responsive and consistent UIs without writing much custom CSS.
4.	About component-based architecture in React. I created reusable components like MainLayout, VideoCard, and VideoFeed, which showed me how breaking the UI into smaller parts makes the application easier to manage and reuse.
5.	Building & Validating Forms with React Hook Form Learned to build forms with real-time validation, error handling, and loading states.
6.	Navigation and Routing Gained practical experience with Next.js routing, creating multiple dynamic and static pages (e.g., /profile, /upload, /login).
7.	UX Feedback with Toast Notifications Used react-hot-toast to provide user-friendly feedback for actions like login, logout, and form submission errors.
8.	How to create and handle forms using React Hook Form. I implemented login and signup forms with validation, error handling, and proper submission, which helped me understand how to manage user input effectively. 

OVERALL,
I learned how to build a structured and interactive web application using Next.js and React, focusing on reusable components, routing, UI design, and form handling with validation and user feedback.


Mention any challenges you faced (include screenshots) and how you overcame them.
1.	Tailwind CSS Not Applying Styles Problem: After setting up Tailwind CSS, some utility classes were not applying styles as expected.
Cause: The globals.css file was not properly importing Tailwind’s base styles.
Solution: I fixed this by making sure the @import "tailwindcss"; line was correctly included at the top of globals.css. 
