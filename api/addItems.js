const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/dbHelper');

const redirectPanel = (req,res,next) => {
    if (!req.session.adminId) {
        res.redirect('/panel');
    }
    else{
        next();
    }
}

router.get('/',redirectPanel,(req,res) => {
    console.log(req.session);
    res.status(202).render('index2.html')
})

router.post('/',redirectPanel,(req,res) => {
    const data = req.body;
    User.additems(data).then(item => {
      console.log(item);
    })
    .catch(err => {
      console.log('some wrong')
    })
    res.redirect('/additems');
  })

module.exports = router;