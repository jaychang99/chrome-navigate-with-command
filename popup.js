document.getElementById('command-input').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    submitCommand();  // Call submitCommand when Enter is pressed
  }
});

function submitCommand() {
  const inputCommand = document.getElementById('command-input').value;
  chrome.storage.local.get('commands', function (data) {
    if (!data.commands) {
      alert('No configuration found. Please configure your commands first.');
      return;
    }
    const commands = data.commands;
    const [command, arg1, arg2] = inputCommand.split(' ');
    if (commands[command]) {
      // Handling a single argument for simplicity; expand logic as needed for multiple args
      const urlTemplate = commands[command];
      const url1 = urlTemplate.replace(/\{arg1\}/g, arg1);  // Replace placeholder with argument
      const url2 = url1.replace(/\{arg2\}/g, arg2);
      // chrome.tabs.create({ url });
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.update(tabs[0].id, { url: url2 });
      });
    } else {
      alert('Command not recognized.');
    }
  });
}
