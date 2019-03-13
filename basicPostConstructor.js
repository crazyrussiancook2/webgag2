//const sql = require('../modules/db.js');
const builder =require('./fullPostConstructor');
function PostObj(id,image,title,description,time,user,tags,likes,usersLikes,comments) {
    this.postID =id;
    this.postImageName=image;
    this.postTitle=title;
    this.postDescription=description;
    this.postTime=time;
    this.postTags=tags;
    this.postUser=user;
    this.postNumberOfLikes=likes;
    this.postUsersLikes=usersLikes;
    this.comments=comments;
}

function CommentObj(id,content,time,user,likes,usersLikes) {
    this.commentID=id;
    this.commentContent=content;
    this.commentTime=time;
    this.commentUser=user;
    this.commentNumberOfLikes=likes;
    this.commentUsersLikes=usersLikes;
}
var queryData;
function postBuild(arrayOfPost) {
    var arrayFullPost=[];
    for (var i=0;i<arrayOfPost.length;i++){
        var postNotFull = new PostObj(arrayOfPost[i].postID,arrayOfPost[i].imageName,arrayOfPost[i].title,arrayOfPost[i].description,arrayOfPost[i].dare,arrayOfPost[i].userID);
        //console.log(postNotFull);
        arrayFullPost.push(builder(postNotFull,postNotFull.postID));
        //console.log(arrayOfPost)

    };
    // console.log(postNotFull);
}
module.exports =postBuild;
