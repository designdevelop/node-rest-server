const express = require('express');
var mysql      = require('mysql');
var dbconfig = require('../config/database.js');
var pool = mysql.createConnection(dbconfig);
const app = express();
const jwt = require('jsonwebtoken')

exports.grouplist = function(req, res){
	let response = {"result" : null};

	let queryParam = req.query;

	let query = `select * from BOARD_GROUP_MANAGE_TBL where userId='${queryParam.userId}'`;

	pool.query(query, function(err, rows){
		if(err){
			return res.send(err);
		}

		response.result = rows;

		res.send(response);
	})
}


// list
exports.list = function(req, res){

	let response={"result" : null};

	let queryParam = req.query;

	let query = `select * from BOARD_TBL where userId='${queryParam.userId}'`;

    pool.query(query, function(err, rows) {
    	
	    if(err){ 
	    	return res.send(err);
	    }

	    response.result = rows;
	    
	    res.send(response);
	})

}

// get one
exports.get = function(req, res){
	let response = {"result" : null};

	let queryParam = req.query;

	let sql = `select * from BOARD_TBL where userId='${queryParam.userId}' and board_seq='${queryParam.board_seq}' LIMIT 1`;

	pool.query(sql, function(err, row){
		if(err){
			return res.send(err);
		}

		if(row.length != 0){
			response.result = row[0];
		}

		res.send(response);
	});
}

// FormData DB에 저장
exports.add = function(req, res){
	
	let response = {"result" : "success"};

	let bodyParam = req.body;

	let sql = `insert into BOARD_TBL(title, content, userId) values('${bodyParam.title}', '${bodyParam.content}', '${bodyParam.userId}')`;

	if(req.file != undefined){
		// multer에서 file이 있을경우 다음과 같이 접근할 수 있다.
		console.log("image path type : ", req.file.path);
		sql = `insert into BOARD_TBL(title, content, userId, image) values('${bodyParam.title}', '${bodyParam.content}', '${bodyParam.userId}', '${req.file.path}')`;
	}

	pool.query(sql, function(err, rows){
		if(err){
			return res.send(err);
		}

		res.send(response);

	})

	

}

exports.delete = function(req, res){
	let response = {"result": "success"};
	let bodyParam = req.body;

	let sql = `delete from BOARD_TBL where board_seq='${bodyParam.board_seq}'`;

	pool.query(sql, function(err, rows){
		if(err){
			return res.send(err);
		}
		res.send(response);
	});
}












