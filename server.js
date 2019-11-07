const relic = require('newrelic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./Routes/routes.js');
const redis = require('redis');

// const REDIS_PORT = 6379;
// const client = redis.createClient(REDIS_PORT);


// function cache(req, res, next) {
//   const product_id = req.params.product_id;
//   client.get(product_id, (err, data) => {
//       if (err) throw err;
//       if (data !== null) {
//           res.send(data);
//       } else {
//           next();
//       }
//   })
// }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/reviews', router);

app.listen('3001',function(){
    console.log('listening on port 3001');
  });

