import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CloudSun, MapPin, CloudRain, Sun, Cloud, Snowflake } from "lucide-react"
import { GET_WEATHER_QUERY } from "./weather.gql"
import { api } from "@/lib/api-client"
import { headers } from "next/headers"
import { WeatherError } from "./WeatherError"

const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle") || lowerCondition.includes("shower")) return <CloudRain className="h-8 w-8" />;
    if (lowerCondition.includes("snow") || lowerCondition.includes("ice")) return <Snowflake className="h-8 w-8" />;
    if (lowerCondition.includes("cloud") || lowerCondition.includes("overcast")) return <Cloud className="h-8 w-8" />;
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) return <Sun className="h-8 w-8" />;
    return <CloudSun className="h-8 w-8" />;
}

export const WeatherInfo = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    let ip = forwardedFor ? (forwardedFor.split(",")[0]?.trim() ?? "127.0.0.1") : realIp || "127.0.0.1";
    ip = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DEBUG_IP ? process.env.NEXT_PUBLIC_DEBUG_IP : ip;

    let weather;
    try {
        const data = await api.request(GET_WEATHER_QUERY, { ip });
        weather = data?.getWeather;
    } catch (error) {
        console.error("[WeatherInfo Error]: Failed to fetch weather", error);
    }

    if (!weather) {
        return <WeatherError />;
    }

    const { temp, condition, location } = weather;

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-500">
                        {getWeatherIcon(condition)}
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <p className="text-xs text-slate-500 max-w-[120px] truncate" title={`${location.city}, ${location.state}`}>
                            {location.city}, {location.state}
                        </p>
                        <Button variant="link" size="sm" className="h-auto p-0 text-[10px] mt-1">
                            <MapPin className="h-3 w-3 mr-1" /> Change
                        </Button>
                    </div>
                </div>
                <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Weather</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{temp}°C</span>
                    <span className="text-sm text-slate-500">{condition}</span>
                </div>
            </CardContent>
        </Card>
    );
}