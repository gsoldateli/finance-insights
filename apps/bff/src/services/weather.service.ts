export const WeatherService = {
    async getWeather(ip?: string | null, city?: string | null) {
        let locationCity = city;
        let locationState = "Unknown";
        let locationCountry = "Unknown";

        if (!locationCity) {
            // Check if IP is valid for geolocation (avoid localhost or missing)
            if (ip && ip !== '127.0.0.1' && ip !== '::1') {
                const apiKey = process.env.ABSTRACT_API_KEY;

                if (!apiKey) {
                    console.warn("ABSTRACT_API_KEY is not set. Falling back to default location.");
                    locationCity = "San Francisco";
                    locationState = "CA";
                    locationCountry = "US";
                } else {
                    try {
                        const geoRes = await fetch(`https://ip-intelligence.abstractapi.com/v1/?api_key=${apiKey}&ip_address=${ip}`);

                        if (geoRes.ok) {
                            const geoData = await geoRes.json();
                            const location = geoData.location;

                            locationCity = location.city || 'San Francisco';
                            locationState = location.region || 'CA';
                            locationCountry = location.country || 'US';
                        } else {
                            locationCity = "San Francisco";
                            locationState = "CA";
                            locationCountry = "US";
                        }
                    } catch (error) {
                        console.error('[WeatherService Error]: Geoip failed', error);
                        locationCity = "San Francisco";
                        locationState = "CA";
                        locationCountry = "US";
                    }
                }
            } else {
                locationCity = "San Francisco";
                locationState = "CA";
                locationCountry = "US";
            }
        }

        try {
            const weatherRes = await fetch(`https://wttr.in/${encodeURIComponent(locationCity!)}?format=j1`);
            if (!weatherRes.ok) throw new Error("Failed to fetch weather data");

            const weatherData = await weatherRes.json();
            const current = weatherData.current_condition[0];

            return {
                temperature: {
                    celsius: parseInt(current.temp_C, 10),
                    fahrenheit: parseInt(current.temp_F, 10)
                },
                condition: current.weatherDesc[0].value,
                location: {
                    city: locationCity!,
                    state: locationState,
                    country: locationCountry
                }
            };
        } catch (error) {
            console.error('[WeatherService Error]: Weather fetch failed', error);
            // Fallback weather
            return {
                temperature: {
                    celsius: 0,
                    fahrenheit: 0
                },
                condition: "Unknown",
                location: {
                    city: locationCity!,
                    state: locationState,
                    country: locationCountry
                }
            };
        }
    }
};
