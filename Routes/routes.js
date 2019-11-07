let router = require('express').Router();
let reviews = require('../Controllers/index.js')
const redis = require('redis');

const REDIS_PORT = 6379;
const client = redis.createClient(REDIS_PORT);

//console.log('CLIENT: ', client);
//Redis cache middleware
function cache(req, res, next) {
    const product_id = req.params.product_id;
    client.get(product_id, (err, data) => {
        if (err) throw err;
        if (data !== null) {
            res.send(data);
        } else {
            next();
        }
    })
}



// Get all reviews for one product
router.get('/:product_id/list', cache, reviews.reviews.getAll);

//get meta data (ratings / characteristics) for one product
router.get('/:product_id/meta', cache, reviews.reviews.getMeta);
// post for adding a new review
router.post('/:product_id', reviews.reviews.addReview);
// // Mark a review as helpful
router.put('/helpful/:review_id', reviews.reviews.markHelpful);
// // Report a review
router.put('/report/:review_id', reviews.reviews.report);

router.delete('/:review_id', reviews.reviews.delete);

module.exports = router;