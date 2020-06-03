import React, { Fragment } from 'react';

import { Menu, Footer } from '../../components';
import { actions } from '../../reducers/counter.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { actions as authActions } from '../../reducers/auth.reducer';
import './style.css';
// import { Container } from './styles';

export default function Home() {

  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  let history = useHistory();

  function handleUserLogout() {
    dispatch(authActions.setLogout());
    localStorage.clear();
    history.push('/');
    console.log('Voce foi deslogado');
  }

  return (
    <Fragment>
      <header>
        <Menu toLink1='/' toLink2='/' link1='HOME' link2='LOGOUT' click={handleUserLogout}/>
      </header>

      <section>
        <div className="parallax">
        </div>
      </section>

      <section>
        <div className="content">
          <h1>Contador{counter}</h1>
          <button onClick={() => dispatch(actions.increment())}> Incrementar</button>
          <button onClick={() => dispatch(actions.decrement())}> Decrementar</button>
        </div>
      </section>

      <footer>
        <Footer toLink1='/' toLink2='/' link1='HOME' link2='LOGOUT' click={handleUserLogout}/>
      </footer>

    </Fragment>
  );
}
