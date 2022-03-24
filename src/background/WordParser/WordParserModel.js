import { parseWord, getRandomWord } from "../api/wordAPI";
import { storeConst } from "../../constants/store_const";

export class WordParserModel {
  getWord = async(fn = () => {}) => {

    chrome.storage.local.get(['token_take_word'], async (res) => {
      let word = await getRandomWord(res.token_take_word);
      console.log(word)
      fn(word)
    })
    
  }

  getLastWord = () => {
    chrome.storage.sync.get(storeConst.lastWord);
  }
}