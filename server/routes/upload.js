const express = require('express');
const router = express.Router();

router.route('/upload').get((req,res)=>{
    res.send('good')
})

module.exports = router;