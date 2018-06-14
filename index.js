var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts')

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(ejsLayouts);

//get vehicles, returns all vehicles
app.get('/vehicles', function(req, res) {
  var vehicles = fs.readFileSync('./data.json');
  vehicles = JSON.parse(vehicles);
  res.json(vehicles);
});

//POST /vehicles - adds a new vehicle.
app.post('/vehicles', function(req, res) {
  console.log(req.body);
  var vehicles = fs.readFileSync('./data.json');
  vehicles = JSON.parse(vehicles);
  vehicles.push( {make: req.body.make, model: req.body.model} );
  fs.writeFileSync('./data.json', JSON.stringify(vehicles));
  res.json(vehicles);
});

//For specific ID access, include the route in the url... from the
//Gets a specific item from an array.
app.get('/vehicles/:id', function(req, res) {
  var vehicles = fs.readFileSync('./data.json');
  vehicles = JSON.parse(vehicles);
  var vehicleIndex = req.params.id;
  if (vehicleIndex >= vehicles.length) {
      res.json({make: null, model: null});
  } else {
    res.json(vehicles[vehicleIndex]);
  }
});

//Updates a specific item from an array
app.put('/vehicles/:id', function(req, res) {
  var vehicles = fs.readFileSync('./data.json');
  vehicles = JSON.parse(vehicles);
  var vehicleIndex = req.params.id;
  if (vehicleIndex >= vehicles.length) {
    res.json({make: null, model: null});
  } else {
    vehicles[vehicleIndex].make = req.body.make;
    vehicles[vehicleIndex].model = req.body.model;
    fs.writeFileSync('./data.json', JSON.stringify(vehicles));
    res.json(vehicles);
  }

});
//Deletes a specific item from an array
app.delete('/vehicles/:id', function(req, res) {
  var vehicles = fs.readFileSync('./data.json');
  vehicles = JSON.parse(vehicles);
  var vehicleIndex = req.params.id;
  vehicles.splice( vehicleIndex, 1);
  fs.writeFileSync('./data.json', JSON.stringify(vehicles));
  res.json(vehicles);
});

app.listen(3000);
