var express = require('express');
var app = express();
var port = 8000
var _data = require('./src/controllers/addresses');

app.get('/api/regions', function (req, res){
	console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress)
	console.log(req.query.data);
	let data = {
		curentRegion: 'Новосибирск',
		regions: _data.city
	}
	res.send(req.query.callback + '('+ JSON.stringify(data) + ')');
})
app.get('/api/send_form', function (req, res){
	console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress)
	// console.log(req.headers['x-forwarded-for'])
	// console.log(req.connection.remoteAddress)
	console.log(req.query.data);
	res.send(req.query.callback + '('+ JSON.stringify('hello form') + ')');
})

app.get('/api/send_addres', function (req, res){
	console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress)
	console.log(req.query.object + ' -> ' + req.query.data);
	const data = {
		status: 1,
		total: 4,
		query: req.query.data,
		answer: req.query.object == 'city' ? _data[req.query.object] : _data[req.query.object].filter(function(item){
			return item.toLowerCase().indexOf(req.query.data.toLowerCase()) != -1
		})
	}
	res.send(req.query.callback + '('+ JSON.stringify(data) + ');');
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