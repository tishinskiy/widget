const invertKeySimbol = (val, lang) => {
	
	let result = ''

	val.split('').forEach(function(item, i, arr){

		const pos = lang[0].indexOf(item.toLowerCase()) 


		if (pos != -1) {
			result += ((lang[1][pos].toUpperCase()) == lang[1][pos]) ? lang[1][pos].toUpperCase() : lang[1][pos]
		}
		else {
			result += item
		}
	})
	
	return result
}

export default invertKeySimbol
