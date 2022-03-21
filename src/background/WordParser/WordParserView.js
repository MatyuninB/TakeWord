import { messageConst } from "../../constants/message_const";
import { storeConst } from "../../constants/store_const";
import { createPopUp } from "../Pop-up/popUpCreate";

export class WordParserView {
  sendWord = ({word, notification = true}) => {
    this.setNewBadge();
    notification && this.sendNotification()
    chrome.storage.sync.set({[storeConst.lastWord]: word});
    chrome.runtime.sendMessage({message: {type: messageConst.newWordSeted}}, () => {});
    this.callPopUp();
  }

  setNewBadge = () => {
    chrome.action.setBadgeText({text: 'New'});
    chrome.action.setBadgeBackgroundColor({color: '#00FF00'});
  }

  sendNotification = (props) => {
    const {
      iconUrl = "https://cdn.icon-icons.com/icons2/1356/PNG/512/if-orc-2913114_88595.png",
      type = "basic",
      title = "New Word There",
      message = "New Word There",
    } = props || {};

    chrome.notifications.create(`my-notification-${Date.now()}`, {
      iconUrl,
      type,
      title,
      message,
    });
  }

  callPopUp = () => {
    createPopUp();
  }  
}