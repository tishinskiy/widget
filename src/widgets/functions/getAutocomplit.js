import { _state } from "./config"
import autocompliteHeight from './autocompliteHeight'
import sendAddress from './sendAddress'
import autocomplitCreate from './autocomplitCreate'
import findInData from './findInData'

const getAutocomplit = (obj) => {

	if ( ! ('autocomlite' in _state)) {_state.autocomlite = {}}

	const inputName = obj.attr('name').replace("ttk__order-", "")
	const inputValue = obj.val()
	const maxLength = obj.data('autocomplit') ? obj.data('autocomplit') : 1

	const getData = async ( val ) => {

		let result = await sendAddress(obj)

		return autocomplitCreate( obj, _state.autocomlite[inputName] = result )


	}

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


	if (!!obj.data('select')) {

		return autocomplitCreate( obj, _state.regionsState.regions )

	} else {

		if ( ! ( inputValue.length < ( !!obj.data('autocomplit') ? obj.data('autocomplit') : 1 ) ) ) {

			if ( "autocomlite" in _state && inputName in _state.autocomlite) {

				const inState = findInData(data, _state.autocomlite[inputName])

				if (!!inState) {

					autocomplitCreate( obj, inState )

				} else {
					getData(inputValue)

				}

			} else {

				getData(inputValue)

			}
		} else {
			obj.next('.ttk__order-autocomplite').hide()
		}


	}
}

export default getAutocomplit