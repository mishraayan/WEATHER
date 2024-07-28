function fetchWeather() {
    const city = document.getElementById('city').value;
    fetch('/fetch_weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `city=${city}`
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `
                <p><strong>Weather:</strong> ${data.description}</p>
                <p><strong>Temperature:</strong> ${data.temperature}°C</p>
                <p><strong>Humidity:</strong> ${data.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind_speed} m/s</p>
            `;
            weatherInfo.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch data. Please check your internet connection.');
    });
}
