/* eslint-disable no-unused-vars */

async function getOption(name) {
	const data = await chrome.storage.sync.get(name)
	return data[name]
}
