const db = require('../Database/database.js')



const getAll = function(product_id, page, count) {
    const listResponse = {
        "product": "",
        "page": 0,
        "count": 0,
        "results": [
            {
                "review_id": 0,
                "rating": 0,
                "summary": "",
                "recommend": 0,
                "response": "",
                "body": "",
                "date": "",
                "reviewer_name": "",
                "helpfulness": 0,
                "photos": []
            }
        ]
    }
    
    // SELECT * from reviews WHERE product_id = (input) LIMIT (count)
    return db.query(`SELECT * from reviews WHERE product_id = ${product_id} LIMIT ${count} `)
    .then((results) => {
        let rows = results.rows
        for (var i = 0; i < rows.length; i++) {
            listResponse.product = product_id;
            listresponse.page = page;
            listResponse.count = count;
            listResponse.

        }
        return review
    })
   
}

module.exports = { getAll };