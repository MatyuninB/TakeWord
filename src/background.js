import WordParser from "./background/WordParser/WordParser";
import { messageConst } from "./constants/message_const";
import { createPopUp } from './background/Pop-up/popUpCreate';

chrome.runtime.onMessage.addListener(({ message }, sender, sendResponce) => {
  switch (message.type) {
    case messageConst.popupOpened:
      WordParser.parseWord({delay: 10000, notification: true});
      sendResponce();
      break;
    default:
      break;
  }
});

chrome.action.onClicked.addListener(
  () => {
    WordParser.parseWord({delay: 10000, notification: true});
  }
)