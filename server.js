const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./Routes/routes.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/reviews', router);

app.listen('3001',function(){
    console.log('listening on port 3000');
  });