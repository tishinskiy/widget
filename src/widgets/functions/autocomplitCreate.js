import autocompliteHeight from './autocompliteHeight'
import autocompliteFilter from './autocompliteFilter'
import findInData from './findInData'
import { _state } from "./config"

const autocomplitCreate = (obj, data) => {

	console.log('autocomplitCreate')

	const inputVal = obj.val()
	const inputName = obj.attr('name').replace("ttk__order-", "")

	const prefix = inputName == 'street' ? 'STREET_' : ''

	const distinguish = (str, val) => {
		const start = str.toLowerCase().indexOf( val.toLowerCase())
		const end = start + val.length

		const result =  str.slice(0,start) + '<b>' + str.substring(start, end) + '</b>' +  str.slice(end, str.length);
		return result
	}

	if (!data) {
		data = _state.autocomlite[inputName]
	}

	let addressAutocomplite

	if ($('#ttk__order-autocomplite__'+inputName).length) {

		addressAutocomplite = $('#ttk__order-autocomplite__'+inputName)

	} else {

		addressAutocomplite = jQuery('<div/>',{
			id: 'ttk__order-autocomplite__'+inputName,
			class: 'ttk__order-autocomplite ttk__order-autocomplite__'+inputName,
		})

		obj.after(addressAutocomplite)
	}

	if ( inputVal.length < ( !!obj.data('autocomplit') ? obj.data('autocomplit') : 1 ) ) {

		addressAutocomplite.hide()

	} else {

		addressAutocomplite.html('')

		if ( !!data ) { _state.autocomlite[inputName] = data }

		let transitional = autocompliteFilter(inputVal, !!obj.data('select') ? _state.regionsState.results : data.results)

		for ( var i = 0 ; i < transitional.length; i++ ) {

			const dataCreate = (data) => {
				const result = {}

				result['data-value'] = data.NAME

				if ('EXTERNAL_ID' in data) {
					result['data-external'] = data.EXTERNAL_ID
				}

				if ('INTERNAL_ID' in data) {
					result['data-internal'] = data.INTERNAL_ID
				}

				if ('STREET_ID' in data) {
					result['data-street'] = data.STREET_ID
				}

				if ('TC' in data) {
					if (!!data.TC) {
						console.log(data.NAME)
						console.log(data.TC)
						result['data-tc'] = JSON.stringify(data.TC)
					} else {
						result['data-tc'] = false
					}

				}

				return result
			}

			const addressAutocompliteItem = jQuery('<a/>',{
				href: 'javascript:;',
				class: `ttk__order-autocomplite-item ${transitional[i]['NAME'] == inputVal ? `ttk__order-autocomplite-item__active` : `` }`,
				html: distinguish(transitional[i]['NAME'], inputVal),
				data: dataCreate(transitional[i])
				// 'data-value': transitional[i]['NAME'],
				// 'data-external': transitional[i]['EXTERNAL_ID'],
				// 'data-internal': transitional[i]['INTERNAL_ID'],
				// 'data-street': transitional[i]['STREET_ID'],
				// 'data-tc': transitional[i]['TC'],
			})

			addressAutocomplite.append(addressAutocompliteItem)

		}

		addressAutocomplite.show()

		// autocompliteFilter( inputVal, !!obj.data('select') ? _state.regionsState.results : data.answer )

		autocompliteHeight(obj)
	}

}

export default autocomplitCreate