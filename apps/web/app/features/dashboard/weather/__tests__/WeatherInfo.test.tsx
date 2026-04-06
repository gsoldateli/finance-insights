import { describe, expect, it, } from 'vitest'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { WeatherInfo } from '../WeatherInfo'
import { server } from '@/mocks/server'

import { graphql, HttpResponse } from 'msw'
import { GetWeatherDocument, SearchLocationsDocument } from '@/src/gql/graphql'
import { vi } from 'vitest'
import QueryProvider from '@/providers/query-provider';
import { UserLocationCookie } from '@/app/shared/user/user-location';
import { headers } from 'next/headers';

vi.mock('next/headers', () => ({
    headers: vi.fn().mockResolvedValue(new Map([
        ['x-forwarded-for', '127.0.0.1'],
        ['x-real-ip', '127.0.0.1']
    ]))
}))


const mockRefresh = vi.fn();
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        refresh: mockRefresh
    })
}));

vi.mock('@/app/shared/user/user-location', () => ({
    UserLocationCookie: {
        getServerContext: vi.fn().mockResolvedValue(null),
        getClientContext: vi.fn().mockReturnValue(null),
        setContext: vi.fn().mockResolvedValue(undefined),
        updateContext: vi.fn().mockResolvedValue({}),
    }
}));

describe('WeatherInfo integration', () => {
    const user = userEvent.setup();
    it('should render error message when weather data is missing or fails', async () => {
        server.use(
            graphql.query(GetWeatherDocument, () => {
                return HttpResponse.json({ data: { getWeather: null } });
            })
        );

        await act(async () => {
            render(<QueryProvider>{await WeatherInfo()}</QueryProvider>);
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
        render(<QueryProvider>{await WeatherInfo()}</QueryProvider>);



        // Verify location
        expect(await screen.findByText('New York, NY, USA')).toBeVisible();

        // Verify condition
        expect(await screen.findByText('Clear')).toBeVisible();

        // Verify default temperature (Fahrenheit)
        expect(await screen.findByText('72°F')).toBeVisible();

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

    // TODO: Convert to an integration test
    it('should update location when user changes it', async () => {
        const user = userEvent.setup();

        vi.mock('@/app/shared/user/user-location', async (importOriginal) => {
            const original = await importOriginal<typeof import('@/app/shared/user/user-location')>();
            return {
                ...original,
                UserLocationCookie: {
                    ...original.UserLocationCookie,
                    // Usamos o document.cookie real do JSDOM para persistência
                    setContext: vi.fn(async (context) => {
                        const cookieValue = encodeURIComponent(JSON.stringify(context));
                        document.cookie = `finance_insights_user_location=${cookieValue}; path=/`;
                    }),
                    getServerContext: vi.fn(async () => {
                        const match = document.cookie.match(/finance_insights_user_location=([^;]+)/);
                        return match ? JSON.parse(decodeURIComponent(match[1] ?? '')) : null;
                    }),
                }
            };
        });

        server.use(
            graphql.query(GetWeatherDocument, ({ variables }) => {
                if (variables.query?.includes('53.2707')) {
                    return HttpResponse.json({
                        data: {
                            getWeather: {
                                temperature: { celsius: 15, fahrenheit: 59 },
                                condition: "Rainy",
                                location: { city: "Galway", state: "Connacht", country: "Ireland" }
                            }
                        }
                    });
                }

                return HttpResponse.json({
                    data: {
                        getWeather: {
                            temperature: { celsius: 22, fahrenheit: 71.6 },
                            condition: "Clear",
                            location: { city: "New York", state: "NY", country: "USA" }
                        }
                    }
                });
            })
        );

        server.use(
            graphql.query(SearchLocationsDocument, ({ variables }) => {
                if (variables.query === 'Galway') {
                    return HttpResponse.json({
                        data: {
                            searchLocations: [
                                {
                                    id: '1',
                                    name: 'Galway',
                                    city: 'Galway',
                                    state: 'Connacht',
                                    country: 'Ireland',
                                    coordinates: {
                                        lat: 53.2707,
                                        lng: -9.0488,

                                    }
                                }
                            ]
                        }
                    });
                }
                return HttpResponse.json({ data: { searchLocations: [] } });
            })
        );


        render(<QueryProvider>{await WeatherInfo()}</QueryProvider>);


        expect(await screen.findByText('New York, NY, USA')).toBeVisible();

        // 2. AÇÃO DE TROCA
        const changeBtn = await screen.findByRole('button', { name: 'Change' });
        await user.click(changeBtn);

        const input = await screen.findByPlaceholderText('Type the city name...');
        await user.type(input, 'Galway');

        const option = await screen.findByRole('option', { name: /Galway/i });
        await user.click(option);

        const updatedComponent = await WeatherInfo();
        render(<QueryProvider>{updatedComponent}</QueryProvider>);

        expect(await screen.findByText('Galway')).toBeVisible();
    });


    it('should use user location from cookie when available', async () => {
        // Mock the cookie to return user location
        vi.mocked(UserLocationCookie.getServerContext).mockResolvedValue({
            lat: 34.0522,
            lng: -118.2437,
            location: 'Los Angeles, CA, USA',
            temperatureUnit: 'celsius'
        });

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
                                city: "Los Angeles",
                                state: "CA",
                                country: "USA"
                            }
                        }
                    }
                });
            })
        );

        await act(async () => {
            render(<QueryProvider>{await WeatherInfo()}</QueryProvider>);
        });

        // Verify location is taken from cookie
        expect(await screen.findByText('Los Angeles, CA, USA')).toBeVisible();

        // Verify temperature is in Celsius as per cookie
        expect(await screen.findByText('22°C')).toBeVisible();
    });

    it('should use IP-based location when no cookie is available', async () => {
        // Mock the cookie to return null
        vi.mocked(UserLocationCookie.getServerContext).mockResolvedValue(null);

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
        render(<QueryProvider>{await WeatherInfo()}</QueryProvider>);

        // Verify location is IP-based
        expect(await screen.findByText('New York, NY, USA')).toBeVisible();
    });

    it('should handle server-side rendering correctly', async () => {
        // Mock headers for server-side rendering
        vi.mocked(headers).mockResolvedValue(new Map([
            ['x-forwarded-for', '127.0.0.1'],
            ['x-real-ip', '127.0.0.1']
        ]) as any);

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

        // Render the component
        const component = await WeatherInfo();
        render(<QueryProvider>{component}</QueryProvider>);

        // Verify initial render
        expect(screen.getByText('New York, NY, USA')).toBeVisible();
        expect(screen.getByText('Clear')).toBeVisible();
        expect(screen.getByText('72°F')).toBeVisible();
    })
});
