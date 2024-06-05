const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json())
const News = require('../../src/controllers/news');
const routes = require('../../src/routes/news');


jest.mock('../../src/controllers/news');

// Mocking the News controller functions
News.createNewsForMatch.mockResolvedValue({ id: 1, title: 'News Title', description: 'News Description', matchId: 1, tourId: 1, sportId: 1 });
News.createNewsForTour.mockResolvedValue({ id: 2, title: 'News Title', description: 'News Description', matchId: null, tourId: 2, sportId: 1 });
News.getNewsByMatchId.mockResolvedValue([
    { id: 1, title: 'News 1', description: 'Description 1', matchId: 1, tourId: 1, sportId: 1 },
    { id: 2, title: 'News 2', description: 'Description 2', matchId: 1, tourId: 1, sportId: 1 }
]);
News.getNewsByTourId.mockResolvedValue([
    { id: 3, title: 'News 3', description: 'Description 3', matchId: 1, tourId: 2, sportId: 1 },
    { id: 4, title: 'News 4', description: 'Description 4', matchId: 1, tourId: 2, sportId: 1 }
]);
News.getNewsBySportId.mockResolvedValue([
    { id: 5, title: 'News 5', description: 'Description 5', matchId: 1, tourId: 1, sportId: 2 },
    { id: 6, title: 'News 6', description: 'Description 6', matchId: 1, tourId: 1, sportId: 2 }
]);

// Injecting the routes into the app
routes(app);

describe('News Routes', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
    });

    it('POST /news - should create news for match', async () => {
        const requestBody = { title: 'News Title', description: 'News Description', matchId: 1 };
        const response = await request(app)
            .post('/news')
            .send(requestBody);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, ...requestBody, tourId: 1, sportId: 1 });
    });

    it('POST /news - should create news for tour', async () => {
        const requestBody = { title: 'News Title', description: 'News Description', tourId: 2 };
        const response = await request(app)
            .post('/news')
            .send(requestBody);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 2, ...requestBody, matchId: null, sportId: 1 });
    });

    it('POST /news -should give error if there is no matchId or tourId in body', async () => {
        const requestBody = {};
        const response = await request(app)
            .post('/news')
            .send(requestBody);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Give a valid body with either matchId or tourId." })
    })

    it('GET /news - should get news by matchId', async () => {
        const matchId = 1;
        const response = await request(app).get(`/news?matchId=${matchId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: 1, title: 'News 1', description: 'Description 1', matchId: 1, tourId: 1, sportId: 1 },
            { id: 2, title: 'News 2', description: 'Description 2', matchId: 1, tourId: 1, sportId: 1 }
        ]);
    });

    it('GET /news - should get news by tourId', async () => {
        const tourId = 2;
        const response = await request(app).get(`/news?tourId=${tourId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: 3, title: 'News 3', description: 'Description 3', matchId: 1, tourId: 2, sportId: 1 },
            { id: 4, title: 'News 4', description: 'Description 4', matchId: 1, tourId: 2, sportId: 1 }
        ]);
    });

    it('GET /news - should get news by sportId', async () => {
        const sportId = 2;
        const response = await request(app).get(`/news?sportId=${sportId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: 5, title: 'News 5', description: 'Description 5', matchId: 1, tourId: 1, sportId: 2 },
            { id: 6, title: 'News 6', description: 'Description 6', matchId: 1, tourId: 1, sportId: 2 }
        ]);
    });

    it('GET /news - should give error if no query param is provided', async () => {
        const response = await request(app).get(`/news`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Please provide a valid matchId or tourId or sportId to fetch news." });
    });
});
