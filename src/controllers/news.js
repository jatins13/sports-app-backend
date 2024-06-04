const News = require('../models/news')
const Tour = require('../controllers/tour')
const Sport = require('../controllers/sport')

const getNewsByMatchId = async (params) => {
    return await News.getNewsByMatchId(params);
}


const getNewsByTourId = async (params) => {
    return await News.getNewsByTourId(params);
}


const getNewsBySportId = async (params) => {
    return await News.getNewsBySportId(params);
}

const createNewsForMatch = async (body) => {
    const tourId = await Tour.getTourIdByMatchId(body.matchId);
    body.tourId = tourId[0].tourId;
    const sportId = await Sport.getSportIdByTourId(body.tourId);
    body.sportId = sportId[0].sportId;
    return await News.createNewsForMatch(body);
}

const createNewsForTour = async (body) => {
    const sportId = await Sport.getSportIdByTourId(body.tourId);
    body.sportId = sportId[0].sportId;
    return await News.createNewsForTour(body);
}

module.exports = {
    createNewsForMatch: createNewsForMatch,
    createNewsForTour: createNewsForTour,
    getNewsByMatchId: getNewsByMatchId,
    getNewsBySportId: getNewsBySportId,
    getNewsByTourId: getNewsByTourId
}