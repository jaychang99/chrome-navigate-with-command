document.getElementById('save-config').addEventListener('click', function () {
  const configData = document.getElementById('config-input').value;
  try {
    const configJson = JSON.parse(configData);
    chrome.storage.local.set({ 'commands': configJson }, function () {
      alert('Configuration saved successfully!');
    });
  } catch (e) {
    alert('Invalid JSON format!');
  }
});
