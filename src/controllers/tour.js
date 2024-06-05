const Tour = require('../models/tour');

const getAllTours = async () => {
    return await Tour.getAllTours();
}

const getMatchesByTourName = async params => {
    return await Tour.getMatchesByTourName(params);
}

const getTourIdByMatchId = async (matchId) => {
    return await Tour.getTourIdByMatchId(matchId);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName,
    getTourIdByMatchId: getTourIdByMatchId
}