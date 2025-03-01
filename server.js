const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to fetch weather data
app.get('/weather', async (req, res) => {
    const { city } = req.query;
    const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your OpenWeather API key

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        res.json({
            name: data.name,
            country: data.sys.country,
            description: data.weather[0].description,
            temp: Math.round(data.main.temp)
        });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // No longer needed

async function fetchDisasterForecast(city) {
    try {
        const apiUrl = `/weather?city=${city}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        const forecast = `
            <div>
                <strong>${data.name}, ${data.country}</strong> - 
                ${data.description} - 
                ${data.temp}°C
            </div>
        `;
        document.getElementById('scrolling-text').innerHTML = forecast;
    } catch (error) {
        document.getElementById('scrolling-text').innerHTML = 'Unable to load weather data.';
        console.error('Error fetching weather data:', error);
    }
}
