import api from './api';

export const userService = {
    login,
    signUp,
};

const API_KEY = `${process.env.REACT_APP_FIREBASE_AUTH_API_KEY}`;

async function login(email, password) {

    const data = {
        email: email,
        password: password,
        returnSecureToken: true
    };
    
    try {
        const response = await api.post(`accounts:signInWithPassword?key=${API_KEY}`, data);

        if (response.status === 200) {
            console.log('Voce foi logado');
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('userId', response.data.localId)
            localStorage.setItem('idToken', response.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)
            //window.location.reload(false);

            return response;
        }
        //console.log(response);
    } catch (error) {
        return error;
        //console.warn(error);
    }
}

async function signUp(email, password) {

    const data = {
        email: email,
        password: password,
        returnSecureToken: true
    };

    try {
        const response = await api.post(`accounts:signUp?key=${API_KEY}`, data);
        return response;
        //console.log(response);
    } catch (error) {
        return error;
        //console.warn(error);
    }
}