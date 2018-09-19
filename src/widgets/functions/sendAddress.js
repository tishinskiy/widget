import { _host, _state } from "./config"
import findInData from './findInData'

const sendAddress = async function (obj) {
	try {

	console.log('sendAddress')

	const inputName = obj.attr('name').replace("ttk__order-", "")
	const inputValue = obj.val()
	const maxLength = obj.data('autocomplit') ? obj.data('autocomplit') : 1

	if(!_state.autocomplitAnswer) {

		_state.autocomplitAnswer = {}
		_state.autocomplitAnswer[inputName] = []

	} else {

		if (!_state.autocomplitAnswer[inputName]) {

			_state.autocomplitAnswer[inputName] = []
		}
	}

	const state = _state.autocomplitAnswer[inputName]

	let data

	if (inputName == 'street') {
		data = {
			city: _state.cityInternal, 
			search: inputValue.toLowerCase().substring(0, maxLength)
		}
	}

	if (inputName == 'building') {
		data = {
			street: _state.formValue.street
		}
	}

	const inState = findInData(data, state)

	if(!inState) {


		let response = await $.getJSON(`${ _host + inputName.replace("ttk__order-", "")}.php?callback=?`, data, ( data ) => { return data })

		if (!!response == false) {
			response = {
				results: []
			}
		}

		for (let k in data) {
			console.log(k)
			response[k] = data[k]
			k++
		}

		state.push(response)
		return response

	} else {

		return inState
	}


	} catch (error) {

		throw new Error('Не удалось соедениться с сервером')
	}


}

export default sendAddress