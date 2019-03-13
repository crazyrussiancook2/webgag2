const sql = require('./db.js');

var offset=0;

const imageDir = '../images/';

//construct a post object
var Post = function (post) {
  this.postID = post.id;
  this.imageName =post.imagename;
  this.decription = post.description;
  this.time = new Date();
  this.title =post.title;
  this.userID=post.userID;
};

Post.getAllPosts = function getAllPosts(result) {
    console.log("check");
    sql.query("SELECT * FROM post ORDER BY postID DESC",  (err,res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('post: ', res);
            result(null, res)
        }


    });

};

// Post.getPostsByUser = function getPostsByUser(userID,result) {
//
//     sql.query("SELECT * FROM post WHERE userID=? ORDER BY postID DESC LIMIT 20 OFFSET "+offset,[userID], function (err,res) {
//         if(err){
//             console.log(err);
//             result(null, err);
//         }
//         else {
//             console.log('post: ', res);
//             result(null, res);
//         }
//
//
//     });
//     offset+=20;
// };
module.exports = Post;