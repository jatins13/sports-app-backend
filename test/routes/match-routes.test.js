const request = require('supertest');
const express = require('express');
const app = express();
const Match = require('../../src/controllers/match');
const routes = require('../../src/routes/match');

jest.mock('../../src/controllers/match');

// Mocking the Match controller function
Match.getAllMatches.mockResolvedValue([
    { id: 1, name: 'Match 1', tourId: 1, format: 'Format 1', startTime: '2024-06-01', endTime: '2024-06-30' },
    { id: 2, name: 'Match 2', tourId: 2, format: 'Format 2', startTime: '2024-07-01', endTime: '2024-07-31' }
]);

// Injecting the routes into the app
routes(app);

describe('Match Routes', () => {
    it('GET /matches - should return all matches', async () => {
        const response = await request(app).get('/matches');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: 1, name: 'Match 1', tourId: 1, format: 'Format 1', startTime: '2024-06-01', endTime: '2024-06-30' },
            { id: 2, name: 'Match 2', tourId: 2, format: 'Format 2', startTime: '2024-07-01', endTime: '2024-07-31' }
        ]);
    });
});