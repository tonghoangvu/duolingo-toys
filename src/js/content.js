document.addEventListener('keyup', async event => {
	const enableShortcutKeys = await getOption('enable-shortcut-keys')
	const speakNormalKey = await getOption('speak-normal-key')
	const speakSlowerKey = await getOption('speak-slower-key')
	if (enableShortcutKeys === true) speak(event, speakNormalKey, speakSlowerKey)
})

function speak(event, speakNormalKey, speakSlowerKey) {
	// Find speaker buttons
	const speakerButtons = document.querySelectorAll('button[data-test="speaker-button"]')
	const speakerButtonNormal = speakerButtons[0]
	const speakerButtonSlower = speakerButtons[1]

	// Check keys
	if (isMatchEventKeys(event, parseKeyString(speakNormalKey))) speakerButtonNormal.click()
	else if (isMatchEventKeys(event, parseKeyString(speakSlowerKey))) speakerButtonSlower.click()
}

function isMatchEventKeys(event, keys) {
	return (
		event.ctrlKey === keys.ctrlKey &&
		event.altKey === keys.altKey &&
		event.shiftKey === keys.shiftKey &&
		event.key.toUpperCase() === keys.key.toUpperCase()
	)
}

function parseKeyString(keyString) {
	const keys = keyString.split('+')
	return {
		ctrlKey: keys.includes('Ctrl'),
		altKey: keys.includes('Alt'),
		shiftKey: keys.includes('Shift'),
		key: keys[keys.length - 1],
	}
}
