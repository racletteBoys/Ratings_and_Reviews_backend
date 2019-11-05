const db = require('../Database/database.js');

// POST BODY:

// let body = {
//     rating: 0, --> reviews table
//     summary: String, --> reviews table
//     body: String, --> reviews table
//     recommend: Boolean, --> reviews table
//     name: String, --> reviews table (reviewer_name)
//     email: String, --> reviews table (reviewer_email)
//     photos: String, --> reviews_photos table 
//     characteristics: Object --> {characteristic_id: 1 - 5} --> characteristics_reviews table

// }

const addReview = async function(product_id, request) {
    // reviews table
    let today = new Date();
    let lastReviewId = await db.query('SELECT nextval(id) from reviews') + 1;
    let reviewsInsert = await db.query(`INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, response) VALUES (${product_id}, ${request.rating}, ${today}, ${request.summary}, ${request.recommend}, ${request.name}, ${request.email})`);
    if (request.photos.length) {
        for (let i = 0; i < request.photos.length; i++) {
            let photosInsert = await db.query(`INSERT INTO reviews_photos(review_id, url) VALUES (${lastReviewId}, ${request.photos[i]})`);
        }
    }
    let characteristicsKeys = Object.keys(request.characteristics);
    if (!characteristicsKeys.length) {
        for (let key in request.characteristics) {
            let characteristic_id_insert = await db.query(`INSERT INTO characteristics_reviews(characteristic_id, review_id, value) VALUES (${key}, ${lastReviewId}, ${request.characteristics[key]})`);
        }
    }
}
module.exports = { addReview };