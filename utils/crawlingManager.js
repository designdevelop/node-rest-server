var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');
let Crawler = require("crawler");


module.exports = function(url){

	return new Promise(function(resolve, reject){
		let c = new Crawler({
			maxConnection : 10,
			callback : function(error, res, done){
				if(error){
					console.log(error);
				}else{
					// console.log('Grabbed', res.body.length, 'bytes');
					let $ = res.$;
					let bfHtml = $('.select_date').html();
					console.log("html : ", bfHtml);
				}
				done();
			}
		})
	
		c.queue([{
			uri: url,
			jQuery: 'cheerio',
		 
			// The global callback won't be called
			callback: function (error, res, done) {
				if(error){
					console.log(error);
				}else{
					let $ = res.$;
					let articleList = [];
					
					let $listBox = $('#postListBody .thumblist>li');

					$listBox.each(function(){
						let article = {
							"title" : $(this).find(".area_text>.title").text(),
							"date" : $(this).find(".area_text>.date").text()
						};

						articleList.push(article);
					})
					
					resolve(articleList);
				}
				done();
			}
		}]);
	})
	
	



	// console.log("aa");

	// return new Promise(function (resolve, reject) {
	// 	request(url, {timeout: 10000}, function(error, response, body){
	// 		const $ = cheerio.load(body);
	// 		console.log("bb");
	// 		let bfHtml = $('.PM_CL_realtimeKeyword_rolling').html();
	// 		console.log("body : ", $.html());
			
	// 		let keywords = $(".PM_CL_realtimeKeyword_rolling").first();

	// 		resolve(keywords);
	// 	});
	// })
}