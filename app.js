
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });


const userSchema = {
  name: String,
  username: String,
  password: String,
  dob: String,
  mobile: String,
};



const User = new mongoose.model("User", userSchema);



app.get("/login", function(req, res) {
  res.render("login");
});


app.get("/products", function(req, res){
  res.render("products")
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
          res.render("products");
        }
      }
    }
  });

});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
