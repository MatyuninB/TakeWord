import { parseWord } from "../api/wordAPI";
import { storeConst } from "../../constants/store_const";

export class WordParserModel {
  getWord = async(fn = () => {}) => {
    const word = await parseWord();
    fn(word);
  }

  getLastWord = () => {
    chrome.storage.sync.get(storeConst.lastWord);
  }
}