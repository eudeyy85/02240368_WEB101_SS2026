# RESTful API Weather Dashboard - Reflection
## a) Documentation — Main Concepts Applied
### RESTful API Architecture
This practical is built around the REST (Representational State Transfer) architecture.
REST uses standard HTTP methods to perform operations on data. The four core methods
demonstrated in this project are:
- GET: Retrieve data (e.g., fetching weather information)
- POST: Create new resources (e.g., adding a new city to the favorites list)
- PUT: Update existing resources (e.g., modifying a city's settings)
- DELETE: Remove resources (e.g., removing a city from favorites)

Each method maps to a CRUD operation:
- **GET** -> Read
- **POST** -> Create
- **PUT** -> Update
- **DELETE** -> Delete

### The Fetch API
The Fetch API is a modern JavaScript interface for making HTTP requests. It provides a cleaner, more powerful alternative to the older XMLHttpRequest (XHR) method.
![alt text](image.png)
![alt text](image-10.png)

### Async / Await
Async/await is a modern JavaScript syntax that makes working with promises easier and more readable. It allows you to write asynchronous code that looks and behaves like synchronous code.
![alt text](image-11.png)

### JSON (JavaScript Object Notation)
All API responses returned data in JSON format.
The project used:
- **response.json()** to parse the JSON response from the API.
- **JSON.parse()** to convert the JSON string into a JavaScript object.
- **JSON.stringify()** to convert a JavaScript object into a JSON string.    


### Error Handling with Try / Catch
Every API function was wrapped in a `try/catch` block to handle failed requests gracefully.
![alt text](image-12.png)
![alt text](image-13.png)

### DOM Manipulation
The project used various DOM manipulation methods to dynamically update the HTML content:
- **document.getElementById()** to select and modify specific elements.
- **innerHTML** to insert HTML content into elements.
- **textContent** to update text content.
- **addEventListener()** to handle user interactions (e.g., button clicks).

### Two External APIs Used
1. **OpenWeatherMap API** - For retrieving current weather data and forecasts.
2. **JSONPlaceholder API** - Used as a fake REST API for POST, PUT, DELETE practice.

### What I Learned
**1. How REST APIs actually work**
Before this practical, I understood APIs in theory but had not implemented all four HTTP methods in a single project and making this website made the request-response cycle very clear.

**2. The difference between GET and POST**
GET requests send data through the URL as query parameters and POST requests send data in the request body as JSON.

**3. The role of JSON in web communication**
This practical showed how JSON is the universal language between frontend and backend. Every request sent JSON and every response came back as JSON.
Using `JSON.stringify()` and `JSON.parse()` in real code made this concept concrete.
