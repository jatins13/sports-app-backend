const News = require('../models/news')

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
    return await News.createNewsForMatch(body);
}

const createNewsForTour = async (body) => {
    return await News.createNewsForTour(body);
}

module.exports = {
    createNewsForMatch: createNewsForMatch,
    createNewsForTour: createNewsForTour,
    getNewsByMatchId: getNewsByMatchId,
    getNewsBySportId: getNewsBySportId,
    getNewsByTourId: getNewsByTourId
}