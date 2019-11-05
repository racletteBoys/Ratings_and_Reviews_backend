// require models here once they are completeconst
const getList = require('../Models/getAll.js').getAll;
const getMeta = require('../Models/getMeta.js').getMeta;
const addReview = require('../Models/addReview.js').addReview;
const db = require('../Database/database.js')

// getAll(1, 1, 5).then((results) => {

// })

// getMeta(5).then((results) => {
//     console.log('Ratings Object: ', results)
// })


module.exports = {
    reviews: {
        getAll: async function(req, res) {
            let page = req.query.page || 1;
            let count = req.query.count || 5;
           let result = await getList(req.params.product_id, page, count)
           res.send(result);
        },
        getMeta: async function(req, res) {
            let result = await getMeta(req.params.product_id);
            res.send(result);
        },
        addReview: async function(req, res) {
            let newReview = await addReview(req.params.product_id);
            res.status().send('Review Was added');
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

