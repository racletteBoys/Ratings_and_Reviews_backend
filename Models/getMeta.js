const db = require('../Database/database.js')


const response = {
    "product_id": product_id, // get it from the request
    "ratings": { // query reviews Table, each row has 1 rating, so increment the corresponding value
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    },
    // make this object individually 
    "recommended": {
        0: 0,
        1: 0
    }, 
    // make this object individually
    "characteristics": {
        "name": {
            id: 0,
            value: 0
        }

    }
}

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
}