// require models here once they are completeconst
const getAll = require('../Models/getAll.js').getAll
const db = require('../Database/database.js')

getAll(1, 1, 5).then((results) => {
    console.log('CONTROLLER: ', results)
})


module.exports = {
    reviews: {
        getAll: function(req, res) {
            models.getAll((err, results) => {
                res.send(results);
            })
        },
        getMeta: function(req, res) {
            models.getMeta((err, results) => {
                res.send(results);
            })
        },
        addReview: function(req, res) {
            models.addReview((err, results) => {
                res.send(results);
            })
        },
        markHelpful: function(req, res) {
            models.markHelpful((err, results) => {
                res.send('Review was marked as helpful');
            })
        },
        report: function(req, res) {
            models.report((err, results) => {
                res.send('Review was reported');
            })
        }

    }
}

