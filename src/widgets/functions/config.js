export const _host = '10.7.0.86:8000'

export const _state = (() => {

	let state = window.state

	if (!state) {
		state = window.state = {}
	}

	return state
})()
