const News = require('../controllers/news')

module.exports = function (app) {
    app.route('/news').post(async (req, res, next) => {
        try {
            const body = req.body;
            if (body.matchId) {
                return res.json(await News.createNewsForMatch(body));
            }
            else if (body.tourId) {
                return res.json(await News.createNewsForTour(body));
            }
            return res.status(500).json({ message: "Give a valid body with either matchId or tourId." })

        } catch (err) {
            return next(err);
        }

    })

    app.route('/news').get(async (req, res, next) => {
        try {
            let params = req.query;
            if (params.matchId) {
                return res.json(await News.getNewsByMatchId(params));
            }
            else if (params.tourId) {
                return res.json(await News.getNewsByTourId(params));
            }
            else if (params.sportId) {
                return res.json(await News.getNewsBySportId(params));
            }
            return res.status(500).json({ message: "Please provide a valid matchId or tourId or sportId to fetch news." });

        } catch (err) {
            return next(err);
        }
    });
}