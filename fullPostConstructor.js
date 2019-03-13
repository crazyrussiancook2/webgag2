const sql = require('./modules/db');
const Row2JSON=require('./modules/RowDataPacket2JSON');
const printer= require('./controllers/send');
const queryPostTags="select tags.contant,tags_to_post_relation.postID from tags inner JOIN tags_to_post_relation on tags.tagsID=tags_to_post_relation.tagsID where postID=?";
const queryPostNumberOfLikes="SELECT  count(likes.postID) AS NumOfLikes FROM  likes  where likes.postID=?";
const queryPostLikesUsers="SELECT likes.userID FROM likes WHERE likes.postID=?";
const queryComments="SELECT comments.* from comments WHERE postID=?";
const queryCommentsNumberOfLikes="SELECT count(comments_likes.commentID) AS CommentNumOfLikes FROM  comments_likes  where comments_likes.commentID=?";
const queryCommentsUsersLikes="SELECT comments_likes.userID FROM comments_likes WHERE comments_likes.commentID=?"
const queryPostsById="SELECT * from post where postID=?";



function CommentObj(postID,id,content,time,user,likes,usersLikes) {
    this.postID=postID;
    this.commentID=id;
    this.commentContent=content;
    this.commentTime=time;
    this.commentUser=user;
    this.commentNumberOfLikes=likes;
    this.commentUsersLikes=usersLikes;
}


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

function addingMaster(post,id,callback){
    addingTheTags(post,id, function() {
        addingUsersLikes(post, id, function() {
            addingNumberOfUsers(post, id, function() {
                addingComments(id, post, function() {
                    callback(post);
                });
            });
        })
    });
}


function addingTheTags(post,id,callback){
    sql.query(queryPostTags,[id],(err,res) => {
        var JSONtags=Row2JSON(res);
        if (err){
            throw err;
        }
        else {
            var arrayTags=[];
            if (JSONtags != undefined ){
                for (var i in JSONtags ){
                    arrayTags.push(JSONtags[i].contant)
                }
            post.postTags=arrayTags;
            callback();
        } 
    }
    })
    
};

function addingUsersLikes(post,id,callback){
    sql.query(queryPostLikesUsers,[id],(err,res) => {
        var JSONusers=Row2JSON(res);
        if (err){
            throw err;
        }
        else {
            var arrayUsers=[];
            if (JSONusers != undefined ){
                for (var i in JSONusers ){
                    arrayUsers.push(JSONusers[i].userID)
                }
                post.postUsersLikes=arrayUsers;
                callback();
            } 
        }
    })  
}

function addingNumberOfUsers(post,id,callback){
    sql.query(queryPostNumberOfLikes,[id],(err,res) => {
        var numberOfLikes=res[0].NumOfLikes;
        if (err){
            throw err;
        }
        else {
            post.postNumberOfLikes=numberOfLikes;
            
            callback();
        } 
    })
}

function addingComments(postID,post,callback){
    sql.query(queryComments,[postID],(err,res) => {
        var JSONcomments=Row2JSON(res);
        if (err){
            console.log(err);
        }
        else{
            if(JSONcomments.length > 0){
                var commentID;
                var comment;
                var i=0;
                JSONcomments.forEach(comment => { 
                    addingCommentsLikes(comment,function(){
                        addingCommentsUsersLikes(comment,function(){
                            i++;
                            if(i==JSONcomments.length){
                                post.comments=JSONcomments;
                                callback();
                            }
                        });
                    });
                });
            }
            else{
                callback();                
            }            
        }
    })
}

function addingCommentsLikes(comment,callback){
    var id=comment.commentID;
    sql.query(queryCommentsNumberOfLikes,[id],(err,res) => {
        var numberOfLikes=res[0].CommentNumOfLikes;
        if (err){
            throw err;
        }
        else {
            comment.CommentNumOfLikes=numberOfLikes;
            callback()                
        } 
    })
}

function addingCommentsUsersLikes(comment,callback){
    var id=comment.commentID;
    sql.query(queryCommentsUsersLikes,[id],(err,res) =>{
        var JSONusers=Row2JSON(res);
        if (err){
            throw err;
        }
        else {
            var arrayUsers=[];
            if (JSONusers != undefined ){
                for (var i in JSONusers ){
                    arrayUsers.push(JSONusers[i].userID)
                }
                comment.commentUsersLikes=arrayUsers;
                callback();
            } 
        }
    })
    
}


function postBuilder(arrayOfid,apiRes) {
    var arrayOfPost=[];
    var id;
    for(var i=0;i<arrayOfid.length;i++){
        id=arrayOfid[i];
        sql.query(queryPostsById,[id], function(err,res) {
            if(err){
                console.log(err);
                throw err;
            }
            else{
                var post= new PostObj(res[0].postID,res[0].imageName,res[0].title,res[0].description,res[0].date,res[0].userID);
                addingMaster(post, res[0].postID, function(readyPost) {
                    arrayOfPost.push(readyPost);
                    if(arrayOfPost.length==arrayOfid.length){
                        var result=arrayOfPost;
                        apiRes.send(result);
                    }
                })
            }
            
        })
       
    }
    
    
}

module.exports= postBuilder;