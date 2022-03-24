import React, { useState, useEffect, useLayoutEffect } from "react"
import { login, validateEmail, validatePassword } from "../background/api/authAPI"
import { messageConst } from "../constants/message_const"
import '../styles/login.scss'
import eye_icon from '../images/eye_icon.png'


const Login = ({setToken, setLoading, setIsLogin}) => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [warning, setWarning] = useState({field: '', message: ''})
    const [sended, setSended] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)

    useEffect(() => {
        const validateResEmail = validateEmail(userName)
        const validateResPassword = validatePassword(password)

        if(!validateResEmail){
            setWarning({message: 'Email is not valid.', field: 'email'})
        } else if(!validateResPassword) {
            setWarning({message: 'Password must contains more then 6 characters, numbers, upper and lower letters', field: 'password'})
        } else {
            setWarning({field: '', message: ''})
        }
    }, [userName, password])

    const sendLogin = async () => {
        setSended(true)
        if(!warning.field){
            setLoading(true)
            const result = await login({login: userName, password})
            setLoading(false)
            result.token && setToken(result.token)
            result.message && setWarning({message: result.message, ...warning})
        }
    }

    return <div className='login_form'>
        <div className='login_title'>Sign In</div>
        <p className='login_warning'>{sended ? warning.message : ''}</p>
        <div className='input_block'>
        <input 
            className ={'login_form__input ' + (warning.field === 'email' && sended ? 'error_warning' : '')}  
            placeholder='Your email' 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)}
        >
        </input>
        </div>
        <div className='input_block'>
        <input 
            type={passwordVisible ? 'text' : 'password'} 
            className ={'login_form__input ' + (warning.field === 'password' && sended ? 'error_warning' : '')}  
            placeholder='Your password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
        >
        </input>
        <img 
            onMouseDown={() => setPasswordVisible(true)} 
            onMouseUp={() => setPasswordVisible(false)} 
            className='eye_img' 
            src={eye_icon} 
            alt='eye_icon'
        />
        </div>
        <p 
            className='login_link' 
            onClick={() => setIsLogin(false)}
        >Or register</p>
        <div 
            className='login_send__button' 
            onClick={() => sendLogin()}
        ><span>Send</span></div>
    </div>
}

export default Login