document.getElementById('location-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('location-input').value;
    getWeatherData(location);
});

function getWeatherData(location) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                updateUI(data);
            } else {
                alert('Location not found');
            }
        })
        .catch(error => console.error('Error fetching the weather data:', error));
}

function updateUI(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('conditions').textContent = `Conditions: ${data.weather[0].description}`;
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherDataByCoords(lat, lon);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function getWeatherDataByCoords(lat, lon) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                updateUI(data);
            } else {
                alert('Location not found');
            }
        })
        .catch(error => console.error('Error fetching the weather data:', error));
}

// Get user's location on page load
getUserLocation();
