import revisionValue from './revisionValue'
import { _state } from "./config"

// const notServiceMessage = jQuery('<div/>',{
// 			class: "ttk__service-message ttk__service-message__error",
// 			class: "ttk__service-message__error",
// 			html: 'Указаный адрес не подключен к услугам ТТК',
// 		})

const state = {}

const propsInState = (revision, state, name, field="another") => {

	if (name == 'city') {
		field = revision['EXTERNAL_ID']
	}

	if (name == 'street') {
		field = revision['STREET_ID']
	}

	if (name == 'building') {
		field = revision['BUILDING_ID']
	}


	state.formValue[name] = field

	if ('INTERNAL_ID' in revision) {
		state.cityInternal = revision['INTERNAL_ID']
	}

	if ('TC' in revision) {
		state.tc = revision['TC']
	}
}


const mesageFormError = (message) => {

	console.log(message)
	$('[name="ttk__order-ofice"]').attr('disabled', true)

	if ($(".ttk__service-message").length) {

		$(".ttk__service-message").remove()

	} 

	$('#ttk__order-step__one').append(`
		<div id="ttk__service-message__error" class="ttk__service-message ttk__service-message__error">
			<span>${message}</span>
		</div>
	`)


	$('#ttk__order-step__two').slideUp('fast')
}

const revisionOne = () => {

	jQuery.fn.revisionFocus = function(){
		// console.log('revisionFocus')

		const name = $(this).attr('name').replace("ttk__order-", "")
		const controlling = state[name]['controlling']
		const controlled = state[name]['controlled']

		for ( let i = 0; i < controlling.length; i++) {
			const item = controlling[i]

			if (item.data('verified') != 1 || item.val() == '') {

				$(this).attr('disabled', true)

				if (item.val() =='') {

					$(this).val( `Поле "${item.data('label')}" не заполнено`)

					break

				} else {
					console.log(item.val())
					const revision = revisionValue(item.val(), item.attr('name').replace("ttk__order-", ""))

					if (!!revision) {
						item
							.val(revision['NAME'])
							.data('verified', 1)

						$(this).attr('disabled', false)
						.focus()

						propsInState (revision, _state,  item.attr('name').replace("ttk__order-", ""))

					} else {

						$(this).val(`Поле "${item.data('label')}" заполнено не верно`)
					}
				} 
			} else {
				console.log(3333333333)
			}
		}
	}

	jQuery.fn.revisionInput = function(){
		// console.log('revisionInput')

		const name = $(this).attr('name').replace("ttk__order-", "")
		const controlling = state[name]['controlling']
		const controlled = state[name]['controlled']

		for ( let i = 0; i < controlled.length; i++) {
			const item = controlled[i]

			item
				.val('')
				.prev('label').removeClass('ttk__order-input__focused')
				.data('verified', 0)
				.attr('disabled', false)
		}

		$('#ttk__order-step__one .ttk__service-message').remove()
	}

	jQuery.fn.revisionFocusout = function(){
		console.log('revisionFocusout')

		const name = $(this).attr('name').replace("ttk__order-", "")
		const controlling = state[name]['controlling']
		const controlled = state[name]['controlled']

		$(this).val($(this).val().replace(/^\s+|\s+$/g, ""))

		console.log($(this).data('verified'))
		if ($(this).data('verified') == 0) {

			const revision = revisionValue($(this).val(), name)

			if (!!revision) {
				$(this)
					.val(revision['NAME'])
					.data('verified', 1)

				propsInState (revision, _state, name)
			}
		}
		
		for ( let i = 0; i < controlled.length; i++) {
			const item = controlled[i]
					item.attr('disabled', false)

			if ($(this).data('verified') == 0) {
				item
					.val('')
					.prev('label').removeClass('ttk__order-input__focused')
			}
		}

		if (name == 'building' && $(this).val() != '') {

			if ($(this).data('verified') == 1) {

				if ($(this).attr('disabled') != true) {

					if (!!_state.tc) {

						let string = ''

						for (let k in _state.tc) {
							if ( _state.tc[k] == 1) {

								string += `<div class="ttk__service-name"><input id="ttk__service_${ k }" type="checkbox" value="${ k }" checked><label for="ttk__service_${ k }">${ k }</label></div>`
							}
						}


						console.log('Адрес верен')
						$('[name="ttk__order-ofice"]')
							.attr('disabled', false)
							.focus()
						$('#ttk__order-step__two').slideDown('fast')
						$('#ttk__order-step__one .ttk__service-message').remove()
						$('#ttk__order-step__one').append(`
							<div id="ttk__service-message__service" class="ttk__service-message ttk__service-message__service">
									<h3>Список предоставляемых услуг по данному адресу</h3>
									<div class="ttk__service-block">${string}</div>
							</div>
						`)
					} else {

						mesageFormError('ТТК не предоставляет услуги по указанному адресу')
					}
				}

			} else {
				
				mesageFormError('Указаный адрес не подключен к услугам ТТК')
			}
		} else {
			$('#ttk__order-step__one .ttk__service-message').remove()
		}

		for ( let i = 0; i < controlled.length; i++) {
			const item = controlled[i]

			item
				.val('')
				.prev('label').removeClass('ttk__order-input__focused')
				.data('verified', 0)
				.attr('disabled', false)
		}
	}

	jQuery.fn.revisionItem = function(controlling=[], controlled=[]){

		state[$(this).attr('name').replace("ttk__order-", "")] = {
			controlling,
			controlled
		}

		console.log(state)

		$(this).on('focus', function(){
			// console.log('focus')
			$(this).revisionFocus(controlling, controlled)
		})

		$(this).on('input', function(){
			// console.log('input')

			$(this).data('verified', 0)

			$(this).revisionInput(controlling, controlled)

		})

		$(this).on('focusout', function(){

		})
	};
}

export default revisionOne