$('#widget').append(`

		<input type="text">
		<button type="submit">go</button>
	`)

$('body').on('click', '#widget button', function(){
	var data  = $('#widget input').val()

	// $.ajax({
	// 	url: "localhost:8000/api" + '/jsonp?callback=?',
	// 	dataType: 'jsonp',
	// 	     success:function(json){
	// 	         // обработка json
	// 	         alert("Success");
	// 	     },
	// 	     error:function(){
	// 	         alert("Error");
	// 	     }

	// });

	$.getJSON("http://localhost:8000/api/jsonp?callback=?", {data: data}, print_func)

	function print_func(data){
		console.log(data);
	}

	return false
})