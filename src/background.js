import ReviewReminder from './clases/ReviewReminder.js';

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
    const reviewUrl = 'https://chrome.google.com/webstore/detail/gpt4-promptcounter/hllmajaolaombcgdgdfodckdmhaphbli';
    const reviewReminder = new ReviewReminder(reviewUrl);
    await reviewReminder.initReminder();
  })();
  