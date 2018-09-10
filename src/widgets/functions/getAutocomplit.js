import { _state } from "./config"
import autocompliteHeight from './autocompliteHeight'
import sendAddress from './sendAddress'
import autocomplitCreate from './autocomplitCreate'

const getAutocomplit = (obj) => {

	if ( ! ('autocomlite' in _state)) {_state.autocomlite = {}}

	const input_name = obj.attr('name').replace("ttk__order-", "")
	const input_val = obj.val()

	const getData = async ( val ) => {

		let result = await sendAddress(obj)

		return autocomplitCreate( obj, _state.autocomlite[input_name] = result )

	}

	console.log(obj.data('select'))

	if (!!obj.data('select')) {

		return autocomplitCreate( obj, _state.regionsState.regions )

	} else {

		if ( ! ( input_val.length < ( !!obj.data('autocomplit') ? obj.data('autocomplit') : 1 ) ) ) {

			if ( "autocomlite" in _state && input_name in _state.autocomlite) {

				if ( _state.autocomlite[ input_name ].query == input_val
					|| input_val.toLowerCase().indexOf(_state.autocomlite[ input_name ].query.toLowerCase() ) != -1) {

					autocomplitCreate( obj, _state.autocomlite[ input_name ] )

				} else {
					getData(input_val)

				}

			} else {

				getData(input_val)

			}

		}
	}


}

export default getAutocomplit