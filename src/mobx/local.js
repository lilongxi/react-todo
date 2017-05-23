const SEORAGE_KEY = 'mobx-todo'

export default {
	fetch: function () {
		return JSON.parse(window.localStorage.getItem(
			SEORAGE_KEY) || '[]' )
	},
	save: function (item) {
		window.localStorage.setItem(SEORAGE_KEY, JSON.stringify(item))
	}
}
