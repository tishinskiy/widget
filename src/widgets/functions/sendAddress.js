let response = false 

const sendAddress = (val, callback) => {

	if (!!val && val.length >= 3) {

		if (!response) {

			$.getJSON("http://10.7.0.86:8000/api/send_addres?callback=?", {data: val}, resultFunc)

			function resultFunc(data){
				response = data
				callback(response)
			}
		}
		else {
			callback(response)
		}
	}
	else {
		response = false
		callback(false)
	}
}

export default sendAddress