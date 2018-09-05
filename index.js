var express = require('express');
var app = express();
var port = 8000

app.get('/api/send_form', function (req, res){
	console.log(req.query.data);
	res.send(req.query.callback + '('+ JSON.stringify(req.query.data) + ');');
})

app.get('/api/send_addres', function (req, res){
	console.log(req.query.data);
	const data = {
		status: 1,
		total: 4,
		query: req.query.data,
		addresses: [
			{
				full: 'пр-кт Ленина, 103',
				street: 'пр-кт Ленина',
				building: '103'
			},
			{
				full: 'пр-кт Ленкина, 104',
				street: 'пр-кт Ленина',
				building: '104'
			},
			{
				full: 'пр-кт Ленкин, 105',
				street: 'пр-кт Ленина',
				building: '105'
			},
			{
				full: 'пр-кт Ленина, 175',
				street: 'пр-кт Ленина',
				building: '175'
			},
		]
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