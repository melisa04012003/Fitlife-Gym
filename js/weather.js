document.addEventListener('DOMContentLoaded', () => {
    const weatherWidget = document.getElementById('weather-widget');
    const API_KEY = 'cd32c94e7a85382c9574351b15df5c17'; // Free OpenWeatherMap API key

    // Get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            getWeather(lat, lon);
        }, error => {
            // Default to Harare if geolocation fails
            getWeather(-17.8292, 31.0522); // Coordinates for Harare, Zimbabwe
            console.error('Error getting location:', error);
        });
    } else {
        // Default to Harare if geolocation is not supported
        getWeather(-17.8292, 31.0522); // Coordinates for Harare, Zimbabwe
    }

    async function getWeather(lat, lon) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            const data = await response.json();

            // Use Celsius temperature directly from API
            const tempC = Math.round(data.main.temp);
            
            // Get weather icon
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

            // Update weather widget
            weatherWidget.innerHTML = `
                <div class="weather-content">
                    <img src="${iconUrl}" alt="Weather icon" class="weather-icon">
                    <div class="weather-info">
                        <div class="temperature">${tempC}°C</div>
                        <div class="description">${data.weather[0].description}</div>
                        <div class="location">${data.name}</div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error fetching weather:', error);
            weatherWidget.innerHTML = '<p class="text-muted">Weather information unavailable</p>';
        }
    }
});
