const express = require('express');
const router = express.Router();
const Product = require('../models/stock');

const stockModel = require('../models/stock'); //Get db model to be able to find from



//This will need to be changed to check for whos logged in so can check what they can see
//Do this in the front end?

//Get all of the products from the DB
router.get('/products',function(req, res, next){
  stockModel.find({}, function(err, products){
    if(err){
      res.send(err);
    }
    //send a list of the products through to the front end
    res.render('productView', {productList : products});
  });
});
//
//Fine a single item, this can be used when staff click to edit the historical price
router.get('/products/:id',function(req, res, next){
    //Get their current id and compare to check who they are then call another function
    stockModel.findOne({_id: req.params.id}).then(function(product){
      res.send(product);
    });
});

//Will have to build a way to check what products have been added to send to order service

//Add another product to database
router.post('/products',function(req, res, next){
  stockModel.create(req.body).then(function(product) { //Will create a new instance then save to db
    res.send(product);
  }).catch(next);
});

//Update a product in database (use this for changing price)
router.put('/products/:id',function(req, res, next){
  stockModel.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    stockModel.findOne({_id: req.params.id}).then(function(product){
      res.send(product);
    });
  });
});

//Delete a product from database Still doesnt work well but is it needed?
router.delete('/products/:id',function(req, res, next){
  stockModel.findByIdAndRemove({_id:req.params.id}).then(function(product){
    res.send(product);
  });
  res.send({type:'DELETE'});

});

module.exports = router;
