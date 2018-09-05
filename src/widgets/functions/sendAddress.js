import { _host } from "../functions/config"
let response = false 

const sendAddress = async (val, callback) => {

	if (!!val && val.length >= 3) {

		if (!response) {

			$.getJSON(`http://${ _host }/api/send_addres?callback=?`, {data: val}, resultFunc)

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