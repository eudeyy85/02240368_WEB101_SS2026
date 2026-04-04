Practical 1 Report : TikTok Web Interface
Part 1: Getting Started 
Step 1: Navigate to Project Directory
 > First, we opened the terminal and moved to the GitHub repository folder where the project will be created which ensures that all project files are inside the correct sirectory with the command " cd MY-PROJECT "

Step 2: Create a New Next.js Project
 > To create a new Next.js use the command "npx create-next-app@latest". After that to configure the project with tailwind css which helps in styling and src folder that keeps project organized, select the following option: 
 TypeScript → No
 ESLint → Yes
 Tailwind CSS → Yes
 src directory → Yes
 App Router → Yes
 Import alias → No

Step 3: Clean Up the Default Project
 > This will help to remove unnecessary default code and replace with simple structure.
 > Navigate to the src/app directory and replace the contents of page.js with a basic component:
    export default function Home() {
    return (
        <main>
        <h1>TikTok</h1>
        <p>Welcome to our TikTok project</p>
        </main>
    );
    }

Step 4: Set Up Project Structure
 >  mkdir src\components\layout
    mkdir src\components\ui
    mkdir src\lib
    mkdir src\app\profile
    mkdir src\app\upload
    mkdir src\app\following
    mkdir src\app\explore
    mkdir src\app\live
    mkdir src\app\login
    mkdir src\app\signup

Step 5: Layout,pages, and dev server.
 > MainLayout.jsx holds the header and navigation menu that appears on every page.
 > Layout.js is Next.js's special file that wraps entire app. You put MainLayout inside it so every page automatically gets the header and navigation you don't have to add it to each page manually.
 > npm run dev starts your local development server so you can see the site at http://localhost:3000 in your browser.

PART 2: Creating the Web Layout and Main Interface.
Step 1: Install Additional Dependencies.
 > npm install react-icons gives you thousands of icons (FontAwesome, Material, etc.) as React components, e.g. <FaHome />.

Step 2: Rebuild MainLayout with a sidebar
 > The layout now has two columns:
    A fixed left sidebar (w-60 fixed h-full) with navigation links, suggested accounts, and login/signup buttons.
    A main content area (ml-60 flex-1) with a top header bar (search, upload button, profile link)
> 'use client' directive at the top is used because this component uses interactivity like hover effects, links.

Step 3: VideoCard Component
> create a feed similar to TikTok's web version. Create a new file "src/components/ui/VideoCard.jsx:"
    > VideoCard.jsx is a single post card. It receives a post prop (the post's data) and displays:
    > Username, caption, audio name
    A video placeholder box (300×530px black box)
    Like/comment/share buttons.

Step 4: VideoFeed Component
> Create a new file src/components/ui/VideoFeed.jsx:
> VideoFeed.jsx has a list of fake posts, and for each post it creates and shows one VideoCard on screen.

Step 5: created page.jsx.
> Create pages for each section (profile, upload, following, explore, live, login, signup) using the MainLayout component.

PART 3 : Creating Login and Registration Forms.
Step 1 Key concept: React Hook Form.
> You call useForm() once to manage state for every input field and get back:
    > const { register, handleSubmit, watch, formState: { errors } } = useForm();
> register('email', { required: 'Email is required' }) — attaches an input to the form and sets its validation rules.
> handleSubmit(onSubmit) — wraps your submit function; only calls it if all validations pass
> errors.email.message — holds the error message to display under the input
> watch('password') — reads the current value of password so you can compare it against confirmPassword.

Step 2: Login page.
> The login form has two boxes — email and password.
    > When you click submit:

    - It checks both fields are filled in
    - Shows "Logging in..." on the button while waiting
    - After 1.5 seconds, pops up a success message

Step 3: Signup page.
> Username: min 3 chars, only letters/numbers/underscores (regex: /^[a-zA-Z0-9_]+$/)
> Email: must match proper email format (regex pattern)
> Password: min 8 chars, must contain uppercase, lowercase, number, and special character
> Confirm password: uses validate: value => value === password || 'Passwords do not match' — a custom function that compares the two fields
> Terms checkbox: required before the form will submit

Step 4: Connect forms to navigation.
> The MainLayout.jsx sidebar's Login button becomes a <Link href="/login"> and the signup button links to /signup. The header's Log In button does the same.
