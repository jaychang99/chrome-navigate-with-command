function handleCommand(input) {
  const commands = {
    "gh": username => `https://github.com/${username}/${username}`,
    "cp": service => {
      if (service === "service") {
        return "https://aws.com/codepipeline";
      }
      return "https://aws.com";  // Default AWS homepage
    }
  };

  const [command, arg] = input.split(' ');
  if (commands[command]) {
    const url = commands[command](arg);
    // chrome.tabs.create({ url }); // new tab
    // existing tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.update(tabs[0].id, { url: url });
    });
  }
}

chrome.commands.onCommand.addListener(function (command) {
  if (command === "open-spotlight") {
    chrome.storage.local.get('commands', function (data) {
      if (data.commands) {
        // Your code to handle commands goes here
        const userCommands = data.commands;
        // Example: You can open popup.html with loaded commands

        var primaryDisplay = displays.find(display => display.isPrimary);
        var screenWidth = primaryDisplay.workArea.width;
        var screenHeight = primaryDisplay.workArea.height;

        var width = 400;
        var height = 400;
        var left = Math.round((screenWidth - width) / 2);
        var top = Math.round((screenHeight - height) / 2);

        chrome.windows.create({
          url: chrome.runtime.getURL('popup.html'),
          type: 'popup',
          width: 400,
          height: 300,
          left,
          top,
        });
      }
    });
  }
});
