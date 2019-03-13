var express = require('express');
const router = express.Router();
const sql = require('../modules/db.js');


router.get('/hall_of_fame',function (err, result) {
    sql.query("SELECT post.* , count(likes.postID) AS NumOfLikes FROM post LEFT JOIN likes ON post.postID=likes.postID GROUP BY likes.postID ;",  (err,res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('post: ', res);
            result.send(res);
        }


    });

});


module.exports= router;
