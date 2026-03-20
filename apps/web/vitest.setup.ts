import '@testing-library/jest-dom/vitest';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { server } from './mocks/server';


beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })
});

afterEach(() => {
    server.resetHandlers()
    vi.resetModules()
});

afterAll(() => server.close())
