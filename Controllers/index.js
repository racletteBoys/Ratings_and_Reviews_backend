// require models here once they are completeconst
const getList = require('../Models/getAll.js').getAll;
const getMeta = require('../Models/getMeta.js').getMeta;
const addReview = require('../Models/addReview.js').addReview;
const updateHelpful = require('../Models/updateData.js').updateHelpful;
const reportQuery = require('../Models/updateData.js').reportReview;
const deleteQuery = require('../Models/updateData.js').deleteRecord;
const redis = require('redis');
//const client = require('../server.js').client;
const db = require('../Database/database.js')


const REDIS_PORT = 6379;
const client = redis.createClient(REDIS_PORT);


module.exports = {
    reviews: {
        getAll: async function(req, res) {
            let sort = req.query.sort || "relevant";
            let page = req.query.page || 1;
            let count = req.query.count || 5;
            let result = await getList(req.params.product_id, page, count, sort)
            client.setex('list', 60, JSON.stringify(result));
            res.send(result);
        },
        getMeta: async function(req, res) {
            let result = await getMeta(req.params.product_id);
            client.setex('meta', 60, JSON.stringify(result));
            res.send(result);
        },
        addReview: async function(req, res) {
            let newReview = await addReview(req.params.product_id, req.body);
            res.send('Review Was added');
        },
        markHelpful: async function(req, res) {
            let marked = await updateHelpful(req.params.review_id);
            res.send('Review was marked as helpful')
        },
        report: async function(req, res) {
            let reported = await reportQuery(req.params.review_id);
            res.send('Review was reported');
        },
        delete: async function(req, res) {
            let deleted = await deleteQuery(req.params.review_id);
            res.send('The review was deleted');
        }

    }
}

