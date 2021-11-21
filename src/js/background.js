chrome.runtime.onInstalled.addListener(() => {
	// Set default options
	chrome.storage.sync.set({
		'enable-shortcut-keys': true,
	})
})
