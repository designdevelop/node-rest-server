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

	let bodyParam = req.body;
	let query = 'insert into USER_TBL (userId, passwd, name, phone, email, gender, nickname, profile) value("'
	 + bodyParam.userId + '","' + bodyParam.passwd + '","' + bodyParam.name + '","' + bodyParam.phone + '","' + bodyParam.email 
	 + '","' + bodyParam.gender + '","' + bodyParam.nickname + '","' + bodyParam.profile + '")'
	
	pool.query(query, function(err, rows) {
	    if(err){ 
	    	return res.send(err);
	    }

	    response.result = bodyParam;

	    res.send(response);
	})
}

// remove
exports.remove = function(req, res){

	let response={"result" : null};

	let bodyParam = req.body;
		
	console.log(bodyParam.userId);

	// if(bodyParam == undefined)
	// 	response.error = ERROR_CODE.BODY_PARAMETER_ERROR;
	// 	res.send(response);

	// if(bodyParam.userId == undefined){
	// 	response.error = ERROR_CODE.BODY_PARAMETER_ERROR;
	// 	res.send(response);
	// }	

	let query = 'delete from USER_TBL where userId="' + bodyParam.userId +'"';
	pool.query(query, function(err, rows) {
	    if(err){ 
	    	return res.send(err);
	    }

	    response.result = "success";
		console.log(response.result);
	    res.send(response);
	})
}

//edit
exports.edit = function(req, res){

	let response = {"result" : null};

	let bodyParam = req.body;

	if(bodyParam == undefined){
		response.error = ERROR_CODE.BODY_PARAMETER_ERROR;
		res.send(response);
	}

	let query = "UPDATE USER_TBL SET phone='" + bodyParam.phone + 
				"', email='" + bodyParam.email + "', name='" + bodyParam.name + "', nickname='" + bodyParam.nickname + 
				"', gender='" + bodyParam.gender + "' WHERE userId='" + bodyParam.userId + "'";

	pool.query(query, function(err, rows){
		
		if(err){
			return res.send(err);
		}

		response.result = "success";

		res.send(response);
	})

}

// check
exports.check = function(req, res){
	let response = {"result" : null};

	let bodyParam = req.body;

	if(bodyParam == undefined){
		response.error = ERROR_CODE.BODY_PARAMETER_ERROR;
		res.send(response);
	}

	let query = "SELECT * FROM USER_TBL WHERE userId='" + bodyParam.userId + "'";

	pool.query(query, function(err, rows){
		if(err){
			return res.send(err);
		}
		if(rows.length == 0){
			response.result = "사용가능";
		}else{
			response.result = "중복";
		}	
		

		res.send(response);
	})


}

exports.login = function(req, res){
	let response = {"result" : null};
	const secret = req.app.get('jwt-secret')
	let bodyParam = req.body;

	if(typeof req.body.passwd !== "string"){
		return res.status(401).json({
			error : "LOGIN FAILED",
			code : 1
		})
	}

	let query = "SELECT * FROM USER_TBL WHERE userId='" + bodyParam.userId + "' AND passwd='" + bodyParam.passwd + "'";

	pool.query(query, function(err, rows){
		if(err){
			return res.send(err);
		}
		if(rows.length == 0){
			response.result = null;
			res.send(response);
		}else{
			

			const p = new Promise((resolve, reject) => {
                jwt.sign(
                    {
                        _id: rows[0].userId,
                        username: rows[0].name
                    }, 
                    secret, 
                    {
                        expiresIn: '7d',
                        issuer: 'designdevelop.com',
                        subject: 'userInfo'
                    }, (err, token) => {
                        if (err) reject(err)
                        resolve(token) 
                    })
            })

            p.then((token) => {
            	let resultItem = {};
            	resultItem.signature = token;
            	resultItem.userId = bodyParam.userId;
            	response.result = resultItem;

            	// response.result.userId = bodyParam.userId;
            	res.send(response);
            })

            
		}	
		

		
	}) 
}























