'use server'
import { UserLocationCookie } from "./user-location";

export async function updateTemperatureUnitAction(newUnit: 'celsius' | 'fahrenheit') {
    await UserLocationCookie.updateContext({ temperatureUnit: newUnit });
}