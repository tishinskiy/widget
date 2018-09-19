import { _host, _state } from "./config"
import autocompliteHeight from './autocompliteHeight'

const regionCreate = () => {

	const regionSelect = (answer) => {

		if( !('autocomlite' in _state)) {
			_state.autocomlite = {}
		}

		const obj = $('[data-select="region"]')

		if (!!answer) {

			_state.regionsState = answer

			const inputVal = obj.val()
			const inputName = obj.attr('name').replace("ttk__order-", "")
			const data = answer.results

			if (obj.attr( 'placeholder') == 'Выберите город') {

				if ('current' in answer ) {
					
					if (!!answer.current['EXTERNAL_NAME']) {

						obj.val(answer.current['EXTERNAL_NAME'])
						obj.attr( 'placeholder', answer.current['EXTERNAL_NAME'])
						obj.attr('data-verified', 1)

						_state.cityInternal = answer.current['INTERNAL_ID']
						_state.formValue['city'] = answer.current['EXTERNAL_ID']
					}

				}
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

			addressAutocomplite.hide()
			addressAutocomplite.html('')

			if ( !!answer ) { _state.autocomlite[inputName] = answer }

			for ( var i = 0 ; i < data.length; i++ ) {

				const addressAutocompliteItem = jQuery('<a/>',{
					href: 'javascript:;',
					class: `ttk__order-autocomplite-item ${data[i] == inputVal ? `ttk__order-autocomplite-item__active` : `` }`,
					html: data[i].EXTERNAL_NAME,
					'data-value':data[i].EXTERNAL_NAME,
					'data-external':data[i].EXTERNAL_ID,
					'data-internal':data[i].INTERNAL_ID,

				})

				addressAutocomplite.append(addressAutocompliteItem)

			}

		}

		obj.on('click', function() {

			$(this).next('#ttk__order-autocomplite__city').show()
			autocompliteHeight(obj)
			$(this).val('')
		})

	}

	( async () => {

		const regionsState = 'regionsState' in _state ? _state.regionsState : await $.getJSON(`${ _host }city.php?callback=?`, {}, ( data ) => { return data })
		regionSelect(regionsState)
	} )()


}

export default regionCreate