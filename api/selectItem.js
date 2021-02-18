const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/dbHelper');

const redirectlogin = (req,res,next) => {
    if (!req.session.userId) {
        res.redirect('/signin');
    }
    else{
        next();
    }
}

router.get('/:id',redirectlogin,(req,res) => {
    const {id} = req.params;

    User.finditemByid(id).then(item => {
        console.log(">>>>",item);

        req.session.cart.push(item);

        console.log(">>",req.session.cart);
        res.status(200).redirect('/');
      })
      .catch(err => {
        console.log('some wrong!');
      })

    
})

module.exports = router;