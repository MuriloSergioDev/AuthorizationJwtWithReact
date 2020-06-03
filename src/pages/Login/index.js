import React, { Fragment } from 'react';

import { Menu, FormSignIn, Footer } from '../../components/';

import './style.css';

import { useDispatch } from 'react-redux';

import { actions as authActions } from '../../reducers/auth.reducer';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


import api from '../../services/api'


export default function Login() {

    const dispatch = useDispatch();
    let history = useHistory();


    useEffect(() => {

        async function verifyToken(requestData) {
            try {
                const response = await api.post('accounts:lookup?key=AIzaSyCm83Fz9Zk8sIhhoUxTDFFA2cLahubLdtQ', requestData);

                if (!response.status === 200) {
                    alert('Session expired');
                    dispatch(authActions.setLogout());
                }

                if (response.data.users[0].localId === localStorage.getItem('userId')) {
                    dispatch(authActions.refreshLogin());
                    console.log('Voce foi relogado');
                    history.push('/');
                }

                //console.log(response);

            } catch (error) {
                //console.log(error)
                dispatch(authActions.setLogout());
            }
        }

        if (localStorage.getItem('idToken')) {
            const idToken = localStorage.getItem('idToken');

            const requestData = {
                idToken: idToken
            };

            verifyToken(requestData);

        }
    }, [dispatch, history]);

    return (
        <Fragment>
            <header>
                <Menu toLink1='/login' toLink2='/register' link1='LOGIN' link2='REGISTER' />
            </header>

            <section>
                <div className="parallax">
                    <div className="float-login">
                        <FormSignIn />
                    </div>
                </div>
            </section>

            <section>
                <div className="content">
                </div>
            </section>

            <footer>
                <Footer toLink1='/login' toLink2='/register' link1='LOGIN' link2='REGISTER' />
            </footer>

        </Fragment>
    );
}
