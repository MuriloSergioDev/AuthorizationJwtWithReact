import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

import facebook from '../../assets/facebook.png';
import google from '../../assets/google.png';
import linkedin from '../../assets/linkedin.png';
import twitter from '../../assets/twitter.png';


export default function Footer(props) {

    return (
        <Fragment>
            <div className="container-footer">
                <nav className="menu-footer">
                    <ul>
                    <li><Link to={props.toLink1}><div>{props.link1}</div></Link></li>
                    <li><Link to={props.toLink2}><div onClick={props.click}>{props.link2}</div></Link></li>
                    </ul>
                </nav>

                <div className="menu-icons">
                    <img src={facebook} alt="" />
                    <img src={twitter} alt="" />
                    <img src={google} alt="" />
                    <img src={linkedin} alt="" />

                </div>

                <p>Copyrights free</p>
            </div>
        </Fragment>
    );
}
