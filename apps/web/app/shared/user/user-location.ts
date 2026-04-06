import z from 'zod';

import Cookies from 'js-cookie';
import { isProd, isServer } from '@/lib/runtime';

// import { cookies as nextCookies } from 'next/headers';

// FIX-ME allow change temperature display to sabe on temperature unity.
export const UserLocationSchema = z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
    location: z.string().optional(),
    timezone: z.string().optional(),
    temperatureUnit: z.enum(['celsius', 'fahrenheit']).default('fahrenheit').optional(),
});

export type UserLocation = z.infer<typeof UserLocationSchema>;


const COOKIE_NAME = 'finance_insights_user_location';


export const UserLocationCookie = {
    /**
     * Lógica para o Servidor (Server Components / Actions)
     */
    async getServerContext(): Promise<UserLocation | null> {
        if (!isServer) {
            throw new Error("getServerContext must be used on the server");
        }
        const { cookies: nextCookies } = await import('next/headers');
        const cookieStore = await nextCookies();
        const cookie = cookieStore.get(COOKIE_NAME);

        if (!cookie?.value) return null;
        try {
            return JSON.parse(decodeURIComponent(cookie.value));
        } catch {
            return null;
        }
    },

    /**
     * Lógica para o Cliente (Client Components / Event Handlers)
     */
    getClientContext(): UserLocation | null {
        const cookie = Cookies.get(COOKIE_NAME);
        if (!cookie) return null;
        try {
            return JSON.parse(cookie);
        } catch {
            return null;
        }
    },

    /**
     * Setter universal (geralmente usado em Client Components após o Modal)
     */
    async setContext(context: UserLocation) {
        // add cookie server side
        if (isServer) {
            const { cookies: nextCookies } = await import('next/headers');
            const cookieStore = await nextCookies();
            cookieStore.set(COOKIE_NAME, JSON.stringify(context), {
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
                sameSite: 'lax',
                secure: isProd
            });

            return;
        }

        Cookies.set(COOKIE_NAME, JSON.stringify(context), {
            expires: 7, // 1 week
            path: '/',
            sameSite: 'lax',
            secure: isProd
        });
    },

    async updateContext(partialContext: Partial<UserLocation>) {

        const currentContext = isServer
            ? await this.getServerContext()
            : this.getClientContext();

        const mergedContext = {
            ...(currentContext || {}),
            ...partialContext,
        };

        const validated = UserLocationSchema.parse(mergedContext);
        this.setContext(validated);


        return validated;
    }
};