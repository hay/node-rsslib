/**********************************************************************
 RSSLib - a RSS parser for node.
 http://github.com/farishjazz/node-rsslib

 Copyright (c) 2012 Faris
 http://faris.appkitchens.com
 
 RSSLib is released under the MIT license
  - see LICENSE for more info
**********************************************************************/

var request = require('request');
var cheerio = require('cheerio');
var Encoder = require('./encoder').Encoder;

module.exports = {
	getRSSList: getRSSList,
	getRSSContent: getRSSContent
};

function getRSSList(url, cb){
	var finalURL = decodeURIComponent(url);
	
	request(finalURL, function(err, data){
		if (err) {
			console.error(data);
			cb(err);
			return;
		}

		var result = [];
		var $ = cheerio.load(data.body);

		$('item').each(function(i) {
			result.push({
				title: _decode($(this).find('title').text()),
				link: $(this).find('link')[0].next.data || _decode($(this).find('guid').text()),
				description: _decode($(this).find('description').text()),
				pubDate: _decode($(this).find('pubDate').text()),
				guid: _decode($(this).find('guid').text()),
				author: _decode($(this).find('author').text())
			});
		});

		cb(result);
	});
}

function getRSSContent(url, key, removeContext, cb){
	var finalURL = decodeURIComponent(url);	

	var text = [];
	var textLength = 0;

	request(finalURL, function(err, data){
		if (err) {
			console.error(data);
			cb(err);
			return;
		}

		var result = [];
		var $ = cheerio.load(data.body);		

		removeContext.forEach(function(key) {
            $(key).each(function(i) {
                $(this).remove();
            });
        });

		$($(key)[0]).children().each(function(i){
			console.log($(this).text());
		});
	});
}

function _decode(str) {
	return Encoder.htmlDecode(str).replace(/\s*\<.*?\>\s*/g, '');
}