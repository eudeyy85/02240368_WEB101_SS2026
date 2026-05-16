// ─── Configuration and Constants ───
const WEATHER_API_KEY = 'e963097013be5b2798cbb00e13e115f6';       // your OpenWeatherMap API key
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'; // weather API endpoint
const PLACEHOLDER_API_URL = 'https://jsonplaceholder.typicode.com/posts';  // fake REST API for saving locations

// ─── Global State ───
let savedLocations = [];                                            // array to store all saved locations

// ─── App Starts Here (runs after HTML is fully loaded) ───
document.addEventListener('DOMContentLoaded', () => {

    // Tab navigation
    const tabs = document.querySelectorAll('.tab');                 // get all tab buttons
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {                       // when any tab is clicked
            const tabId = tab.getAttribute('data-tab');             // get which tab was clicked

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));        // remove active from all tabs
            tab.classList.add('active');                            // add active to clicked tab

            // Update active content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');                 // hide all tab panels
            });
            document.getElementById(`${tabId}-tab`).classList.add('active'); // show clicked tab panel
        });
    });

    // Button event listeners
    document.getElementById('get-weather').addEventListener('click', getWeather);         // GET button → fetch weather
    document.getElementById('save-location').addEventListener('click', saveLocation);     // POST button → save location
    document.getElementById('update-location').addEventListener('click', updateLocation); // PUT button → update location
    document.getElementById('cancel-edit').addEventListener('click', () => {
        document.getElementById('edit-modal').style.display = 'none'; // Cancel button → close modal
    });

    fetchSavedLocations();                                          // load saved locations when page starts
});

// ─── Utility: Show Last API Request Info ───
function displayResponseInfo(method, url, status, data) {
    const responseInfo = document.getElementById('response-info'); // get the info display box
    responseInfo.textContent = `Method: ${method}                  
URL: ${url}
Status: ${status}
Timestamp: ${new Date().toLocaleString()}

Data: ${JSON.stringify(data, null, 2)}`;                           // show method, url, status, time, and response data
}

// ─── GET Request: Fetch Weather ───
async function getWeather() {
    const cityInput = document.getElementById('city-input');        // get the city input field
    const city = cityInput.value.trim();                            // get value and remove extra spaces

    if (!city) {                                                    // if city is empty
        alert('Please enter a city name');                          // show warning
        return;                                                     // stop the function
    }

    const weatherResult = document.getElementById('weather-result'); // get result display area
    weatherResult.innerHTML = 'Loading...';                          // show loading text

    try {
        const url = `${WEATHER_API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_API_KEY}`; // build API URL
        const response = await fetch(url);                          // send GET request to weather API
        const data = await response.json();                         // parse response as JSON

        displayResponseInfo('GET', url.replace(WEATHER_API_KEY, 'API_KEY_HIDDEN'), response.status, data); // show request info (hide API key)

        if (!response.ok) {                                         // if request failed
            throw new Error(data.message || 'Failed to fetch weather data'); // throw error with message
        }

        weatherResult.innerHTML = `
            <div class="weather-card">
                <h3>${data.name}, ${data.sys.country}</h3>                              <!-- city and country name -->
                <div><strong>Weather:</strong> ${data.weather[0].main} – ${data.weather[0].description}</div> <!-- weather condition -->
                <div><strong>Temperature:</strong> ${data.main.temp}°C (Feels like: ${data.main.feels_like}°C)</div> <!-- temperature -->
                <div><strong>Humidity:</strong> ${data.main.humidity}%</div>            <!-- humidity -->
                <div><strong>Wind:</strong> ${data.wind.speed} m/s</div>                <!-- wind speed -->
            </div>
            <button id="quick-save" style="background-color:#27ae60;">Save This Location</button> <!-- green save button -->
        `;

        document.getElementById('quick-save').addEventListener('click', () => {
            document.getElementById('location-name').value = `Weather in ${data.name}`; // pre-fill name field
            document.getElementById('location-city').value = data.name;                 // pre-fill city field
            document.getElementById('location-country').value = data.sys.country;       // pre-fill country field
            document.getElementById('location-notes').value = `Temp: ${data.main.temp}°C, Weather: ${data.weather[0].description}`; // pre-fill notes
            document.querySelector('.tab[data-tab="post"]').click();                     // switch to POST tab
        });

    } catch (error) {
        weatherResult.innerHTML = `
            <div class="weather-card" style="border-left-color:#e74c3c;">  <!-- red border for error -->
                <h3>Error</h3>
                <p>${error.message}</p>                                     <!-- show error message -->
            </div>
        `;
    }
}

// ─── POST Request: Save Location ───
async function saveLocation() {
    const name = document.getElementById('location-name').value.trim();       // get location name
    const city = document.getElementById('location-city').value.trim();       // get city
    const country = document.getElementById('location-country').value.trim(); // get country
    const notes = document.getElementById('location-notes').value.trim();     // get notes

    if (!name || !city) {                                           // if name or city is empty
        alert('Please enter at least a name and city');             // show warning
        return;                                                     // stop the function
    }

    try {
        const locationData = {
            title: name,                                            // location name as title
            body: JSON.stringify({ city, country, notes }),         // pack city/country/notes into body
            userId: 1                                               // fake user ID for JSONPlaceholder
        };

        const response = await fetch(PLACEHOLDER_API_URL, {
            method: 'POST',                                         // send POST request
            headers: { 'Content-Type': 'application/json' },       // tell server we're sending JSON
            body: JSON.stringify(locationData)                      // convert data to JSON string
        });

        const data = await response.json();                         // parse response
        displayResponseInfo('POST', PLACEHOLDER_API_URL, response.status, data); // show request info

        if (!response.ok) {                                         // if request failed
            throw new Error('Failed to save location');             // throw error
        }

        const savedLocation = { id: data.id, name, city, country, notes }; // build location object from response
        savedLocations.push(savedLocation);                         // add to local array
        renderSavedLocations();                                     // refresh the saved locations list

        // Clear form fields after saving
        document.getElementById('location-name').value = '';
        document.getElementById('location-city').value = '';
        document.getElementById('location-country').value = '';
        document.getElementById('location-notes').value = '';

        document.querySelector('.tab[data-tab="saved"]').click();  // switch to saved locations tab

    } catch (error) {
        alert(`Error: ${error.message}`);                           // show error popup
    }
}

// ─── Fetch Initial Saved Locations (simulated GET from JSONPlaceholder) ───
async function fetchSavedLocations() {
    try {
        const response = await fetch(`${PLACEHOLDER_API_URL}?userId=1`); // GET posts by userId=1
        const data = await response.json();                         // parse response

        savedLocations = data.slice(0, 5).map(item => {            // take first 5 results only
            let city = '', country = '', notes = '';
            try {
                const body = JSON.parse(item.body);                 // try to parse body as JSON
                city = body.city || 'Unknown City';                 // extract city or fallback
                country = body.country || '';                       // extract country or empty
                notes = body.notes || '';                           // extract notes or empty
            } catch (e) {
                city = 'Unknown City';                              // if parsing fails, use fallback
                notes = item.body;                                  // use raw body as notes
            }
            return { id: item.id, name: item.title, city, country, notes }; // return clean object
        });

        renderSavedLocations();                                     // display the locations

    } catch (error) {
        console.error('Error fetching saved locations:', error);    // log error to browser console
    }
}

// ─── Render Saved Locations to the Page ───
function renderSavedLocations() {
    const container = document.getElementById('saved-locations');  // get the display container

    if (savedLocations.length === 0) {                             // if no locations saved
        container.innerHTML = '<p>No saved locations. Add one in the "POST Location" tab.</p>'; // show empty message
        return;
    }

    container.innerHTML = savedLocations.map(location => `
        <div class="location-item" data-id="${location.id}">       <!-- card for each location -->
            <h3>${location.name}</h3>                              <!-- location name -->
            <div><strong>City:</strong> ${location.city}</div>     <!-- city -->
            ${location.country ? `<div><strong>Country:</strong> ${location.country}</div>` : ''} <!-- country (only if exists) -->
            ${location.notes ? `<div><strong>Notes:</strong> ${location.notes}</div>` : ''}       <!-- notes (only if exists) -->
            <div class="location-actions">
                <button class="btn-edit" onclick="editLocation(${location.id})">Edit</button>     <!-- opens edit modal -->
                <button class="btn-delete" onclick="deleteLocation(${location.id})">Delete</button> <!-- deletes location -->
            </div>
        </div>
    `).join('');                                                    // join all cards into one HTML string
}

// ─── PUT Request: Open Edit Modal ───
function editLocation(id) {
    const location = savedLocations.find(loc => loc.id === id);   // find location by id
    if (!location) return;                                         // stop if not found

    document.getElementById('edit-id').value = location.id;       // store id in hidden field
    document.getElementById('edit-name').value = location.name;   // pre-fill name
    document.getElementById('edit-city').value = location.city;   // pre-fill city
    document.getElementById('edit-country').value = location.country; // pre-fill country
    document.getElementById('edit-notes').value = location.notes; // pre-fill notes
    document.getElementById('edit-modal').style.display = 'block'; // show the modal
}

// ─── PUT Request: Submit Updated Location ───
async function updateLocation() {
    const id = document.getElementById('edit-id').value;           // get the hidden location id
    const name = document.getElementById('edit-name').value.trim();    // get updated name
    const city = document.getElementById('edit-city').value.trim();    // get updated city
    const country = document.getElementById('edit-country').value.trim(); // get updated country
    const notes = document.getElementById('edit-notes').value.trim();  // get updated notes

    if (!name || !city) {                                          // if name or city is empty
        alert('Please enter at least a name and city');            // show warning
        return;                                                    // stop the function
    }

    try {
        const locationData = {
            id,                                                    // include the id
            title: name,                                           // updated name
            body: JSON.stringify({ city, country, notes }),        // updated data as JSON string
            userId: 1                                              // fake user ID
        };

        const response = await fetch(`${PLACEHOLDER_API_URL}/${id}`, {
            method: 'PUT',                                         // send PUT request to update
            headers: { 'Content-Type': 'application/json' },      // tell server we're sending JSON
            body: JSON.stringify(locationData)                     // convert data to JSON string
        });

        const data = await response.json();                        // parse response
        displayResponseInfo('PUT', `${PLACEHOLDER_API_URL}/${id}`, response.status, data); // show request info

        if (!response.ok) {                                        // if request failed
            throw new Error('Failed to update location');          // throw error
        }

        const index = savedLocations.findIndex(loc => loc.id === parseInt(id)); // find location index in array
        if (index !== -1) {                                        // if found
            savedLocations[index] = { id: parseInt(id), name, city, country, notes }; // replace with updated data
            renderSavedLocations();                                // refresh the list
        }

        document.getElementById('edit-modal').style.display = 'none'; // close the modal

    } catch (error) {
        alert(`Error: ${error.message}`);                          // show error popup
    }
}

// ─── DELETE Request: Remove Location ───
async function deleteLocation(id) {
    if (!confirm('Are you sure you want to delete this location?')) return; // ask user to confirm

    try {
        const response = await fetch(`${PLACEHOLDER_API_URL}/${id}`, {
            method: 'DELETE'                                       // send DELETE request
        });

        displayResponseInfo('DELETE', `${PLACEHOLDER_API_URL}/${id}`, response.status, { message: 'Resource deleted successfully' }); // show request info

        if (!response.ok) {                                        // if request failed
            throw new Error('Failed to delete location');          // throw error
        }

        savedLocations = savedLocations.filter(loc => loc.id !== id); // remove deleted location from array
        renderSavedLocations();                                    // refresh the list

    } catch (error) {
        alert(`Error: ${error.message}`);                          // show error popup
    }
}
