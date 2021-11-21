document.addEventListener('keyup', event => {
	chrome.storage.sync.get('enable-shortcut-keys', data => {
		if (data['enable-shortcut-keys'] === true) speak(event)
	})
})

function speak(event) {
	// Find speaker buttons
	const speakerButtons = document.querySelectorAll('button[data-test="speaker-button"]')
	const speakerButtonNormal = speakerButtons[0]
	const speakerButtonSlow = speakerButtons[1]

	// Check keys
	if (event.altKey && (event.key === 'r' || event.key === 'R')) {
		if (event.shiftKey && speakerButtonSlow) speakerButtonSlow.click()
		else if (speakerButtonNormal) speakerButtonNormal.click()
	}
}
