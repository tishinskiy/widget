const autocompliteFilter = ( val, arr) => {

	const transitional = arr.filter( ( item ) => {
		return item.toLowerCase().indexOf( val.toLowerCase()) !== -1
	} )

	let result = []

	for (var i = 0; i <= transitional.length; i++) {

		result.push( ...transitional.filter( ( item ) => {
			return  item.toLowerCase().indexOf( val.toLowerCase()) == i 
		}))

		if (result.length == transitional.length) break
	}

	return result
}

export default autocompliteFilter