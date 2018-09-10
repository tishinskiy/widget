import { _host, _state } from "./config"
import autocompliteHeight from './autocompliteHeight'

const regionCreate = () => {

	const regionSelect = (answer) => {

		const obj = $('[data-select="region"]')

		if (!!answer) {

			_state.regionsState = answer

			const input_val = obj.val()
			const input_name = obj.attr('name').replace("ttk__order-", "")
			const data = answer.regions

			if (obj.attr( 'placeholder') == 'Выберите город') {

				obj.val(answer.curentRegion)
				obj.attr( 'placeholder',answer.curentRegion)
				
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

			addressAutocomplite.hide()
			addressAutocomplite.html('')

			for ( var i = 0 ; i < data.length; i++ ) {

				const addressAutocompliteItem = jQuery('<a/>',{
					href: 'javascript:;',
					class: `ttk__order-autocomplite-item ${data[i] == input_val ? `ttk__order-autocomplite-item__active` : `` }`,
					html: data[i],
					'data-value': data[i]
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

		const regionsState = 'regionsState' in _state ? _state.regionsState : await $.getJSON(`http://${ _host }/api/regions?callback=?`, {}, ( data ) => { return data })

		regionSelect(regionsState)
	} )()


}

export default regionCreate