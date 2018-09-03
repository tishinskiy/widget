var express = require('express');
var app = express();
var port = 8000

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.get('/api/jsonp', function (req, res){

	console.log(req.query);
	res.send(req.query.callback + '('+ JSON.stringify(req.query) + ');');
})

app.get('/widget/:name', function (req, res, next) {

	var options = {
		root: __dirname + '/public/widgets/',
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};

	var fileName = req.params.name + '/script.js';
	console.log(fileName);

	res.sendFile(fileName, options, function (err) {
			if (err) {
				next(err);
			} else {
				console.log('Sent:', fileName);
			}
		})
});

app.listen(port, function () {
	console.log('Example app listening on port ' + port +'!');
});