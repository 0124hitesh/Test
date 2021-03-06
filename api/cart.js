const express = require('express');

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

router.get('/',redirectlogin,(req,res) => {
    const id = req.session.userId;

    User.findByid(id).then(authUser => {
        const user = {id : authUser.id, name : authUser.first_name +' '+ authUser.last_name, email : authUser.email};
        const cartD = req.session.cart;
        
      
        console.log(user['name']);
        console.log("cartD--",cartD);
        
        res.status(200).render('cart.html',{user,cartD});
    })
    .catch(error => {
        res.status(500).send('something get wrong');
    })
    
    
})

module.exports = router;