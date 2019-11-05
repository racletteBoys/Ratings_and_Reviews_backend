let router = require('express').Router();
let reviews = require('../Controllers/index.js')

//reviews.reviews.getAll(5, 2, 5)
// console.log(reviews.reviews)

// Get all reviews for one product
router.get('/:product_id/list', reviews.reviews.getAll);

//get meta data (ratings / characteristics) for one product
router.get('/:product_id/meta', reviews.reviews.getMeta);
// post for adding a new review
router.post('/:product_id', reviews.reviews.addReview);
// // Mark a review as helpful
// router.put('/reviews/helpful/:review_id', (req, res, next) => {

// })
// // Report a review
// router.put('/reviews/report/:review_id', (req, res, next) => {

// })

module.exports = router;