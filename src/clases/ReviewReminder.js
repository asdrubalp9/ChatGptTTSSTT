import ConfigHandler from './ConfigHandler.js';
import { geti18nMessage } from "./../helpers";
export default class ReviewReminder {
    constructor(reviewUrl) {
        this.reviewUrl = reviewUrl;
        this.installationDateKey = 'installation_date';
        this.installationDate = '';
        this.remindLaterDateKey = 'remind_later_date';
        this.configHandler = null;
        this.extension = typeof browser !== 'undefined' ? browser : chrome;
    }

    async initReminder() {
        this.sendNotification();
        this.configHandler = await ConfigHandler.create();

        if (!await this.configHandler.getItem(this.installationDateKey)) {
            await this.configHandler.setSettings({[this.installationDateKey]: new Date().toISOString() });
        }
        this.checkAndNotify();
        this.installationDate = await this.configHandler.getItem(this.installationDateKey);

        this.extension.alarms.create('review_reminder', { delayInMinutes: 60 * 24 * 7 });

        this.extension.alarms.onAlarm.addListener((alarm) => {
            if (alarm.name === 'review_reminder') {
                this.checkAndNotify();
            }
        });
    }

    async checkAndNotify() {
        const installationDate = new Date(await this.configHandler.getItem(this.installationDateKey));
        const remindLaterDate = await this.configHandler.getItem(this.remindLaterDateKey) ?
            new Date(await this.configHandler.getItem(this.remindLaterDateKey)) : null;
        const currentDate = new Date();

        if (currentDate.getTime() - installationDate.getTime() >= 7 * 24 * 60 * 60 * 1000 ||
        (remindLaterDate && currentDate.getTime() - remindLaterDate.getTime() >= 4 * 24 * 60 * 60 * 1000)) {
            this.sendNotification();
        }
    }

    sendNotification() {
        this.extension.notifications.create('reminder_notification', {
            "type": "basic",
            "iconUrl": "images/icon128.png",
            "title": geti18nMessage('pleaseReviewPluginTitle'),
            "message": geti18nMessage('ifYouHaveLikeditReview'),
            "buttons": [
                {"title": geti18nMessage("leaveReviewNow"), "iconUrl": "images/icon128.png"},
                {"title": geti18nMessage("RememberLater"), "iconUrl": "images/icon128.png"},
                {"title": geti18nMessage("dontRemember"), "iconUrl": "images/icon128.png"}
            ]
        });

        this.extension.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
            if (notificationId === 'reminder_notification') {
                this.handleButtonClicked(buttonIndex);
            }
        });
    }

    async handleButtonClicked(buttonIndex) {
        if (buttonIndex === 0) {
            // Redirige al usuario a la página de revisión
            this.extension.tabs.create({ url: this.reviewUrl });
        } else if (buttonIndex === 1) {
            // Establecer tiempo para recordar más tarde
            await this.configHandler.setSettings({[this.remindLaterDateKey]: new Date().toISOString() });
        }
    }
}

