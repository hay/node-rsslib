# RSSLib - RSS Library Parser using NodeJS

This module parse content of RSS Feed and it can also obtain the html content.

## How to Install RSSLib

	npm install rsslib

## How to Use RSSLib

	There are two functions such as `getListRSS` and `getRSSContent`.

	getListRSS(url, callback)

	getRSSContent(url, content_key, removeContext, callback)

## Example

```javascript
	var lib = require('rsslib');

	// Retrieve list of RSS
	// the return result will in array which contain: title, link, description, pubDate, guid, author

	var url = 'http://rss.cnn.com/rss/edition_us.rss';
	
	lib.getListRSS(url, function(result){
		for(i=0;i<result.length;i++){
			console.log('title: ' + result[i].title);
			console.log('link: ' + result[i].link);
			console.log('description: ' + result[i].description);
			console.log('publish date: ' + result[i].pubDate);
			console.log('guid: ' + result[i].guid);
			console.log('author: ' + result[i].author);		
		}	
	});

	// Retrieve HTML content of a web page

	var urlCo = 'http://edition.cnn.com/2012/10/02/opinion/gergen-debate-stakes/index.html?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+rss%2Fedition_us+%28RSS%3A+U.S.%29';
	
	// Define which part of html that we want to obtain the content
	var contentKey = '.cnn_strycntntlft';
	
	// To remove content which don't want to be included in the result by defining the html tag, class or id
	var removeContext = ['script', 'style', '.cnnExplainer', '.cnn_html_slideshow', '.cnn_stryshrwdgtbtm'];	
	
	lib.getRSSContent(urlCo, contentKey, removeContext, function(result){
		console.dir(result);
	});
```

## Feedback

If you have any feedback, you can send an email to faris@appkitchens.com

## Others

Please visit http://www.appkitchens.com