import 'babel-polyfill';
import invertKeySimbol from '../functions/invertKeySimbol'
import selectLanguage from '../functions/selectLanguage'
import sendAddress from '../functions/sendAddress'
import addressAutocomplited from '../functions/addressAutocomplited'
import assemblingForm from '../functions/assemblingForm'

import './style.less'


(() => {
console.log('included widget order')

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
			name: 'ttk__order-phone',
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

		const orderInputStreet = jQuery('<input/>',{
			type: 'hidden',
			name: 'ttk__order-street',
			maxLength: 64,
		})

		const orderInputBuilding = jQuery('<input/>',{
			type: 'hidden',
			name: 'ttk__order-building',
			maxLength: 64,
		})

		const orderSendButton = jQuery('<button/>',{
			type: 'submit',
			name: 'ttk__order-button',
			html: 'Оформить',
		})

		parent.append(orderFormWrap.append(orderForm))

		orderForm.append(orderInputName, orderInputFamily, orderInputPhone, orderInputAddress, orderInputOfice, orderInputStreet, orderInputBuilding)

		orderForm.find('input[type="text"], input[type="phone"]').each(function(){
		})

		for (var i = orderForm.find('input[type="text"], input[type="phone"]').length - 1; i >= 0; i--) {
			const thas = orderForm.find('input[type="text"], input[type="phone"]').eq(i)
			thas.wrap(function(){
				return `<div class="ttk__input-wrap ttk__input-wrap__${thas.attr('name').replace("ttk__order-", "")}"></div>`
			})

			thas.on('input', function(){
				thas.val(invertKeySimbol(thas.val(), selectLanguage(thas.data('language'))))

				if (thas.attr('name') == 'ttk__order-address') {

					sendAddress(thas.val(), (data) => {
						addressAutocomplited(thas, data)
					})
				}
			})
		}
		orderForm.append(orderSendButton)


		$('body').on('click', '.ttk__order-autocomplite-item',function(){

			for (var i = $('.ttk__order-autocomplite-item').length - 1; i >= 0; i--) {
				if ( i != $(this).index()) {
					$('.ttk__order-autocomplite-item').eq(i).removeClass('ttk__order-autocomplite-item__active')
				}
				else {
					$('.ttk__order-autocomplite-item').eq(i).addClass('ttk__order-autocomplite-item__active')

				}
			}

			$('input[name="ttk__order-street"]').val($(this).data('street'))
			$('input[name="ttk__order-building"]').val($(this).data('building'))
			orderInputAddress.val($(this).html())
			$('#ttk__order-autocomplite').hide()

			return false

		})

		// $('body').on('click', function(e){
		// 	console.log(e.currentTarget)
		// })

		$('.ttk__input-wrap__address ').focusout(function(){
			setTimeout( () => {

				$('#ttk__order-autocomplite').hide()
			}, 100 )
		})
		$('.ttk__input-wrap__address input[type="text"]').focus(function(){
			$('#ttk__order-autocomplite').show()
		})

		orderSendButton.on('click', function(){

			console.log('orderSendButton')

			let data = assemblingForm(orderForm)

			$.getJSON("http://10.7.0.86:8000/api/send_form?callback=?", {data: data}, resultFunc)

			function resultFunc(data){
				console.log(data);
			}

			return false
		})
	});

})()