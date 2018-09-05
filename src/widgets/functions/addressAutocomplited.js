let query = null

const addressAutocomplited = (obj, data) => {


	// console.log("query = " + query)

	if (obj.val().length >= 3) {

		if (obj.val().length < 4) {

			let addressAutocomplite

			if (!!$('#ttk__order-autocomplite').length) {
				addressAutocomplite = $('#ttk__order-autocomplite')
				// addressAutocomplite.show()
			}

			else {
				addressAutocomplite = jQuery('<div/>',{
					id: 'ttk__order-autocomplite',
					class: 'ttk__order-autocomplite'
				})
				obj.after(addressAutocomplite)
			}

			if (query != data.query) {
				addressAutocomplite.html('')

				if (!!data) {

					for (var i = 0 ; i < data.addresses.length; i++) {

						const addressAutocompliteItem = jQuery('<a/>',{
							href: 'javascript:;',
							html: data.addresses[i].full,
							class: 'ttk__order-autocomplite-item',
							"data-street": data.addresses[i].street,
							"data-building": data.addresses[i].building,
						})


						addressAutocomplite.append(addressAutocompliteItem)

					}
				}

				query = data.query
			}
		}



		$('#ttk__order-autocomplite').show()

		for (var i = $('.ttk__order-autocomplite-item').length - 1; i >= 0; i--) {

			let item = $('.ttk__order-autocomplite-item').eq(i)

			if (item.html().toLowerCase().indexOf(obj.val().toLowerCase()) != -1) {
				item.show()
			}
			else {
				item.hide()
			}
		}

		if (!$('.ttk__order-autocomplite-item:visible').lengt) {
			$('input[name="ttk__order-street"]').val('')
			$('input[name="ttk__order-building"]').val('')
		}
	}

	else {
		$('#ttk__order-autocomplite').hide()
	}


}

export default addressAutocomplited