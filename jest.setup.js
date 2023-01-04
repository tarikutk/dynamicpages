import { server } from './mocks/server.js'
// Establish API mocking before all tests.
beforeAll(() => {
    console.log('server is going to start')
    server.listen()
}
    )

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())