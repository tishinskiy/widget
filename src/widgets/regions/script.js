
(function(){

	console.log('included widget region')

	// var body = document.getElementsByTagName("body")[0];
	
	var linkCss = document.createElement('link');
		linkCss.id = 'id2';
		linkCss.rel = 'stylesheet';
		linkCss.href = 'http://localhost:8000/widget/style/regions';
		document.head.appendChild(linkCss);
})()
