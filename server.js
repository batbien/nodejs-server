'use strict'
const util = require('util');
const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

var app = express();
app.set('view engine', hbs);

// Middlewares
app.use((req, res, next) => {
  // console.log(util.inspect(req.headers, {colors: true, depth:2}));
  let log = new Date().toString() + ": " + req.method + " " + req.url + " " + req.get("user-agent") + '\n';
  fs.appendFile('log.txt', log, err => {
    if (err)
      console.log("Cannot log req. Err: ", err.message);
  });
  console.log(log);
  next();
})

/*
app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: "MAINTENANCE"
  });
});
*/

app.use(express.static(__dirname + "/public"));

// hbs stuffs
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('repeat', (text) => {
  var str = "";
  for (let i = 0; i < 3; i++)
    str += text + '<br>'; // html code will be escaped by express !!!
  return str.slice(0, str.length - 4);
})

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: "Homepage"
  })
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: "About"
  });
});

app.get('/help', (req, res) => {
  res.render('help.hbs', {
    pageTitle: "Help"
  })
})
app.listen(3333, () => {

  console.log("Server up on port 3333");
});
