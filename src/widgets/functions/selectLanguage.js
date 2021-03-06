const ru = ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Х", "Ъ", "Ж", "Э", "Б", "Ю", ","]
const en = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "{", "}", ":", "\"", "<", ">", "?"]

const selectLanguage = (lang) => {

	switch (lang.toLowerCase()) {
		case 'ru' :
			return [ en, ru]
			break
		case 'en' :
			return [ ru, en]
			break
		default :
			return false
			break
	}
}

export default selectLanguage