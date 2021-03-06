var express = require('express');
var bodyParser = require('body-parser');
// animation pizza paradise
var pizzaParadise = require('./handlers/animation-pizza-handler');
var dropdownPizzaParadise = require('./handlers/dropdown-menu-handler');

var app = express();
app.use(bodyParser.json());
app.use(express.static('static'));

var ContextProxy = function(req,res){
	this.req = req;
	this.res = res;
};
ContextProxy.prototype.succeed = function(data){
	this.res.status(200).send(data);
};
ContextProxy.prototype.fail = function(err){
  this.res.status(500).send(err);
};
ContextProxy.prototype.done = function(err, data){
  this.res.status(200).send(data);
};


// animation-pizza - inputs that post to terminal and Dynamo
app.post('/animationPizza', function(req, res){
  console.log("Inside DynamoDB: ")
  console.log(req.body);
  context = new ContextProxy(req, res);
  pizzaParadise(req.body, context);
});

// animation-pizza - inputs that post to terminal and Dynamo
app.post('/dropdownPizzaParadise', function(req, res){
  console.log("Inside DynamoDB: ")
  console.log(req.body);
  context = new ContextProxy(req, res);
  dropdownPizzaParadise(req.body, context);
});

app.listen(3030, function () {
  console.log('Pizza Paradise listening on port 3030!');
});
