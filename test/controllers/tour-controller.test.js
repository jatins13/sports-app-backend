const Tour = require('../../src/models/tour');
const tourController = require('../../src/controllers/tour');

jest.mock('../../src/models/tour');

describe('Test tour-controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
    });

    describe('getAllTours', () => {
        it('should return all tours', async () => {
            const tours = [
                { id: 1, name: 'Tour 1', sportId: 1, startTime: '2024-06-01', endTime: '2024-06-30' },
                { id: 2, name: 'Tour 2', sportId: 2, startTime: '2024-07-01', endTime: '2024-07-31' }
            ];

            Tour.getAllTours.mockResolvedValue(tours);

            const result = await tourController.getAllTours();

            expect(Tour.getAllTours).toHaveBeenCalled();
            expect(result).toEqual(tours);
        });
    });

    describe('getMatchesByTourName', () => {
        it('should return matches for a tour', async () => {
            const params = { name: 'Tour 1' };
            const matches = [
                { name: 'Match 1', tourId: 1, format: 'Format 1', startTime: '2024-06-05', endTime: '2024-06-10' },
                { name: 'Match 2', tourId: 1, format: 'Format 2', startTime: '2024-06-15', endTime: '2024-06-20' }
            ];

            Tour.getMatchesByTourName.mockResolvedValue(matches);

            const result = await tourController.getMatchesByTourName(params);

            expect(Tour.getMatchesByTourName).toHaveBeenCalledWith(params);
            expect(result).toEqual(matches);
        });

        it('should throw an error if name parameter is missing', async () => {
            const params = {}; // Missing 'name' parameter

            await expect(tourController.getMatchesByTourName(params)).rejects.toThrow('Missing required parameter: name');
        });
    });

    describe('getTourIdByMatchId', () => {
        it('should return tour ID for a match', async () => {
            const matchId = 1;
            const expectedTourId = 1;

            Tour.getTourIdByMatchId.mockResolvedValue(expectedTourId);

            const result = await tourController.getTourIdByMatchId(matchId);

            expect(Tour.getTourIdByMatchId).toHaveBeenCalledWith(matchId);
            expect(result).toEqual(expectedTourId);
        });
    });
});