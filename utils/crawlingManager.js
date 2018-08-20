var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');


module.exports = function(url){
	var url = url;

	return new Promise(function (resolve, reject) {
		request(url, function(error, response, body){
			const $ = cheerio.load(body);
			// let keywords = $("div.PM_CL_realtimeKeyword_rolling>.ah_l>.ah_item>.ah_a");
			let keywords = $(".PM_CL_realtimeKeyword_rolling").first();

			
			console.log(keywords.length);
			resolve(keywords);
		});
	})
}