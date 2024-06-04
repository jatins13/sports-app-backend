const News = require('../controllers/news')

module.exports = function (app) {
    app.route('/news').post(async (req, res, next) => {
        try {
            const body = req.body;
            return res.json(await News.createNews(body));
        } catch (err) {
            return next(err);
        }

    })

    app.route('/news').get(async (req, res, next) => {
        try {
            let params = req.query;
            let result = null;
            if (params.matchId) {
                result = await News.getNewsByMatchId(params);
            }
            else if (params.tourId) {
                result = await News.getNewsByTourId(params);
            }
            result = await News.getNewsBySportId(params);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });
}