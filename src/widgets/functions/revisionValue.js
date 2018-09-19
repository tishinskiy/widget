import { _state } from "./config"

const revisionValue = (val, name) => {

	console.log('revisionValue')

	const state = _state.autocomlite[name].results

	let field

	if ( name == 'city') { field = 'EXTERNAL_NAME'}
	if ( name == 'street') { field = 'STREET_NAME'}
	if ( name == 'building') { field = 'HOUSE_NUMBER'}
		

	if (!!state) {
		for (var i = 0; i < state.length; i++) {

			if(state[i][field].toLowerCase() ==  val.toLowerCase()) {

				console.log(state[i][field].toLowerCase())
				console.log(val.toLowerCase())

				return state[i]
				break
			}
		}

	} else {

		return false
	}
}

export default revisionValue