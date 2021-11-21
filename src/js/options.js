const form = document.getElementById('form')
const saveButton = document.getElementById('save')
const cancelButton = document.getElementById('cancel')
const messageSpan = document.getElementById('message')
const enableShortcutKeysInput = document.getElementById('enable-shortcut-keys')

function assignEventHandlers() {
	form.addEventListener('submit', event => event.preventDefault())
	saveButton.addEventListener('click', () => {
		saveOptions()
		onChange('Saved')
	})
	cancelButton.addEventListener('click', () => {
		constructOptions()
		onChange('')
	})
	enableShortcutKeysInput.addEventListener('change', () => onChange('Unsaved changes'))
}
assignEventHandlers()

function constructOptions() {
	chrome.storage.sync.get('enable-shortcut-keys', data => {
		if (enableShortcutKeysInput) enableShortcutKeysInput.checked = data['enable-shortcut-keys']
	})
}
constructOptions()

function saveOptions() {
	chrome.storage.sync.set({
		'enable-shortcut-keys': enableShortcutKeysInput.checked,
	})
}

function onChange(message) {
	messageSpan.textContent = message
}
