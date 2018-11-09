var express 						= require('express');
var app									= express();
var server							= require('http').createServer(app);
var io 									= require('socket.io').listen(server);
const con								= require('./model_function');
var mysql 							= require('mysql');

connections 						= [];
// con.selectPost();
// con.selectPost();

server.listen(process.env.PORT || 8080);
	console.log('Server is ruunning....');

app.get('/newsfeed', function(req, res){
		res.sendFile(__dirname + '/views/newsfeed.html');
});

io.sockets.on('connection', function(socket){
	connections.push(socket);
	console.log("Connected: %s sockets connected", connections.length);
 	selectPost();
	
	socket.on('disconnect',function(data){
		connections.splice(connections.indexOf(socket), 1);
			console.log('Disconnected: %s sockets connected', connections.length);

	});

	socket.on("insert post", function(post_status){
			con.insertPost(post_status);
			selectPost();
	});

	socket.on("delete post", function(post_id){
			con.deletePost(post_id);
			selectPost();
	});

	function selectPost(){
		con.query("SELECT * FROM post_tbl ORDER BY post_id DESC", function(err, result, rows){
      if(err) throw err;
      io.sockets.emit('show status', result);
    });
  }
});



