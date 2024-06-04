const mysql = require('../lib/mysql');

const getAllTours = async () => {
    const statement = 'select * from tours;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getMatchesByTourName = async params => {

    const res = await getTourIdByName(params)
    const getMatchesByTourId = 'select * from matches where matches.tourId = ?';
    parameters = [res[0].id];
    return await mysql.query(getMatchesByTourId, parameters);
}

const getTourIdByName = async params => {
    const getTourIdByNameSql = 'select id from tours where tours.name = ?';
    let parameters = [params.name];
    return await mysql.query(getTourIdByNameSql, parameters);
}

const getTourIdByMatchId = async (matchId) => {
    const statement = 'select tourId from matches where matches.id = ?';
    const parameters = [matchId];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName,
    getTourIdByMatchId: getTourIdByMatchId
}