const request = require('supertest');
const express = require('express');
const app = express();
const Sport = require('../../src/controllers/sport');
const routes = require('../../src/routes/sport');

jest.mock('../../src/controllers/sport');

// Mocking the Sport controller function
Sport.getAllSportsToursAndMatches.mockResolvedValue({
    'Football': {
        'Premier League': [
            { matchName: 'Match 1', matchId: 1, startTime: '2023-06-01T12:00:00Z', format: 'Format 1' },
            { matchName: 'Match 2', matchId: 2, startTime: '2023-06-02T12:00:00Z', format: 'Format 2' }
        ]
    },
    'Basketball': {
        'NBA': [
            { matchName: 'Match 3', matchId: 3, startTime: '2023-06-03T12:00:00Z', format: 'Format 3' }
        ]
    }
});

// Injecting the routes into the app
routes(app);

describe('Sport Routes', () => {
    it('GET /sport/tour/match - should return all sport tours and matches', async () => {
        const response = await request(app).get('/sport/tour/match');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            'Football': {
                'Premier League': [
                    { matchName: 'Match 1', matchId: 1, startTime: '2023-06-01T12:00:00Z', format: 'Format 1' },
                    { matchName: 'Match 2', matchId: 2, startTime: '2023-06-02T12:00:00Z', format: 'Format 2' }
                ]
            },
            'Basketball': {
                'NBA': [
                    { matchName: 'Match 3', matchId: 3, startTime: '2023-06-03T12:00:00Z', format: 'Format 3' }
                ]
            }
        });
    });
});