import 'babel-polyfill';

import { _host } from "../functions/config"

import invertKeySimbol from '../functions/invertKeySimbol'
import selectLanguage from '../functions/selectLanguage'
import autocomplitCreate from '../functions/autocomplitCreate'
import getAutocomplit from '../functions/getAutocomplit'
import assemblingForm from '../functions/assemblingForm'
import formValidate from '../functions/formValidate'
import regionCreate from '../functions/regionCreate'
import selectAutocomplite from '../functions/selectAutocomplite'
import Inputmask from "inputmask";

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
			"data-label": "Имя",
			// placeholder: 'Имя',
			maxLength: 64,
			"data-language": "ru",
		})

		const orderInputFamily = jQuery('<input/>',{
			type: 'text',
			name: 'ttk__order-family',
			"data-label": "Фамилия",
			// placeholder: 'Фамилия',
			maxLength: 64,
			"data-language": "ru",
		})

		const orderInputPhone = jQuery('<input/>',{
			type: 'phone',
			name: 'ttk__order-phone',
			"data-label": "Телефон",
			// placeholder: 'Телефон',
			maxLength: 64,
			"data-language": "ru",
		})

		// const orderInputAddress = jQuery('<input/>',{
		// 	type: 'text',
		// 	name: 'ttk__order-address',
			// placeholder: 'Улица, дом',
		// 	maxLength: 128,
		// 	"data-language": "ru",
		// 	"data-autocomplit": 3,
		// })

		const orderInputOfice = jQuery('<input/>',{
			type: 'text',
			name: 'ttk__order-ofice',
			"data-label": "Кв.",
			// placeholder: 'Кв.',
			maxLength: 8,
			"data-language": "ru",
		})

		const orderInputStreet = jQuery('<input/>',{
			type: 'text',
			name: 'ttk__order-street',
			"data-label": "Улица",
			// placeholder: 'Улица',
			maxLength: 64,
			"data-language": "ru",
			"data-autocomplit": 3,
		})

		const orderInputCity = jQuery('<input/>',{
			type: 'text',
			name: 'ttk__order-city',
			"data-label": "Город",
			placeholder: 'Выберите город',
			maxLength: 64,
			"data-language": "ru",
			"data-autocomplit": true,
			"data-select": "region",
		})

		const orderInputBuilding = jQuery('<input/>',{
			type: 'text',
			name: 'ttk__order-building',
			"data-label": "Дом",
			// placeholder: 'Дом',
			maxLength: 64,
			"data-language": "ru",
			"data-autocomplit": 1,
		})

		const orderSendButton = jQuery('<button/>',{
			type: 'submit',
			name: 'ttk__order-button',
			html: 'Оформить',
		})

		parent.append(orderFormWrap.append(orderForm))

		orderForm.append(...[
			orderInputCity,
			orderInputStreet,
			orderInputBuilding,
			orderInputOfice,
			orderInputName,
			orderInputFamily,
			orderInputPhone,
			// orderInputAddress,
			orderSendButton
		])

		const findInForm = orderForm.find('input[type="text"], input[type="phone"], button[type="submit"]')

		for (var i = findInForm.length - 1; i >= 0; i--) {

			const thas = findInForm.eq(i)

			thas.wrap(() => {
				return `<div class="ttk__input-wrap ttk__input-wrap__${thas.attr('name').replace("ttk__order-", "")}${!!thas.data('select') ? ' ttk__select-wrap' : ''}"></div>`
			})

			if (!!thas.data('label')) {
				thas.before(`<label>${thas.data('label')}<label>`)
			}


			if (thas.attr('type') == 'text' || thas.attr('type') == 'phone') {

				thas.on('input', () => {
					thas.removeClass('ttk__input__error')
				})
			}

			if (thas.attr('type') == 'text') {

				thas.on('input', () => {

					thas.val(invertKeySimbol(thas.val(), selectLanguage(thas.data('language'))))

					if (thas.data('autocomplit')) {

						getAutocomplit(thas)

					}

				})
			}

			if (thas.attr('type') == 'phone') {

				var im = new Inputmask("+7 (999) 999-99-99");
				im.mask(thas);
			}

		}


		$('body').on('click', '.ttk__order-autocomplite-item',function(){

			const block = $(this).closest('.ttk__order-autocomplite')

			const item = block.find('.ttk__order-autocomplite-item')

			for (var i = item.length - 1; i >= 0; i--) {

				if ( i != $(this).index()) {
					item.eq(i).removeClass('ttk__order-autocomplite-item__active')
				}
				else {

					item.eq(i).addClass('ttk__order-autocomplite-item__active')
				}
			}

			let input = block.prev('input')

			block.prev('input')
				.val($(this).data('value'))

				if (block.prev('input').data('select') == 'region') {
					
					orderInputCity.attr('placeholder', ($(this).data('value')))

					orderInputStreet.val('')
					orderInputBuilding.val('')
					orderInputOfice.val('')
				}

			block.height()

			return false

		})

		$(document).mouseup(function (e){
			$('input[data-autocomplit]').each(function(){

				const div = $(this).closest('div')
				if (!div.is(e.target) && div.has(e.target).length == 0) {

					div.find('[id *= "ttk__order-autocomplite__"]:visible').slideUp('fast');
				}
			})

			$('input[data-select]').each(function(){

				const div = $(this).closest('div')
				if (!div.is(e.target) && div.has(e.target).length == 0) {

					if ($(this).val() == '' ) {
						$(this).val($(this).attr('placeholder'))
					}
				}
			})
		});

		$('input[data-autocomplit]:not([data-select])').on('click', function(){

			$(this).each(function(){
				getAutocomplit ($(this), false)
			})

		})

		$('input[data-select="region"]').on('click', function(){
			regionCreate()
		})

		$('input[type="text"]:not([data-select]), input[type="phone"]')
			.on('focus', function(){
				$(this).prev('label').addClass('ttk__order-input__focused')
			})

			.on('focusout', function() {
				if ($(this).val() == '') {
					$(this).prev('label').removeClass('ttk__order-input__focused')
				}
			})

		orderSendButton.on('click', function(){

			const orderComplit = (data)=> {
				console.log(data)
			}

			async function sendForm() {

				let result = await $.getJSON(`http://${ _host }/api/send_form?callback=?`, {data: assemblingForm(orderForm)}, (data) => { return data})

				return result

			}

			const result = formValidate()

			if (!result) {

				( async () => {

					let answer = await sendForm()

					if (!answer) {
						console.error(answer)
					} else {
						console.log(answer)
					}

				} )()

			} else {
				console.log(result)
			}

			return false
		})

		regionCreate()


	});

})()