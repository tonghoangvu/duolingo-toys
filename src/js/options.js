const form = document.getElementById('form')
const saveButton = document.getElementById('save')
const cancelButton = document.getElementById('cancel')
const messageSpan = document.getElementById('message')
const enableShortcutKeysInput = document.getElementById('enable-shortcut-keys')
const speakNormalKeyInput = document.getElementById('speak-normal-key')
const speakSlowerKeyInput = document.getElementById('speak-slower-key')

applyLocalization()

function assignEventHandlers() {
	form.addEventListener('submit', event => event.preventDefault())
	saveButton.addEventListener('click', () => {
		saveOptions()
		onChange(getLangMessage('options__message__saved'))
	})
	cancelButton.addEventListener('click', () => {
		constructOptions()
		onChange('')
	})
	enableShortcutKeysInput.addEventListener('change', () =>
		onChange(getLangMessage('options__message__unsaved_changes'))
	)
	for (const keyInput of [speakNormalKeyInput, speakSlowerKeyInput])
		keyInput.addEventListener('keydown', event => {
			event.preventDefault()
			const keyString = eventKeysToKeyString(event)
			if (keyString) {
				event.target.value = keyString
				onChange(getLangMessage('options__message__unsaved_changes'))
			}
		})
}
assignEventHandlers()

async function constructOptions() {
	enableShortcutKeysInput.checked = await getOption('enable-shortcut-keys')
	speakNormalKeyInput.value = await getOption('speak-normal-key')
	speakSlowerKeyInput.value = await getOption('speak-slower-key')
}
constructOptions()

function saveOptions() {
	chrome.storage.sync.set({
		'enable-shortcut-keys': enableShortcutKeysInput.checked,
		'speak-normal-key': speakNormalKeyInput.value,
		'speak-slower-key': speakSlowerKeyInput.value,
	})
}

function onChange(message) {
	messageSpan.textContent = message
}

function eventKeysToKeyString(event) {
	const keys = []
	if (event.ctrlKey) keys.push('Ctrl')
	if (event.altKey) keys.push('Alt')
	if (event.shiftKey) keys.push('Shift')
	if (keys.length === 0 || event.key.length != 1 || (!isDigit(event.key) && !isLetter(event.key)))
		return ''
	keys.push(event.key.toUpperCase())
	return keys.join('+')
}

function isDigit(key) {
	return key >= '0' && key <= '9'
}

function isLetter(key) {
	return (key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z')
}
