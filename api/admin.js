const express = require('express');

const router = express.Router();

const User = require('../models/dbHelper');

const bcrypt = require('bcrypt');

router.get('/',(req,res) => {
    res.status(200).render('admin_panel.html')
});

router.post('/',(req,res) => {
    const user = req.body;
    console.log(user['email'])
    User.findadminByemail(user['email']).then(authUser => {
        if(authUser && authUser['password'] === user['password']){
            req.session.adminId = authUser.id;

            return res.status(200).redirect('/additems');
        }
        else{
            console.log("not found");
            res.status(303).send("Not found");
        }
    })
    .catch(error => {
        console.log(error);
        res.status(404).send("nothing");
    })
})

module.exports = router;