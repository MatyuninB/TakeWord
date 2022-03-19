import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { messageConst } from './constants/message_const';
import { storeConst } from './constants/store_const';
import './styles/styles.scss';

const onOpen = () => {
  // clear extention badge & send message
  chrome.action.setBadgeText({text: ''});
  chrome.runtime.sendMessage({message: {type: messageConst.popupOpened}}, (response) => {
    render(<App />, document.querySelector('#root'));
  });
}

onOpen();

const App = () => {
  const [word, setWord] = useState({});

  useEffect(() => {
    chrome.storage.sync.get([storeConst.lastWord], (storage) => {
      setWord(storage?.[storeConst.lastWord] || 'ERROR')
    });
  }, []);

  return (
    <div className='app'>
      {word.text}
    </div>
  );
}



