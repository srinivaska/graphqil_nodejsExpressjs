var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var mongoose = require('mongoose');
var PRODUCTS = require('./products');

// GraphQL schema
var schema = buildSchema(`
type Query {
    products(id: String): [Products]
},

type Products {
    image: String
    productName: String
    description: String
    productId: String
}
`);

// Service Mongo 
var getProductsMongo = function(args) {
  if (args.id) {
    return new Promise(function(resolve, reject) {
        var product = PRODUCTS.find({ productId:args.id}).exec();
        product.then(function(data) {
          resolve(data);
        });
      });
  } else {
    return new Promise(function(resolve, reject) {
        var product = PRODUCTS.find().exec();
        product.then(function(data) {
          resolve(data);
        });
      });
  }
  
};

var root = {
  products: getProductsMongo
};


// Create an express server and a GraphQL endpoint
var app = express();
app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

mongoose.connect(
  'mongodb://localhost:27017/WebFactory',
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log('MongoDB Connection Failure', err);
    } else {
      console.log('Successfully connected TO MongoDB');
    }
  }
);

app.listen(4000, () =>
  console.log('Express GraphQL Server Now Running On localhost:4000/graphql')
);
