import React, { useState } from 'react';


import { userService } from '../../services/user.service';

import { useHistory } from "react-router-dom";

import './style.css';
import { useEffect } from 'react';

function FormSignUp() {
    const [password, setPassword] = useState({
        name: 'password',
        value: '',
        isValid: false,
        touched: false,
        rules: {
            minLength: 4,
            maxLength: 20,
            required: true,
        },
        error: []
    });
    const [email, setEmail] = useState({
        name: 'email',
        value: '',
        isValid: false,
        touched: false,
        rules: {
            minLength: 4,
            maxLength: 20,
            required: true,
            isEmail: true
        },
        error: []
    });
    const [canSubmit, setCanSubmit] = useState(false);

    const [validationError, setValidationError] = useState(null);

    const emailClass = [];
    const passwordClass = [];

    emailClass.push('text-input');
    passwordClass.push('text-input');
    if (!email.isValid && email.touched) {
        emailClass.push('text-input-error');
        emailClass.push('text-input-error:focus');
    }

    if (!password.isValid && password.touched) {
        passwordClass.push('text-input-error');
        passwordClass.push('text-input-error:focus');
    }

    let history = useHistory();

    useEffect(() => {
        email.isValid && password.isValid ? setCanSubmit(true) : setCanSubmit(false);
    }, [email, password])



    async function handleUserRegister(e) {
        e.preventDefault();

        checkValidity(email.value, email, setEmail);
        checkValidity(password.value, password, setPassword);

        email.isValid && password.isValid ? setCanSubmit(true) : setCanSubmit(false);

        if (canSubmit) {
            userService.signUp(email.value, password.value)
                .then(
                    response => {
                        //console.log('requisição sucesso');
                        //console.log(response);

                        if (response.status === 200) {
                            //console.log('email and password are correct');
                            console.log('Sucess Register');

                        } else {
                            //console.log('email or password incorrect');
                            //setErrorLogin(<span className="error-login">Email or password incorrect</span>);
                            console.log('Fail Register');
                        }
                        history.push('/');
                    },
                    error => {
                        console.log('requisition failed');
                    }
                );
        }
        const allErrors = email.error.concat(password.error);
        const defaultErrors = ["email is required", "password is required"];
        //console.log(allErrors);

        if (!email.touched && !password.touched) {

            const errors = defaultErrors.map(function (errorMessage, index) {
                return <span key={index} className="error-message">{errorMessage}</span>
            });
            canSubmit ? setValidationError(null) : setValidationError(errors);
        } else {

            const errors = allErrors.map(function (errorMessage, index) {
                return <span key={index} className="error-message">{errorMessage}</span>
            });
            canSubmit ? setValidationError(null) : setValidationError(errors);
        }
    }

    function checkValidity(value, field, setField) {
        let isValid = true;
        let errorMessage = [];

        if (field.rules.required) {
            value.trim() !== '' && isValid ? isValid = true : isValid = false;
            value.trim() !== '' ? errorMessage.push() : errorMessage.push(`${field.name} is required`);
        }

        if (field.rules.minLength) {
            value.length >= field.rules.minLength && isValid ? isValid = true : isValid = false;
            value.length >= field.rules.minLength ? errorMessage.push() : errorMessage.push(`${field.name} requires minimum 4 characters`);
        }

        if (field.rules.maxLength) {
            value.length <= field.rules.maxLength && isValid ? isValid = true : isValid = false;
            value.length <= field.rules.maxLength ? errorMessage.push() : errorMessage.push(`${field.name} requires maximum 20 characters`);
        }

        if (field.rules.isEmail) {
            const user = value.substring(0, value.indexOf("@"));
            const domain = value.substring(value.indexOf("@") + 1, value.length);
            const emailValidation =
                (user.length >= 1) &&
                (domain.length >= 3) &&
                (user.search("@") === -1) &&
                (domain.search("@") === -1) &&
                (user.search(" ") === -1) &&
                (domain.search(" ") === -1) &&
                (domain.search(".") !== -1) &&
                (domain.indexOf(".") >= 1) &&
                (domain.lastIndexOf(".") < domain.length - 1);

            emailValidation && isValid ? isValid = true : isValid = false;
            emailValidation ? errorMessage.push() : errorMessage.push(`${field.name} is not valid`);
        }

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
        <div className="container-form">
            <form className="form-register" onSubmit={handleUserRegister}>
                <p>Register Now</p>
                {validationError}
                <input
                    type="text"
                    className={emailClass.join(' ')}
                    placeholder="Email"
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
                    className={passwordClass.join(' ')}
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

                <button className="btn-send" type='submit'>Comfirm</button>
            </form>
        </div>
    );
}

export default FormSignUp;