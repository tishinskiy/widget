const autocompliteHeight = (obj) => {

	if (obj.next('.ttk__order-autocomplite:visible').length) {

		const block = obj.next('.ttk__order-autocomplite:visible')
		
		let height = $(window).height() - block.offset().top + $(window).scrollTop() - 50

		block.height("auto").removeClass('ttk__order-autocomplite__limitted')

		if ( block.innerHeight() > height) {
			block.height(height).addClass('ttk__order-autocomplite__limitted')
		}
	}

}

export default autocompliteHeight