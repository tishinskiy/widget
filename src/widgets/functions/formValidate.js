const formValidate = () => {
	const errArray = []

	const findInForm = $('#ttk__order-form').find('input[type="text"], input[type="phone"]')

	for (var i = 0; i < findInForm.length; i++) {

		let message = ''

		const obj = findInForm.eq(i)

		if (obj.attr('type') == "phone") {

			if ( !obj.val().length) {

				message = 'Поле "Телефон" осталось не заполненым.'
			} else {
				obj.val().indexOf("_")
				if (obj.val().indexOf("_") > -1) {
					message = 'Поле "Телефон" заполнено не полностью.'
				}
			}
		}

		if (obj.attr('type') == "text") {

			if (!obj.val().length) {

				switch (obj.attr('name')) {
					case 'ttk__order-name':
						message = 'Поле "Имя" осталось не заполненным.'
						break;
					case 'ttk__order-family':
						message = 'Поле "Фамилия" осталось не заполненным.'
						break;
					case 'ttk__order-address':
						message = 'Поле адреса осталось не заполненным.'
						break;
					default:
						break
				}
			}
		}

		if (message.length) {
			obj.addClass('ttk__input__error')
			errArray.push(message)
		} else {
			obj.removeClass('ttk__input__error')
		}
	}

	if (errArray.length) {
		return errArray
	} else {
		return false
	}
}

export default formValidate