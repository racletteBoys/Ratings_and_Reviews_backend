const db = require('../Database/database.js')



const getAll = async function(product_id, page, count, sort) {

    const listResponse = {
        "product": "",
        "page": 0,
        "count": 0,
        "results": []
    }
    let end = page * count;
    let beginning = end - count;

    // SELECT * from reviews WHERE product_id = (input) LIMIT (count)
    let results = await db.query('SELECT * from reviews WHERE product_id = $1 LIMIT $2 OFFSET $3', [product_id, count, beginning])
        let rows = results.rows
        listResponse.product = product_id;
        listResponse.page = page;
        listResponse.count = count;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].reported === true) {
                continue;
            }
            let review = {
                "review_id": rows[i].id,
                "rating": rows[i].rating,
                "summary": rows[i].summary,
                "recommend": rows[i].recommend,
                "response": rows[i].response,
                "body": rows[i].body,
                "date": rows[i].date,
                "reviewer_name": rows[i].reviewer_name,
                "helpfulness": rows[i].helpfulness,
                "photos": []
            }
            
            listResponse.results.push(review);
        }
        for (var i = 0; i < listResponse.results.length; i++) {
            let review = listResponse.results[i];
            //console.log('INSIDE PHOTO QUERY: ', review.review_id)
            let photos = (await db.query(`SELECT * from reviews_photos WHERE review_id = ${review.review_id}`)).rows;
                const photoObj = {};
                for (let i = 0; i < photos.length; i++) {
                    photoObj.id = photos[i].id;
                    photoObj.url = photos[i].url;
                    await listResponse.results[i].photos.push(photoObj)
                }
        }
        if (sort === "helpful") {
            listResponse.results.sort((a, b) => {
                return a.helpfulness - b.helpfulness;
            })
        } else if (sort === "newest") {
            listResponse.results.sort((a, b) => {
                let dateA = new Date(a.date);
                let dateB = new Date(b.date);
                return dateA - dateB;

            })
        } else if (sort === "relevant") {
            return listResponse;
        }

        return listResponse
}



module.exports = { getAll };