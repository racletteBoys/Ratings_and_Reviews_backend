const db = require('../Database/database.js')


// query reviews (select * from reviews where product_id = product_id)
    // loop through the rows, check what key in ratings the current rating matches
    // and increment the correct one

    // also check if recommended or not, if not, increment key 0 in characteristics, else key 1

// After that, make query to characteristics table with product_id
    // (SELECT * from characteristics WHERE product_id = product_id)

    // instantiate a new characteristics object
        // loop through the returned rows, grab the name and set in the new obj instance
        // set the name's id and value from loop
    // insert the instance obj into the characteristics prop in response obj

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

// Make query to characteristics table, X
    // loop through the response rows X
    // create new characteristicsObj, with rows[i].name as the name, X
        // make a new query to characteristics_reviews table using rows[i].id 
            // create a new nameObj
            // loop through response rows,
            // set id to rows[i].characteristic_id and value to rows[i].value
        // append nameObj to characteristicObj