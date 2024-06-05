const request = require('supertest');
const express = require('express');
const app = express();
const Tour = require('../../src/controllers/tour');
const routes = require('../../src/routes/tour');

jest.mock('../../src/controllers/tour');

// Mocking the Tour controller functions
Tour.getAllTours.mockResolvedValue([
    { id: 1, name: 'Tour 1', sportId: 1, startTime: '2024-06-01T10:00:00Z', endTime: '2024-06-10T18:00:00Z', status: 1, recUpdatedAt: '2023-01-01T00:00:00Z', createdAt: '2023-01-01T00:00:00Z' },
    { id: 2, name: 'Tour 2', sportId: 2, startTime: '2024-07-01T10:00:00Z', endTime: '2024-07-10T18:00:00Z', recUpdatedAt: '2023-01-01T00:00:00Z', createdAt: '2023-01-01T00:00:00Z', status: 1 }
]);
Tour.getMatchesByTourName.mockResolvedValue([
    { id: 1, name: 'Match 1', tourId: 1, format: 'ODI', startTime: '2024-06-02T10:00:00Z', endTime: '2024-06-02T18:00:00Z', recUpdatedAt: '2023-01-01T00:00:00Z', createdAt: '2023-01-01T00:00:00Z', status: 1 },
    { id: 2, name: 'Match 2', tourId: 1, format: 'T20', startTime: '2024-06-03T10:00:00Z', endTime: '2024-06-03T18:00:00Z', recUpdatedAt: '2023-01-01T00:00:00Z', createdAt: '2023-01-01T00:00:00Z', status: 1 }
]);

// Injecting the routes into the app
routes(app);

describe('Tour Routes', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
    });

    it('GET /tours - should get all tours', async () => {
        const response = await request(app).get('/tours');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: 1, name: 'Tour 1', sportId: 1, startTime: '2024-06-01T10:00:00Z', endTime: '2024-06-10T18:00:00Z', status: 1, recUpdatedAt: '2023-01-01T00:00:00Z', createdAt: '2023-01-01T00:00:00Z' },
            { id: 2, name: 'Tour 2', sportId: 2, startTime: '2024-07-01T10:00:00Z', endTime: '2024-07-10T18:00:00Z', recUpdatedAt: '2023-01-01T00:00:00Z', createdAt: '2023-01-01T00:00:00Z', status: 1 }
        ]);
    });

    it('GET /tour/matches - should get matches by tour name', async () => {
        const params = { name: 'Tour 1' };
        const response = await request(app).get('/tour/matches').query(params);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: 1, name: 'Match 1', tourId: 1, format: 'ODI', startTime: '2024-06-02T10:00:00Z', endTime: '2024-06-02T18:00:00Z', recUpdatedAt: '2023-01-01T00:00:00Z', createdAt: '2023-01-01T00:00:00Z', status: 1 },
            { id: 2, name: 'Match 2', tourId: 1, format: 'T20', startTime: '2024-06-03T10:00:00Z', endTime: '2024-06-03T18:00:00Z', recUpdatedAt: '2023-01-01T00:00:00Z', createdAt: '2023-01-01T00:00:00Z', status: 1 }
        ]);
    });

    it('GET /tour/matches - should handle missing tour name', async () => {
        const response = await request(app).get('/tour/matches');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Missing required parameter: name' });
    });
});
