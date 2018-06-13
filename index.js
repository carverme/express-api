var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts')

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: false}));
app.use(ejsLayouts);

//get vehicles, returns all vehicles
app.get('/vehicles', function(req, res) {
  var vehicles = fs.readFileSync('./data.json');
  vehicles = JSON.parse(vehicles);
  res.json(vehicles);
});

app.listen(3000);
