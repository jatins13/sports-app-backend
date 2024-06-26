const mysql = require('../lib/mysql');
const Tour = require('../models/tour')

const getNewsByTourId = async (params) => {
    const statement = 'select * from news where tourId = ?';
    const parameters = [params.tourId];
    return await mysql.query(statement, parameters);
}

const getNewsBySportId = async (params) => {
    const statement = 'select * from news where sportId = ?';
    parameters = [params.sportId];
    return await mysql.query(statement, parameters);
}

const getNewsByMatchId = async (params) => {
    const statement = 'select * from news where matchId = ?';
    let parameters = [params.matchId];
    return await mysql.query(statement, parameters);
}

const createNewsForMatch = async (params) => {
    const statement = 'insert ignore into news (title, description, matchId, tourId, sportId) values (?, ?, ?, ?, ?)';
    const parameters = [params.title, params.description, params.matchId, params.tourId, params.sportId];
    const insertObject = await mysql.query(statement, parameters);
    const getNewsByIdSql = 'select * from news where id = ?';
    const getNewsByIdParams = [insertObject.insertId];
    return await mysql.query(getNewsByIdSql, getNewsByIdParams);
}

const createNewsForTour = async (params) => {
    const statement = 'insert ignore into news (title, description, matchId, tourId, sportId) values (?, ?, ?, ?, ?)';
    const parameters = [params.title, params.description, null, params.tourId, params.sportId];
    const insertObject = await mysql.query(statement, parameters);
    const getNewsByIdSql = 'select * from news where id = ?';
    const getNewsByIdParams = [insertObject.insertId];
    return await mysql.query(getNewsByIdSql, getNewsByIdParams);
}

module.exports = {
    getNewsByMatchId: getNewsByMatchId,
    getNewsByTourId: getNewsByTourId,
    getNewsBySportId: getNewsBySportId,
    createNewsForMatch: createNewsForMatch,
    createNewsForTour: createNewsForTour
}