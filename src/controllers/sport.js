const Sport = require('../models/sport');

const getAllSportsToursAndMatches = async () => {
    const matches = await Sport.getAllSportsToursAndMatches();
    const res = {};
    matches.forEach(match => {
        const { sportName, tourName, matchName, matchId, startTime, format } = match;
        if (!res[sportName]) {
            res[sportName] = {};
        }
        if (!res[sportName][tourName]) {
            res[sportName][tourName] = [];
        }
        res[sportName][tourName].push({ matchName, matchId, startTime, format });
    });
    return res;
}

const getSportIdByTourId = async (tourId) => {
    return await Sport.getSportIdByTourId(tourId);
}

module.exports = {
    getAllSportsToursAndMatches: getAllSportsToursAndMatches,
    getSportIdByTourId: getSportIdByTourId
}