const mysql = require('../lib/mysql');

const getAllSportsToursAndMatches = async () => {
    const statement = `select s.name as sportName, t.name as tourName, m.name as matchName,
         m.id as matchId, m.startTime as startTime, m.format as format
        from matches m inner join tours t on m.tourId = t.id 
        inner join sports s on t.sportId = s.id`;
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getSportIdByTourId = async (tourId) => {
    const statement = 'select sportId from tours where tours.id = ?';
    const parameters = [tourId];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllSportsToursAndMatches: getAllSportsToursAndMatches,
    getSportIdByTourId: getSportIdByTourId
}