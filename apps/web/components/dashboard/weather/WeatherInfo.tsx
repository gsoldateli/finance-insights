import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CloudSun, CloudRain, Sun, Cloud, Snowflake } from "lucide-react"
import { GET_WEATHER_QUERY } from "./weather.gql"
import { api } from "@/lib/api-client"
import { headers } from "next/headers"
import { WeatherError } from "./WeatherError.client"
import { TemperatureDisplay } from "./TemperatureDisplay.client"
import { WeatherLocationAction } from "./WeatherLocationAction.client"
import { UserLocationCookie } from "@/app/shared/user/user-location"
import { isDev } from "@/lib/runtime"

const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle") || lowerCondition.includes("shower")) return <CloudRain className="h-8 w-8" />;
    if (lowerCondition.includes("snow") || lowerCondition.includes("ice")) return <Snowflake className="h-8 w-8" />;
    if (lowerCondition.includes("cloud") || lowerCondition.includes("overcast")) return <Cloud className="h-8 w-8" />;
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) return <Sun className="h-8 w-8" />;
    return <CloudSun className="h-8 w-8" />;
}

export const WeatherInfo = async () => {

    let query = "";
    const userLocationCookie = await UserLocationCookie.getServerContext();

    if (userLocationCookie?.lat && userLocationCookie?.lng) {
        query = `${userLocationCookie.lat},${userLocationCookie.lng}`;
    }
    else {
        const headersList = await headers();
        const forwardedFor = headersList.get("x-forwarded-for");
        const realIp = headersList.get("x-real-ip");
        const queryIp = forwardedFor ? (forwardedFor.split(",")[0]?.trim() ?? "127.0.0.1") : realIp || "127.0.0.1";
        query = isDev && process.env.NEXT_PUBLIC_DEBUG_IP ? process.env.NEXT_PUBLIC_DEBUG_IP : queryIp;
    }

    let weather;

    try {
        const data = await api.request(GET_WEATHER_QUERY, { query });
        weather = data?.getWeather;
    } catch (error) {
        console.error("[WeatherInfo Error]: Failed to fetch weather", error);
    }

    if (!weather) {
        return <WeatherError />;
    }

    const { temperature, condition, location } = weather;
    const displayLocation = userLocationCookie?.location || `${location.city}, ${location.state}, ${location.country}`;
    const displayTemperatureUnit = userLocationCookie?.temperatureUnit || 'fahrenheit';

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-500">
                        {getWeatherIcon(condition)}
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <WeatherLocationAction location={displayLocation} />
                    </div>
                </div>
                <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Weather</p>
                <TemperatureDisplay
                    fahrenheit={temperature.fahrenheit}
                    celsius={temperature.celsius}
                    condition={condition}
                    initialTemperatureUnit={displayTemperatureUnit}
                />

            </CardContent>
            <CardFooter className="flex justify-end px-2 py-2 text-xs">
                Data powered by&nbsp;<a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-500">WeatherAPI</a>
            </CardFooter>
        </Card>
    );
}