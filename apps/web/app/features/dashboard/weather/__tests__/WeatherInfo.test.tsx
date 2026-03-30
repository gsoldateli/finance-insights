import { describe, expect, it, } from 'vitest'
import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { WeatherInfo } from '../WeatherInfo'
import { server } from '@/mocks/server'

import { graphql, HttpResponse } from 'msw'
import { GetWeatherDocument } from '@/src/gql/graphql'
import { vi } from 'vitest'

vi.mock('next/headers', () => ({
    headers: vi.fn().mockReturnValue(new Map([
        ['x-forwarded-for', '127.0.0.1'],
        ['x-real-ip', '127.0.0.1']
    ]))
}))


const mockRefresh = vi.fn();
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        refresh: mockRefresh
    })
}))

describe('WeatherInfo integration', () => {
    const user = userEvent.setup();
    it.only('should render error message when weather data is missing or fails', async () => {
        server.use(
            graphql.query(GetWeatherDocument, () => {
                return HttpResponse.json({ data: { getWeather: null } });
            })
        );

        await act(async () => {
            render(await WeatherInfo());
        });

        expect(await screen.findByText('Error loading weather.')).toBeInTheDocument();

        expect(mockRefresh).toHaveBeenCalledTimes(0);
        user.click(screen.getByRole('button', { name: 'Try again' }));
        // since loading state is batch updated, we have to test if the refresh function was called
        await waitFor(() => expect(mockRefresh).toHaveBeenCalledTimes(1));


    });

    it('should render the weather data and toggle temperature correctly', async () => {
        server.use(
            graphql.query(GetWeatherDocument, () => {
                return HttpResponse.json({
                    data: {
                        getWeather: {
                            temperature: {
                                celsius: 22,
                                fahrenheit: 71.6
                            },
                            condition: "Clear",
                            location: {
                                city: "New York",
                                state: "NY",
                                country: "USA"
                            }
                        }
                    }
                });
            })
        );

        await act(async () => {
            render(await WeatherInfo());
        });



        // Verify location
        expect(await screen.findByText('New York, NY')).toBeDefined();

        // Verify condition
        expect(await screen.findByText('Clear')).toBeDefined();

        // Verify default temperature (Fahrenheit)
        expect(await screen.findByText('72°F')).toBeDefined();

        // Find and click the Celsius toggle button
        const celsiusButton = await screen.findByRole('button', { name: '°C' });
        user.click(celsiusButton)

        // Verify temperature changed to Celsius
        expect(await screen.findByText('22°C')).toBeDefined();

        // Click Fahrenheit toggle back
        const fahrenheitButton = await screen.findByRole('button', { name: '°F' });
        await act(async () => {
            fireEvent.click(fahrenheitButton);
        });

        // Verify temperature changed back to Fahrenheit
        expect(await screen.findByText('72°F')).toBeDefined();
    });

})
