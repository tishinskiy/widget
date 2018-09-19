export const _host = 'https://lk.myttk.ru/gate/jsonp/'
// export const _host = 'http://10.7.0.86:8000'

// https://lk.myttk.ru/gate/jsonp/getCity.php
export const _state = (() => {

	let state = window.state

	if (!state) {
		state = window.state = {}
	}

	return state
})()
