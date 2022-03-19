import { messageConst } from "../../constants/message_const";
import { storeConst } from "../../constants/store_const";

export class WordParserView {
  sendWord = ({word, notification = true}) => {
 
    if( true ) {

      chrome.action.setBadgeText({text: 'New'});
      chrome.action.setBadgeBackgroundColor({color: '#00FF00'});
    }

    notification && chrome.notifications.create(`my-notification-${Date.now()}`, {
      iconUrl: "https://cdn.icon-icons.com/icons2/1356/PNG/512/if-orc-2913114_88595.png",
      type: "basic",
      title: "My Title",
      message: "My Message",
    });

    chrome.storage.sync.set({[storeConst.lastWord]: word});

    chrome.runtime.sendMessage({message: {type: messageConst.newWordSeted}});
  }
}