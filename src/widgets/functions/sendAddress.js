import { _host, _state } from "./config"

const sendAddress = async function (obj) {

	console.log('sendAddress')

	const inputName = obj.attr('name').replace("ttk__order-", "")
	const inputValue = obj.val()
	const maxLength = obj.data('autocomplit') ? obj.data('autocomplit') : 1

	if(!_state.autocomplitAnswer) {

		_state.autocomplitAnswer = {}
		_state.autocomplitAnswer[inputName] = []

	} else {

		if (!_state.autocomplitAnswer[inputName]) {

			_state.autocomplitAnswer[inputName] = {}
		}
	}

	const state = _state.autocomplitAnswer[inputName]


	if(!(inputValue.toLowerCase().substring(0, maxLength) in state)) {

		const response = await $.getJSON(`http://${ _host }/api/send_addres?callback=?`, {object: inputName, data: inputValue.toLowerCase().substring(0, maxLength)}, ( data ) => { return data })

		state[inputValue.toLowerCase().substring(0, maxLength)] = response

		return response

	} else {

		return state[inputValue.toLowerCase().substring(0, maxLength)]
	}


}

export default sendAddress