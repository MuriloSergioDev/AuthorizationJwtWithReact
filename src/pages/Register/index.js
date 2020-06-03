import React, { Fragment } from 'react';

import {Menu, Footer, FormSignUp} from '../../components';

import './style.css';
// import { Container } from './styles';

export default function Register() {
  
  return (
    <Fragment>
      <header>
        <Menu toLink1='/login' toLink2='/register' link1='LOGIN' link2='REGISTER'/>
      </header>

      <section>
        <div className="parallax">
            <div className="float-register">
              <FormSignUp/>
            </div>
        </div>
      </section>

      <section>
        <div className="content">
          
        </div>
      </section>

      <footer>
        <Footer toLink1='/login' toLink2='/register' link1='LOGIN' link2='REGISTER'/>
      </footer>

    </Fragment>
  );
}
