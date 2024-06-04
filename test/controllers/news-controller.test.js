const News = require('../../src/models/news');
const Tour = require('../../src/controllers/tour');
const Sport = require('../../src/controllers/sport');
const controller = require('../../src/controllers/news');

jest.mock('../../src/models/news');
jest.mock('../../src/controllers/tour');
jest.mock('../../src/controllers/sport');

describe('News Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
    });

    describe('createNewsForMatch', () => {
        it('should create news for a match', async () => {
            const body = { title: 'News Title', description: 'News Description', matchId: 1 };
            const tourId = 1;
            const sportId = 1;

            Tour.getTourIdByMatchId.mockResolvedValue(tourId);
            Sport.getSportIdByTourId.mockResolvedValue(sportId);
            News.createNewsForMatch.mockResolvedValue({ id: 1, ...body, tourId, sportId });

            const result = await controller.createNewsForMatch(body);

            expect(Tour.getTourIdByMatchId).toHaveBeenCalledWith(body.matchId);
            expect(Sport.getSportIdByTourId).toHaveBeenCalledWith(tourId);
            expect(News.createNewsForMatch).toHaveBeenCalledWith({ ...body, tourId, sportId });
            expect(result).toEqual({ id: 1, ...body, tourId, sportId });
        });
    });

    describe('createNewsForTour', () => {
        it('should create news for a tour', async () => {
            const body = { title: 'News Title', description: 'News Description', tourId: 1 };
            const sportId = 1;

            Sport.getSportIdByTourId.mockResolvedValue(sportId);
            News.createNewsForTour.mockResolvedValue({ id: 1, ...body, sportId });

            const result = await controller.createNewsForTour(body);

            expect(Sport.getSportIdByTourId).toHaveBeenCalledWith(body.tourId);
            expect(News.createNewsForTour).toHaveBeenCalledWith({ ...body, sportId });
            expect(result).toEqual({ id: 1, ...body, sportId });
        });
    });

    describe('getNewsByMatchId', () => {
        it('should get news by match ID', async () => {
            const matchId = 1;
            const news = [{ id: 1, title: 'News Title', description: 'News Description', matchId, tourId: 1, sportId: 1 }];

            News.getNewsByMatchId.mockResolvedValue(news);

            const result = await controller.getNewsByMatchId({ matchId });

            expect(News.getNewsByMatchId).toHaveBeenCalledWith({ matchId });
            expect(result).toEqual(news);
        });
    });

    describe('getNewsByTourId', () => {
        it('should get news by tour ID', async () => {
            const tourId = 1;
            const news = [{ id: 1, title: 'News Title', description: 'News Description', tourId, sportId: 1 }];

            News.getNewsByTourId.mockResolvedValue(news);

            const result = await controller.getNewsByTourId({ tourId });

            expect(News.getNewsByTourId).toHaveBeenCalledWith({ tourId });
            expect(result).toEqual(news);
        });
    });

    describe('getNewsBySportId', () => {
        it('should get news by sport ID', async () => {
            const sportId = 1;
            const news = [{ id: 1, title: 'News Title', description: 'News Description', sportId, tourId: 1 }];

            News.getNewsBySportId.mockResolvedValue(news);

            const result = await controller.getNewsBySportId({ sportId });

            expect(News.getNewsBySportId).toHaveBeenCalledWith({ sportId });
            expect(result).toEqual(news);
        });
    });
});
