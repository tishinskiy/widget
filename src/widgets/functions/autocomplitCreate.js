import autocompliteHeight from './autocompliteHeight'
import autocompliteFilter from './autocompliteFilter'
import { _state } from "./config"

const autocomplitCreate = (obj, data) => {

	console.log('autocomplitCreate')

	const input_val = obj.val()
	const input_name = obj.attr('name').replace("ttk__order-", "")

	const distinguish = (str, val) => {
		const start = str.toLowerCase().indexOf( val.toLowerCase())
		const end = start + val.length

		const result =  str.slice(0,start) + '<b>' + str.substring(start, end) + '</b>' +  str.slice(end, str.length);
		return result
	}

	if (!data) {
		data = _state.autocomlite[input_name]
	}

	let addressAutocomplite

	if ($('#ttk__order-autocomplite__'+input_name).length) {

		addressAutocomplite = $('#ttk__order-autocomplite__'+input_name)

	} else {

		addressAutocomplite = jQuery('<div/>',{
			id: 'ttk__order-autocomplite__'+input_name,
			class: 'ttk__order-autocomplite ttk__order-autocomplite__'+input_name,
		})

		obj.after(addressAutocomplite)
	}

	if ( input_val.length < ( !!obj.data('autocomplit') ? obj.data('autocomplit') : 1 ) ) {

		addressAutocomplite.hide()

	} else {

		addressAutocomplite.html('')

		if (!!data) { _state.autocomlite = data }

		let transitional = autocompliteFilter(input_val, !!obj.data('select') ? _state.regionsState.regions : data.answer)

		for ( var i = 0 ; i < transitional.length; i++ ) {

			const addressAutocompliteItem = jQuery('<a/>',{
				href: 'javascript:;',
				class: `ttk__order-autocomplite-item ${transitional[i] == input_val ? `ttk__order-autocomplite-item__active` : `` }`,
				html: distinguish(transitional[i], input_val),
				'data-value': transitional[i]
			})

			addressAutocomplite.append(addressAutocompliteItem)

		}

		addressAutocomplite.show()

		autocompliteFilter( input_val, !!obj.data('select') ? _state.regionsState.regions : data.answer )

		autocompliteHeight(obj)
	}

}

export default autocomplitCreate