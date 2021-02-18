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

    const newCart = [];

    const cartD = req.session.cart;

    for(let i = 0;i < cartD.length;i++){
        if(parseInt(id) != cartD[i]['product_id']){
            newCart.push(cartD[i]);
        }
    }
    req.session.cart = newCart;
    console.log(newCart);
    console.log(cartD);
    res.redirect('/cart');
    
})

module.exports = router;