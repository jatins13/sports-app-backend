const Match = require('../../src/models/match');
const controller = require('../../src/controllers/match');

jest.mock('../../src/models/match');

describe('Match Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
    });

    describe('getAllMatches', () => {
        it('should return all matches', async () => {
            const matches = [
                { id: 1, name: 'Match 1', tourId: 1, format: 'Format 1', startTime: '2024-06-01', endTime: '2024-06-30' },
                { id: 2, name: 'Match 2', tourId: 2, format: 'Format 2', startTime: '2024-07-01', endTime: '2024-07-31' }
            ];

            Match.getAllMatches.mockResolvedValue(matches);

            const result = await controller.getAllMatches();

            expect(Match.getAllMatches).toHaveBeenCalled();
            expect(result).toEqual(matches);
        });
    });
});
