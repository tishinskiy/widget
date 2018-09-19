const findInData = (data, state) => {

	let dataFields =[]

	for (let k in data) {
		dataFields.push( k )
		k++
	}
	
	for (let j = 0; j < state.length; j++) {

		let res = false

		for( let i = 0; i < dataFields.length; i++) {

			if (dataFields[i] in state[j] && state[j][dataFields[i]] == data[dataFields[i]]) {
				res = true

			} else {

				res = false
				break
			}
		}
		
		if (!!res) {
			return state[j]
			break
		}
	}
}

export default findInData