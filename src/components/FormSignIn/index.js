import React, { useState } from 'react';

import './style.css';
import { userService } from '../../services/user.service';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
//import { useHistory } from "react-router-dom";

import { actions as authActions } from '../../reducers/auth.reducer';

import { useEffect } from 'react';


export default function FormSignIn() {

    const [password, setPassword] = useState({
        name: 'password',
        value: '',
        isValid: false,
        touched: false,
        error: []
    });
    const [email, setEmail] = useState({
        name: 'email',
        value: '',
        isValid: false,
        touched: false,
        error: []
    });
    const [errorLogin, setErrorLogin] = useState(null)
    const auth = useSelector(state => state.auth);


    const loginPhrase = 'Log In Now';
    const btnPhrase = 'Login';
    const forgotPwd = 'Forgot your password?';
    const [validationError, setValidationError] = useState(null);
    const [canSubmit, setCanSubmit] = useState(false);
    //const [canSubmit, setCanSubmit] = useState(false);
    //const [submit, setSubmit] = useState(false);

    const dispatch = useDispatch();
    let history = useHistory();



    useEffect(() => {
        const allErrors = email.error.concat(password.error);

        const errors = allErrors.map(function (errorMessage, index) {
            return <span key={index} className="error-message">{errorMessage}</span>
        });
        //canSubmit ? setValidationError(null) : setValidationError(errors);
        email.isValid && password.isValid ? setCanSubmit(true) : setCanSubmit(false);
        setValidationError(errors);

    }, [email, password]);

    async function handleUserLogin(e) {
        e.preventDefault();
        //console.log(data);
        dispatch(authActions.requestLogin());


        checkValidity(email.value, email, setEmail);
        checkValidity(password.value, password, setPassword);
        // const data = [];
        // data.push(email.value);
        // data.push(password.value);
        if (canSubmit) {
            userService.login(email.value, password.value)
                .then(
                    response => {
                        //console.log('requisição sucesso');
                        //console.log(response);

                        if (response.status === 200) {
                            //console.log('email and password are correct');
                            dispatch(authActions.sucessLogin());
                            history.push('/');
                        } else {
                            //console.log('email or password incorrect');
                            setErrorLogin(<span className="error-login">Email or password incorrect</span>);
                            dispatch(authActions.failLogin());
                        }
                    },
                    error => {
                        //console.log('requisição falhou');
                    }
                );
        }else{
            dispatch(authActions.failLogin());
            setErrorLogin(null);
        }
        // dispatch(login(email.value, password.value));
    }

    function checkValidity(value, field, setField) {
        let isValid = true;
        let errorMessage = [];

        value.trim() !== '' && isValid ? isValid = true : isValid = false;
        value.trim() !== '' ? errorMessage.push() : errorMessage.push(`${field.name} is invalid`);

        //console.log(errorMessage);
        //console.log(isValid);

        if (!isValid) {
            setField(prevState => {
                return { ...prevState, isValid: false, error: errorMessage }
            });
        } else {
            setField(prevState => {
                return { ...prevState, isValid: true, error: errorMessage }
            });
        }

        return isValid;
    }

    return (

        <div className="container-login">
            {auth.loggingIn ?
                <div>Carregando ...</div> :
                <form className="form-login" onSubmit={handleUserLogin}>
                    <p>{loginPhrase}</p>
                    {validationError}
                    <input
                        type="text"
                        className="text-input"
                        placeholder="Username"
                        value={email.value}
                        onChange={e => {
                            const value = e.target.value;
                            setEmail(prevState => {
                                return { ...prevState, value: value, touched: true }
                            });
                            checkValidity(value, email, setEmail);
                        }}
                    />
                    <input
                        type="password"
                        name=""
                        id=""
                        className="password-input"
                        placeholder="Password"
                        value={password.value}
                        onChange={e => {
                            const value = e.target.value;
                            setPassword(prevState => {
                                return { ...prevState, value: value, touched: true }
                            });
                            checkValidity(value, password, setPassword);
                        }}
                    />
                    <span className="pwdParagraph">{forgotPwd}</span>
                    {errorLogin}
                    <button className="btn-send" type='submit'>{btnPhrase}</button>
                </form>}
        </div>
    );
}