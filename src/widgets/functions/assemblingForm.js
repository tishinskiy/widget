const assemblingForm = (form) => {

	const result = {}

	form.find('input[type="text"], input[type="phone"], input[type="hidden"]').each(function(){
		$(this).attr('name')
		result[$(this).attr('name').replace("ttk__order-", "")] = $(this).val()
	})
	return result
}

export default assemblingForm