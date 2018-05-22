var mysql 		= require('mysql');
var body 			= require('body-parser');
var req 			= require('request');
var express 	= require('express');
var app  			= express();
var server		= require('http').createServer(app);

//MySql Database Connection
var con = mysql.createConnection({
  host			: "localhost",
	user			: "root",
	password	: "",
	database	: "sample_apps"
});

con.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('You are Connected to Database!');
  }
});

module.exports = con;

//Insert Post
function insertPost(post_status){
	var query = "INSERT into post_tbl (post_status) VALUES("
    	query += "'"+post_status+"')"
  
   con.query(query, function (err, result) {
    if (err) throw err;
    // console.log("Data inserted:", post_status);
  });
};

module.exports.insertPost = insertPost;

//Delete Post
function deletePost(post_id){
	con.query("DELETE FROM post_tbl WHERE post_id =  '"+post_id+"'", function (err, result){
		if (err) throw err;
	});
}

module.exports.deletePost = deletePost;











