const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
require('dotenv').config();
const { requireAuth, checkUser } = require('./routeHandler/authHandler')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');
app.get('/user/:id',(req, res) => {
  res.render('home', {user})
})
// database connection
const port = process.env.PORT || 5000;
mongoose
  .connect("mongodb+srv://bao2206:22062002giabao@giabao.qpbuzg2.mongodb.net/", {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log("Server is connected");
    });
  })
  .catch((error) => console.log("Disconnected database " + error.message));


// routes
app.get('*', checkUser)
app.get('/', requireAuth,(req, res) => res.render('home'));
app.use(authRoutes)

