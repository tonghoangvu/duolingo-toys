/* eslint-disable no-unused-vars */

async function getOption(name) {
	const data = await chrome.storage.sync.get(name)
	return data[name]
}

function applyLocalization() {
	const langElements = document.querySelectorAll('.lang')
	langElements.forEach(
		element => (element.textContent = getLangMessage(element.textContent.trim()))
	)
}

function getLangMessage(value) {
	return chrome.i18n.getMessage(value)
}
