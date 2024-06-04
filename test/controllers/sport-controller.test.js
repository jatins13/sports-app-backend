const Sport = require('../../src/models/sport');
const sportController = require('../../src/controllers/sport');

jest.mock('../../src/models/sport');

describe('Sport Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
    });

    describe('getAllSportsToursAndMatches', () => {
        it('should return structured sports, tours, and matches', async () => {
            const matches = [
                { sportName: 'Football', tourName: 'Premier League', matchName: 'Match 1', matchId: 1, startTime: '2023-06-01T12:00:00Z', format: 'Format 1' },
                { sportName: 'Football', tourName: 'Premier League', matchName: 'Match 2', matchId: 2, startTime: '2023-06-02T12:00:00Z', format: 'Format 2' },
                { sportName: 'Basketball', tourName: 'NBA', matchName: 'Match 3', matchId: 3, startTime: '2023-06-03T12:00:00Z', format: 'Format 3' }
            ];

            const expectedResponse = {
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
            };

            Sport.getAllSportsToursAndMatches.mockResolvedValue(matches);

            const result = await sportController.getAllSportsToursAndMatches();

            expect(Sport.getAllSportsToursAndMatches).toHaveBeenCalled();
            expect(result).toEqual(expectedResponse);
        });

        it('should return an empty object if no matches are found', async () => {
            const matches = [];

            const expectedResponse = {};

            Sport.getAllSportsToursAndMatches.mockResolvedValue(matches);

            const result = await sportController.getAllSportsToursAndMatches();

            expect(Sport.getAllSportsToursAndMatches).toHaveBeenCalled();
            expect(result).toEqual(expectedResponse);
        });
    });

    describe('getSportIdByTourId', () => {
        it('should return sport ID by tour ID', async () => {
            const tourId = 1;
            const expectedSportId = [{ sportId: 10 }];

            Sport.getSportIdByTourId.mockResolvedValue(expectedSportId);

            const result = await sportController.getSportIdByTourId(tourId);

            expect(Sport.getSportIdByTourId).toHaveBeenCalledWith(tourId);
            expect(result).toEqual(expectedSportId);
        });

        it('should return null if no sport ID is found for the given tour ID', async () => {
            const tourId = 2;
            const expectedSportId = null;

            Sport.getSportIdByTourId.mockResolvedValue(expectedSportId);

            const result = await sportController.getSportIdByTourId(tourId);

            expect(Sport.getSportIdByTourId).toHaveBeenCalledWith(tourId);
            expect(result).toBeNull();
        });
    });
});
