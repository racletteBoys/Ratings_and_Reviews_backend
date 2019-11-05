const db = require('../Database/database.js')

const updateHelpful = async function(review_id) {
    const update = db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id}`);
}

const reportReview = async function(review_id) {
    const reported = db.query(`UPDATE reviews SET reported = true WHERE id = ${review_id}`);
}

const deleteRecord = async function(review_id) {
    const deleted = db.query(`DELETE from reviews WHERE id = ${review_id}`);
}

module.exports = { updateHelpful, reportReview, deleteRecord };