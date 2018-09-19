const autocompliteFilter = ( val, arr) => {

	const transitional = arr.filter( ( item ) => {

		if ("EXTERNAL_NAME" in item) {
			item.NAME = item['EXTERNAL_NAME']
		}

		if ("STREET_ID" in item) {
			item.NAME = item['STREET_NAME'] + ' ' + item['TYPE_NAME'].toLowerCase()
		}

		if ("BUILDING_ID" in item) {
			item.NAME = item['HOUSE_NUMBER'] + `${item['CORPUS'] != '' ? item['CORPUS'].toLowerCase() : ''}`
		}

		return item['NAME'].toLowerCase().indexOf( val.toLowerCase()) !== -1
	} )

	let result = []

	for (var i = 0; i <= transitional.length; i++) {

		result.push( ...transitional.filter( ( item ) => {
			return  item['NAME'].toLowerCase().indexOf( val.toLowerCase()) == i 
		}))

		if (result.length == transitional.length) break
	}

	return result
}

export default autocompliteFilter