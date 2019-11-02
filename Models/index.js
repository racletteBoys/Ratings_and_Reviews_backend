const db = require('../Database/database.js')



const getAll = function(product_id, page, count) {
    const listResponse = {
        "product": "",
        "page": 0,
        "count": 0,
        "results": []
    }


    
    // SELECT * from reviews WHERE product_id = (input) LIMIT (count)
    return db.query(`SELECT * from reviews WHERE product_id = ${product_id} LIMIT ${count}`)
    .then((results) => {
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
            db.query(`SELECT * from reviews_photos WHERE review_id = 5`)
            .then((results) => {
                const rows = results.rows;
                const photoObj = {};
                const photos = [];
                //console.log('photo rows', rows);
                for (let i = 0; i < rows.length; i++) {
                    photoObj.id = rows[i].id;
                    photoObj.url = rows[i].url;
                    photos.push(photoObj);
                }
                return photos;
            })
            
            listResponse.results.push(review);
        }
        return listResponse
    })
}


const getPhotos = (review_id) => {
    db.query(`SELECT * from reviews_photos WHERE review_id = ${review_id}`)
    .then((results) => {
        const rows = results.rows;
        const photoObj = {};
        const photos = [];
        //console.log('photo rows', rows);
        for (let i = 0; i < rows.length; i++) {
            photoObj.id = rows[i].id;
            photoObj.url = rows[i].url;
            photos.push(photoObj);
        }
        list.results.push(review)
        return photos;
    })
}


module.exports = { getAll };