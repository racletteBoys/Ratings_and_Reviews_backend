let router = require('express').Router();
let reviews = require('../Controllers/index.js')

//reviews.reviews.getAll(5, 2, 5)
// console.log(reviews.reviews)

// Get all reviews for one product
router.get('/:product_id/list', reviews.reviews.getAll);
// get meta data (ratings / characteristics) for one product
// router.get('/reviews/:product_id/meta', (req, res, next) => {

// })
// // post for adding a new review
// router.post('/reviews/:product_id', (req, res, next) => {

// })
// // Mark a review as helpful
// router.put('/reviews/helpful/:review_id', (req, res, next) => {

// })
// // Report a review
// router.put('/reviews/report/:review_id', (req, res, next) => {

// })

module.exports = router;