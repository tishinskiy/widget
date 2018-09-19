import 'babel-polyfill';

import { _host, _state } from "../functions/config"

import invertKeySimbol from '../functions/invertKeySimbol'
import selectLanguage from '../functions/selectLanguage'
import autocomplitCreate from '../functions/autocomplitCreate'
import getAutocomplit from '../functions/getAutocomplit'
import assemblingForm from '../functions/assemblingForm'
import formValidate from '../functions/formValidate'
import regionCreate from '../functions/regionCreate'
// import selectAutocomplite from '../functions/selectAutocomplite'
import revisionOne from '../functions/revisionOne'
import Inputmask from "inputmask";

import './style.less'


(() => {
console.log('included widget order')

	document.addEventListener("DOMContentLoaded", function() {

		revisionOne()

		const parent = $('#ttk__widget-order')
		parent.html('')

		const orderFormWrap = jQuery('<div/>',{
			id: 'ttk__order-form--wrap',
			class: 'ttk__order-form--wrap',
			"autocomplete": "off"
		})

		const orderForm = jQuery('<div/>',{
			id: 'ttk__order-form',
			class: 'ttk__order-form',
		})

		const orderInputName = jQuery('<input/>',{
			type: 'text',
			name: 'ttk__order-name',
			"data-label": "Имя",
			// placeholder: 'Имя',
			maxLength: 64,
			"data-language": "ru",
			"autocomplete": "off"
		})

		const orderInputFamily = jQuery('<input/>',{
			type: 'text',
			name: 'ttk__order-family',
			"data-label": "Фамилия",
			// placeholder: 'Фамилия',
			maxLength: 64,
			"data-language": "ru",
			"autocomplete": "off"
		})

		const orderInputPhone = jQuery('<input/>',{
			type: 'text',
			name: 'ttk__order-phone',
			"data-label": "Телефон",
			// placeholder: 'Телефон',
			maxLength: 64,
			"data-language": "ru",
			"autocomplete": "off"
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
			"data-label": "Квартира",
			// placeholder: 'Кв.',
			maxLength: 8,
			"data-language": "ru",
			"autocomplete": "off",
			"disabled": true
		})

		const orderInputStreet = jQuery('<input/>',{
			type: 'text',
			name: 'ttk__order-street',
			"data-label": "Улица",
			// placeholder: 'Улица',
			maxLength: 64,
			"data-language": "ru",
			"data-autocomplit": 3,
			"autocomplete": "off"
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
			"autocomplete": "off"
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

		const stepOneWrap = jQuery('<div/>',{
			id: "ttk__order-step__one",
			class: "ttk__order-step ttk__order-step__one"
		})

		const stepTwoWrap = jQuery('<div/>',{
			id: "ttk__order-step__two",
			class: "ttk__order-step ttk__order-step__two"
		})

		parent.append(orderFormWrap.append(orderForm))

		orderForm.append( stepOneWrap.append(
				
				orderInputCity,
				orderInputStreet,
				orderInputBuilding,
				orderInputOfice,
			), 
			stepTwoWrap.append(
				orderInputName,
				orderInputFamily,
				orderInputPhone,
				orderSendButton
			)
		)

		// revisionOne([
		// 	$('input[name="ttk__order-city"]'), 
		// 	$('input[name="ttk__order-street"]'), 
		// 	$('input[name="ttk__order-building"]'), 
		// 	$('input[name="ttk__order-ofice"]')
		// ])

		$('input[name="ttk__order-city"]').revisionItem([], [$('input[name="ttk__order-street"]'), $('input[name="ttk__order-building"]')])
		$('input[name="ttk__order-street"]').revisionItem([$('input[name="ttk__order-city"]'),], [ $('input[name="ttk__order-building"]')])
		$('input[name="ttk__order-building"]').revisionItem([$('input[name="ttk__order-street"]'), $('input[name="ttk__order-city"]')], [])

		if (!('formValue' in state)) {
			state.formValue = []
		}

		const findInForm = orderForm.find('input[type="text"], input[type="number"], button[type="submit"]')

		for (var i = findInForm.length - 1; i >= 0; i--) {

			const thas = findInForm.eq(i)

			thas.wrap(() => {
				return `<div class="ttk__input-wrap ttk__input-wrap__${thas.attr('name').replace("ttk__order-", "")}${!!thas.data('select') ? ' ttk__select-wrap' : ''}"></div>`
			})

			if (!!thas.data('label')) {
				thas.before(`<label>${thas.data('label')}<label>`)
			}

			thas.attr('tabindex', i + 1)


			if (thas.attr('type') == 'text' || thas.attr('type') == 'phone') {

				thas.on('input', () => {
					thas.removeClass('ttk__input__error')
					thas.val(thas.val().replace(/^\s+/g, '').replace(/ {1,}/g," "))
				})

				thas.on('keydown' , (e) => {

					if (e.keyCode == 9 ) {
						thas.revisionFocusout()
					}
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

			if (thas.attr('name') == 'ttk__order-phone') {

				var im = new Inputmask("+7 (999) 999-99-99", {
					showMaskOnHover: false
				});
				im.mask(thas);
			}

		}

		// $('.ttk__input-wrap').focusout(function(){
		// 	$(this).find('.ttk__order-autocomplite').hide()
		// })


		$('body').on('click', '.ttk__order-autocomplite-item',function(){

			if (!('formValue' in _state)) { _state.formValue = [] }

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

				setTimeout(()=>{ block.hide() },0);


				console.log(777777777)

				const f2 = (r)=> {
					input.revisionFocusout()
				}

				const f1 = (cb) => {
					
					setTimeout(()=>{
						
						input.val($(this).data('value'))
						input.data('verified', 1)
						cb()

					},0)
				}

				f1(f2)

				if(!!($(this).data('external'))) {
					
					_state.formValue[input.attr('name').replace("ttk__order-", "")] = $(this).data('external')
				}

				if(!!($(this).data('street'))) {

					_state.formValue[input.attr('name').replace("ttk__order-", "")] = $(this).data('street')
				}


				if (!!$(this).data('internal')) {
					_state.cityInternal = $(this).data('internal')
				}

				if ($(this).data('tc') != undefined) {
				console.log($(this).data('tc'))
					_state.tc = $(this).data('tc')
				}

				console.log($(this).data())

			return false

		})

		$(document).on('mouseup', function (e){
			$('input[data-autocomplit]').each(function(){

				const div = $(this).closest('div')

				if (!div.is(e.target) && div.has(e.target).length == 0) {

					if (div.find('[id *= "ttk__order-autocomplite__"]:visible').length) {

						div.find('[id *= "ttk__order-autocomplite__"]:visible').hide();

						$(this).revisionFocusout()
					}

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

				$('.ttk__order-autocomplite').not($(this).next()).hide()
			})

			.on('focusout', function() {
				if ($(this).val() == '') {
					$(this).prev('label').removeClass('ttk__order-input__focused')
				}
			})
		// $('input[type="text"], input[type="phone"]').on('focusout', function(){
		// 	setTimeout(function(){
		// 		console.log(55555555555)
		// 	} , 1000)
		// })

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