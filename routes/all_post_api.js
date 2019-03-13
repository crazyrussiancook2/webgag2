var express = require('express');
const router = express.Router();
const builder =require('../fullPostConstructor');
const sql = require('../modules/db.js');
const queryAllPost="SELECT * FROM post ORDER BY postID desc";


router.get('/all',function (err, result) {
    sql.query(queryAllPost,  (err,allpost) => {
        if (err) {
            console.log(err);
            throw err;
        } 
        else {
            var arrayOfPostID=[];
            for(var i=0;i<allpost.length;i++){
                arrayOfPostID.push(allpost[i].postID);
            }
            builder(arrayOfPostID,result);
        }
    });
});

module.exports= router;
