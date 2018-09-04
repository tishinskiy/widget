import invertKeySimbol from '../functions/invertKeySimbol'
import selectLanguage from '../functions/selectLanguage'


(() => {
console.log('included widget order')
	const linkCss = document.createElement('link');
		linkCss.rel = 'stylesheet';
		linkCss.href = 'http://localhost:8000/widget/style/order';
		document.head.appendChild(linkCss);

	document.addEventListener("DOMContentLoaded", function() {

		const parent = $('#ttk__widget-order')
		parent.html('')

		const orderFormWrap = jQuery('<div/>',{
			id: 'ttk__order-form--wrap',
			class: 'ttk__order-form--wrap'
		})

		const orderForm = jQuery('<form/>',{
			id: 'ttk__order-form',
			class: 'ttk__order-form'
		})

		const orderInputName = jQuery('<input/>',{
			type: 'text',
			name: 'ttk__order-name',
			placeholder: 'Имя',
			maxLength: 64,
			"data-language": "ru",
		})

		const orderInputFamily = jQuery('<input/>',{
			type: 'text',
			name: 'ttk__order-family',
			placeholder: 'Фамилия',
			maxLength: 64,
			"data-language": "ru",
		})

		const orderInputPhone = jQuery('<input/>',{
			type: 'phone',
			name: 'ttk__order-name',
			placeholder: 'Телефон',
			maxLength: 64,
			"data-language": "ru",
		})

		const orderInputAddress = jQuery('<input/>',{
			type: 'text',
			name: 'ttk__order-address',
			placeholder: 'Улица, дом',
			maxLength: 128,
			"data-language": "ru",
		})

		const orderInputOfice = jQuery('<input/>',{
			type: 'text',
			name: 'ttk__order-ofice',
			placeholder: 'Кв.',
			maxLength: 8,
			"data-language": "ru",
		})

		const orderSendButton = jQuery('<button/>',{
			type: 'submit',
			name: 'ttk__order-button',
			html: 'Оформить',
		})

		parent.append(orderFormWrap.append(orderForm))

		orderForm.append(orderInputName, orderInputFamily, orderInputPhone, orderInputAddress, orderInputOfice)

		orderForm.find('input[type="text"], input[type="phone"]').each(function(){
		})

		for (var i = orderForm.find('input[type="text"], input[type="phone"]').length - 1; i >= 0; i--) {
			const thas = orderForm.find('input[type="text"], input[type="phone"]').eq(i)
			thas.wrap(function(){
				return `<div class="ttk__input-wrap ttk__input-wrap__${thas.attr('name').replace("ttk__order-", "")}"></div>`
			})

			thas.on('input', function(){
				thas.val(invertKeySimbol(thas.val(),  selectLanguage(thas.data('language'))))
			})
		}
		orderForm.append(orderSendButton)
	});

})()