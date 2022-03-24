import WordParser from "./background/WordParser/WordParser";
import { messageConst } from "./constants/message_const";
import { createPopUp } from './background/Pop-up/popUpCreate';
import { auth } from "./background/api/authAPI";
import { getRandomWord } from "./background/api/wordAPI";
import { storeConst } from "./constants/store_const";

chrome.storage.local.get(['token_take_word'], async (result) => {
  // console.log(result, 'token from storage')
  const res = await auth(result.token_take_word)
  // console.log(res)
  if(res.message){
    chrome.storage.local.set({token_take_word: ''}, () => {
      console.log('token cleaned')
    })
  } 
})


chrome.runtime.onMessage.addListener(({ message }, sender, sendResponce) => {
  switch (message.type) {
    case messageConst.popupOpened:
      // WordParser.parseWord({delay: 10000, notification: true});
      sendResponce();
      break;
    case messageConst.popupClosed:
      console.log('popup closed')
      break;
    case messageConst.newWordSeted:
      console.log('new word seted')
      break;
    case messageConst.newWordDontSeted:
      console.log('new word dont seted')
      break;
    default:
      break;
  }
});

setInterval(async () => {
  console.log('timer started')
  chrome.storage.local.get(['token_take_word'], async (result) => {
    const randomWord = await getRandomWord(result.token_take_word)
    
    if(randomWord){
      chrome.storage.sync.get([storeConst.lastWord], (storage) => {
        if(storage[storeConst.lastWord]?.word !== randomWord?.word || !storage[storeConst.lastWord]){
          chrome.storage.sync.set({[storeConst.lastWord]: randomWord}, async (res) => {
            console.log('popup creating start')
            await createPopUp();
          })
          chrome.runtime.sendMessage({message: {type: messageConst.newWordSeted}}, () => {});
        }
        
      })
    }
    chrome.runtime.sendMessage({message: {type: messageConst.newWordDontSeted}}, () => {});
  })
}, 1000 * 30)

chrome.action.onClicked.addListener(
  async () => {
    await createPopUp();
  }
)

export const newInterval = () => {
  return setTimeout(async () => {
    await createPopUp()
  }, 0)
}

newInterval()