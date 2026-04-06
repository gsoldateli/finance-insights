import '@testing-library/jest-dom/vitest';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { server } from './mocks/server';
import { cleanup } from '@testing-library/react';

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })
});

afterEach(() => {
    cleanup();
    server.resetHandlers()
    vi.resetModules()
});

afterAll(() => server.close())


class ResizeObserverMock {
    observe() { }
    unobserve() { }
    disconnect() { }
}

global.ResizeObserver = ResizeObserverMock;
