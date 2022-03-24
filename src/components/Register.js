import React, { useState, useEffect, useLayoutEffect } from "react"
import { login, register, validateEmail, validatePassword } from "../background/api/authAPI"
import '../styles/login.scss'
import eye_icon from '../images/eye_icon.png'

const Register = ({setIsLogin, setLoading, setToken}) => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [dublicatePassword, setDublicatePassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [dublicatePasswordVisible, setDublicatePasswordVisible] = useState(false)
    const [warning, setWarning] = useState({field: '', message: ''})
    const [sended, setSended] = useState(false)

    useEffect(() => {
        const validateResEmail = validateEmail(userName)
        const validateResPassword = validatePassword(password)

        if(!validateResEmail){
            setWarning({message: 'Email is not valid.', field: 'email'})
        } else if(!validateResPassword) {
            setWarning({message: 'Password must contains more then 6 characters, numbers, upper and lower letters', field: 'password'})
        } else if(password !== dublicatePassword){
            setWarning({message: 'Passwords must be the same', field: 'password'})
        } else {
            setWarning({field: '', message: ''})
        }

    }, [userName, password, dublicatePassword])

    const sendLogin = async () => {
        if(!warning.field){
            const result = await login({login: userName, password})
            setLoading(false)
            result.token && setToken(result.token)
            result.message && setWarning({message: result.message, ...warning})
        }
    }

    const sendRegister = async () => {
        setSended(true)
        if(!warning.field){
            setLoading(true)
            const result = await register({login: userName, password})
            result.message && setWarning({message: result.message, field: 'email'})
            result.message && setLoading(false)
            !result.message && sendLogin()
            console.log(result, 'resuuuult')
        }
    }
    
    return <div className='login_form'>
    <div className='login_title'>Sign Up</div>
    <p className='login_warning'>{sended ? warning.message : ''}</p>
    <div className='input_block'>
    <input 
        className ={'login_form__input ' + ( warning.field === 'email' && sended ? 'error_warning' : '')}  
        placeholder='Your email' 
        value={userName} 
        onChange={(e) => setUserName(e.target.value)}
    >
    </input>
    </div>
    <div className='input_block'>
    <input 
        className ={'login_form__input ' + ( warning.field === 'password' && sended ? 'error_warning' : '')} 
        placeholder='Your password' 
        type={passwordVisible ? 'text' : 'password'} 
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
    <div className='input_block'>
    <input 
        className ={'login_form__input ' + ( warning.field === 'password' && sended ? 'error_warning' : '')} 
        placeholder='Repeat password' 
        type={dublicatePasswordVisible ? 'text' : 'password'} 
        value={dublicatePassword} 
        onChange={(e) => setDublicatePassword(e.target.value)}
    >
    </input>
    <img 
        onMouseDown={() => setDublicatePasswordVisible(true)} 
        onMouseUp={() => setDublicatePasswordVisible(false)}  
        className='eye_img' 
        src={eye_icon} 
        alt='eye_icon'
    />
    </div>
    <p 
        className='register_link' 
        onClick={() => setIsLogin(true)}
    >Or login</p>
    <div 
        className='register_send__button' 
        onClick={() => sendRegister()}
    >
        <span>Send</span>
    </div>
</div>
}

export default Register