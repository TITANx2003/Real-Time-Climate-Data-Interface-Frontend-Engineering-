// Utilizing Python Backend Proxy to secure API keys
const API_URL = 'http://127.0.0.1:5000/api/weather';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherDisplay = document.getElementById('weatherDisplay');
const errorMsg = document.getElementById('errorMsg');

// Event Listeners
searchBtn.addEventListener('click', () => fetchWeatherData(cityInput.value));
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchWeatherData(cityInput.value);
});

// Async function to handle data streams
async function fetchWeatherData(city) {
    if (!city.trim()) return;
    
    try {
        // Reset UI State
        errorMsg.classList.add('hidden');
        weatherDisplay.classList.add('hidden');
        
        // Fetch from local Python Flask API
        const response = await fetch(`${API_URL}?city=${encodeURIComponent(city)}`);
        
        if (!response.ok) {
            throw new Error('Meteorological data unavailable for this location.');
        }
        
        const data = await response.json();
        updateDOM(data);
        
    } catch (error) {
        handleError(error.message);
    }
}

// DOM Manipulation Logic
function updateDOM(data) {
    document.getElementById('tempValue').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('conditionValue').textContent = data.weather[0].description;
    document.getElementById('humidityValue').textContent = `${data.main.humidity}%`;
    document.getElementById('windValue').textContent = `${data.wind.speed} m/s`;
    
    weatherDisplay.classList.remove('hidden');
}

// Error Handling Logic
function handleError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
}