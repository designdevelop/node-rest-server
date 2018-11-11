const express = require('express');
var mysql      = require('mysql');
var dbconfig = require('../config/database.js');
var pool = mysql.createConnection(dbconfig);
const app = express();
const jwt = require('jsonwebtoken')

const ERROR_CODE = require('../utils/error.js')

// list
exports.list = function(req, res){

	let response={"result" : null};

    pool.query('SELECT * from USER_TBL', function(err, rows) {

	    if(err){ 
	    	return res.send(err);
	    }

	    response.result = rows;
	    
	    res.send(response);
	})

}

// add
exports.add = function(req, res){

	let response={"result" : null};

	let crawling = require('../utils/crawlingManager');
	
	crawling("http://blog.naver.com/PostList.nhn?from=postList&blogId=designpress2016&categoryNo=12&currentPage=1").then(function (articleList) {
	  	
		// console.log(html);
		// for(let i=0; i<html.length; i++){
		// 	console.log("text : ", html[i].text());
		// }
		
	  	response.result = articleList;
		
		return res.send(response);
	});;
	

	

	// let bodyParam = req.body;
	// let query = 'insert into USER_TBL (userId, passwd, name, phone, email, gender, nickname, profile) value("'
	//  + bodyParam.userId + '","' + bodyParam.passwd + '","' + bodyParam.name + '","' + bodyParam.phone + '","' + bodyParam.email 
	//  + '","' + bodyParam.gender + '","' + bodyParam.nickname + '","' + bodyParam.profile + '")'
	
	// pool.query(query, function(err, rows) {
	//     if(err){ 
	//     	return res.send(err);
	//     }

	//     response.result = bodyParam;

	//     res.send(response);
	// })
}





















