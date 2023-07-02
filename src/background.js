import ReviewReminder from './clases/ReviewReminder.js';
import ConfigHandler from './clases/ConfigHandler.js';

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "talkToChatGPT",
      "title": "Hablar texto seleccionado",
      "contexts": ["selection"]
    });
  });

  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "talkToChatGPT") {
      chrome.tabs.sendMessage(tab.id, {command: "speak", text: info.selectionText});
    }
  });
  

  (async function() {
    const configHandler = await ConfigHandler.create();
    const manifestData = configHandler.manifest;
    const reviewUrl = manifestData.plugin_url; 
    console.log('reviewUrl', reviewUrl)
    if (reviewUrl) {
      const reviewReminder = new ReviewReminder(reviewUrl);
      await reviewReminder.initReminder();
    }
  })();