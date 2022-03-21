import { WordParserModel } from "./WordParserModel";
import { WordParserView } from "./WordParserView";

class WordParser {
  constructor(props) {
    this.model = props.model;
    this.view = props.view;
    this.timeout;
  }

  parseWord = ({ delay = 10000, notification = false }) => {
    if (this.timeout) return;

    this.timeout = setTimeout(() => {
      this.model.getWord((word) => {
        this.view.sendWord({word, notification});
      });
      this.timeout = null;
    }, delay);
  };
}

export default new WordParser({
  model: new WordParserModel(),
  view: new WordParserView(),
});
