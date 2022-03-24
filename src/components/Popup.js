import React, { useState, useEffect, useLayoutEffect } from "react"
import { getRandomWord } from "../background/api/wordAPI"
import { storeConst } from "../constants/store_const"
import '../styles/popup.scss'



const Popup = ({setLoading, token}) => {
    const [originWord, setOriginWord] = useState('')
    const [translate, setTranslate] = useState('')
    const [visible, setVisible] = useState(true)
    

    const closePopup = () => {
        window.close()
    }

    useLayoutEffect(async () => {
        setLoading(true)
        chrome.storage.sync.get([storeConst.lastWord], (storage) => {
            storage?.[storeConst.lastWord]?.word ? setOriginWord(storage?.[storeConst.lastWord].word) : setOriginWord('Test word');
            storage?.[storeConst.lastWord]?.word ? setTranslate(storage?.[storeConst.lastWord].translation) : setTranslate('Тестовое слово')
            setLoading(false)
          });
        
    }, [])
    
    

    return (visible ? <div className="popup">
    <div className='popup_logo'>Take Word</div>
    <div className='popup_words_block'>
        <div className='popup_word'>
            <span>
            {originWord}
            </span>
        </div>
        <div className='popup_word'>
            <span>
            {translate}
            </span>
            </div>
    </div>
    <div className='popup_button' onClick={() => closePopup()}>Take It!</div>
</div> : null) 
}

export default Popup