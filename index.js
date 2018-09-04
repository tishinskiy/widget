var express = require('express');
var app = express();
var port = 8000

app.get('/api/jsonp', function (req, res){
	console.log(req.query);
	res.send(req.query.callback + '('+ JSON.stringify(req.query) + ');');
})

const folders = ['script', 'style']
const files = ['script.js', 'style.css']


const returnSendFile = (name, file) => {
	app.get('/widget/' + name + '/:name', function (req, res, next) {
		var options = {
			root: __dirname + '/public/widgets/',
			dotfiles: 'deny',
			headers: {
				'x-timestamp': Date.now(),
				'x-sent': true
			}
		};

		var fileName = req.params.name + '/'+ file;
		console.log(fileName);

		res.sendFile(fileName, options, function (err) {
				if (err) {
					next(err);
				} else {
					console.log('Sent:', fileName);
				}
			})
	});
}



for (var i = folders.length - 1; i >= 0; i--) {
	returnSendFile(folders[i], files[i])
}
app.listen(port, function () {
	console.log('Example app listening on port ' + port +'!');
});