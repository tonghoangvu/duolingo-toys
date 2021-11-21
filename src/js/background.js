chrome.runtime.onInstalled.addListener(() => {
	// Set default options
	chrome.storage.sync.set({
		'enable-shortcut-keys': true,
		'speak-normal-key': 'Alt+R',
		'speak-slower-key': 'Alt+Shift+R',
	})
})
