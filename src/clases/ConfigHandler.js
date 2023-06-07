import { config } from './../config.js';

export default class ConfigHandler {
  constructor() {
    this.settings = {};
    
    chrome.storage.onChanged.addListener((changes, areaName) => {
        console.log('changes', changes, 'areaName', areaName)
      if (areaName === 'sync') {
        this.updateSettings(changes);
      }
    });
    
    this.getSettings();
  }

  static async create() {
    const handler = new ConfigHandler();
    await handler.initialize();
    return handler;
  }

  getSettings() {
    return new Promise((resolve, reject) => {
      
      const configKeys = config.filter((field) => field?.name !== undefined);
      const configKeyNames = configKeys.map(key => key.name);
      chrome.storage.sync.get(configKeyNames, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          for (const key of configKeys) {
            this.settings[key.name] = result[key.name] || key.defaultValue;
          }
          console.log("Settings loaded:", this.settings);
          resolve();
        }
      });
    });
  }

  setSettings(newSettings) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(newSettings, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          console.log("Settings updated:", newSettings);
          resolve();
        }
      });
    });
  }

  updateSettings(changes) {
    for (let key in changes) {
      let storageChange = changes[key];
      this.settings[key] = storageChange.newValue;
    }
  }
}
