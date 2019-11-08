const db = require('../Database/database.js')

const getMeta = async function(product_id) {
    const response = {
        "product_id": product_id,
        "ratings": {},
        "recommended": {},
        "characteristics": {}
    }
    let reviewsQuery = await db.query(`SELECT * from reviews WHERE product_id = ${product_id}`);
    let reviewsRows = reviewsQuery.rows;
    let ratingsObj = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    }
    let recommendedObj = {
        0: 0,
        1: 0
    }
    for (let i = 0; i < reviewsRows.length; i++) {
        if (reviewsRows[i].rating === 1) {
            ratingsObj[1] += 1;
        } else if (reviewsRows[i].rating === 2) {
            ratingsObj[2] += 1;
        } else if (reviewsRows[i].rating === 3) {
            ratingsObj[3] += 1;
        } else if (reviewsRows[i].rating === 4) {
            ratingsObj[4] += 1;
        } else if (reviewsRows[i].rating === 5) {
            ratingsObj[5] += 1;
        }

        if (reviewsRows[i].recommend === false) {
            recommendedObj[0] += 1;
        } else if (reviewsRows[i].recommend === true) {
            recommendedObj[1] += 1;
        }
    }
    response.ratings = ratingsObj;
    response.recommended = recommendedObj;

    const characteristicsQuery = await db.query(`SELECT * from characteristics WHERE product_id = ${product_id}`);
    let charRows = characteristicsQuery.rows;
    let characteristicObj = {};
    

    for (let i = 0; i < charRows.length; i++) {

        const valueQuery = await db.query(`SELECT * from characteristics_reviews WHERE characteristic_id = ${charRows[i].id}`);
        let valueRows = valueQuery.rows;

        let sum = 0;
        let nameObj = {
            "id": 0,
            "value": 0
        }
        if (!valueRows.length) {
            continue;
        } else {
            for (let j = 0; j < valueRows.length; j++) {
                nameObj.id = valueRows[0].characteristic_id;
                sum += valueRows[j].value
            }
        }
        nameObj.value = sum / valueRows.length;
        if (nameObj.id !== 0) {
            characteristicObj[charRows[i].name] = nameObj;
        }
    }
    response.characteristics = characteristicObj;
    return response;
}

module.exports = { getMeta };
