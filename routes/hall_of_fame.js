var express = require('express');
const router = express.Router();
const builder =require('../fullPostConstructor');
const sql = require('../modules/db.js');
const queryHallOfFame= "SELECT post.* , count(likes.postID) AS NumOfLikes FROM post LEFT JOIN likes ON post.postID=likes.postID GROUP BY likes.postID ORDER BY NumOfLikes desc;";


router.get('/hall_of_fame',function (error, result) {
    sql.query(queryHallOfFame, (err,posts) => {
        if (err) {
            console.log(err);
            throw err;
        } 
        else {
            var arrayOfPostID=[];
            for(var i=0;i<posts.length;i++){
                arrayOfPostID.push(posts[i].postID);
            }
            builder(arrayOfPostID,result);
        }
    });
});

module.exports= router;
