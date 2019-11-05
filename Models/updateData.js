const db = require('../Database/database.js')

const updateHelpful = async function(review_id) {
    const update = db.query('UPDATE reviews SET helpfulness ')
}