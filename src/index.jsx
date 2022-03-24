import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Loader from "./components/Loader";
import Login from "./components/Login";
import Popup from "./components/Popup";
import Register from "./components/Register";
import { messageConst } from "./constants/message_const";
import { storeConst } from "./constants/store_const";
import "./styles/styles.scss";


const onOpen = () => {
  // clear extention badge & send message
  setTimeout(() => chrome.action.setBadgeText({ text: "" }), 1000);
  chrome.runtime.sendMessage(
    { message: { type: messageConst.popupOpened } },
    (response) => {
      render(<App />, document.querySelector("#root"));
    }
  );
};


// window.onbeforeunload = () => {
//   console.log('closed')
//   return chrome.runtime.sendMessage(
//     { message: { type: messageConst.popupClosed } }
//   );
// }

onOpen();

const App = () => {
  const [word, setWord] = useState({});
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  

  useEffect(() => {
    token && setTimeout(() => {
      window.close()
    }, 1000 * 25)
  }, [token])
  
  useEffect(() => {
    !token && chrome.storage.local.get(['token_take_word'], (result) => {

      console.log(result.token_take_word, 'token')
      setToken(result.token_take_word)
    })
    chrome.storage.local.set({'token_take_word': token})
  }, [token])

  useEffect(() => {
    chrome.storage.sync.get([storeConst.lastWord], (storage) => {
      setWord(storage?.[storeConst.lastWord] || "ERROR");
    });

    chrome.runtime.onMessage.addListener(
      ({ message }, sender, sendResponce) => {
        switch (message.type) {
          case messageConst.newWordSeted:
            chrome.storage.sync.get([storeConst.lastWord], (storage) => {
              setWord(storage?.[storeConst.lastWord] || "ERROR");
              sendResponce();
            });
            break;
          default:
            break;
        }
      }
    );
  }, []);

  return <div className="app">
    {loading && <Loader/>}
    {token ? 
    <Popup 
    setLoading = {setLoading}
    token = {token}
    /> : isLogin ?
    <Login 
    setToken = {setToken} 
    setLoading = {setLoading}
    setIsLogin = {setIsLogin}
    /> :
    <Register
    setIsLogin = {setIsLogin}
    setLoading = {setLoading}
    setToken = {setToken}
    />}
    
    </div>;
};
