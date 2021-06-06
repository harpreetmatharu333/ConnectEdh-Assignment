
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


var conn1 = mongoose.createConnection('mongodb://localhost:27017/userDB', { useNewUrlParser: true , useUnifiedTopology: true });
var conn2 = mongoose.createConnection('mongodb://localhost:27017/productDB', { useNewUrlParser: true , useUnifiedTopology: true });


const productSchema = {
  imgUrl: String,
  name: String,
  price: Number
};

const userSchema = {
  name: String,
  username: String,
  password: String,
  dob: String,
  mobile: String,
};

const User = conn1.model('User', userSchema);
const Product = conn2.model('Product', productSchema);

app.get("/login", function(req, res) {
  res.render("login");
});

app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username: username}, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.redirect('/products');
        }
      }
    }
  });

});

app.get("/products", function(req, res) {
  Product.find(function (err, foundProducts) {
    if(!err) {
      res.render('products', {products: foundProducts});
    } else {
      res.send(err);
    }
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
