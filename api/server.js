const express = require('express');
const path = require('path');
const server = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const session = require('express-session');


const TWO_HOURS = 1000 * 60 * 60 * 60 * 2

const {
  SESS_LIFETIME = TWO_HOURS,
  NODE_ENV = 'development',
  SESS_NAME = 'sid',
  SESS_SECRETE = 'shubbhang.it\asecrete'
} = process.env

const IN_PROD =  NODE_ENV === 'production';

server.use(bodyParser.urlencoded({
    extended: true
  }));
  server.use(bodyParser.json());

// EXPRESS SPECIFIC STUFF
server.use('/static',express.static('static')); // serving static files
server.use(express.urlencoded());

//set the templates directory
server.set('views', path.join(__dirname, '../templates')); 

// settings to render html templates
nunjucks.configure('templates', {
  express: server,
  autoescape: true
});
server.set('view engine', 'html');

// only to check server is working or not
server.get('/trifle', (req, res) => { 
    res.status(200).json({message:"its working"})
});


server.use(session({
  name : SESS_NAME,
  resave : false,
  saveUninitialized : false,
  secret : SESS_SECRETE,
  cookie : {
      maxAge : SESS_LIFETIME,
      sameSite : true,
      secure : IN_PROD
  }
}))

server.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});



//flash messages
// server.use(require('connect-flash')());
// server.use(function (req, res, next) {
//   res.locals.messages = require('express-messages')(req, res);
//   next();
// });


const redirectlogin = (req,res,next) => {
  if (!req.session.userId) {
      res.redirect('/signin');
  }
  else{
      next();
  }
}


//routes for pages
server.use('/',require('./home')); // ./home ==> home.js
server.use('/about',require('./about'));
server.use('/contact',require('./contact'));
server.use('/shop',require('./shop'));
server.use('/cart',require('./cart'));
server.use('/signin',require('./sign_in'));
server.use('/signup',require('./sign_up'));



server.get('/logout',redirectlogin, (req,res) => {
  req.session.destroy(err => {
      if(err) {
          return res.redirect('/shop');
      }

      res.clearCookie(SESS_NAME);
      return res.redirect('/');
  });
})

module.exports = server;