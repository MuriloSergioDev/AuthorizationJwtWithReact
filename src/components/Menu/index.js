import React from 'react';
import { useState, useEffect } from 'react';
// import { Container } from './styles';

import { Link } from 'react-router-dom';

import './style.css';

export default function Menu(props) {
    const [showContent, setShowContent] = useState(false);
    const [classeContent, setClasseContent] = useState('none');

    //let location = useLocation(

    useEffect(() => {
        setClasseContent('show');
        if (!showContent) {
            setClasseContent('hide');
        }
    }, [classeContent, showContent]);

    
    return (
        <div className="container-menu">
            <label onClick={() => { setShowContent(!showContent) }} className="button-menu" htmlFor="bt-menu"> &#9776;</label>
            <div className={classeContent}>
                <nav className="menu-nav">
                    <ul>
                        <li><Link to={props.toLink1}><div>{props.link1}</div></Link></li>
                        <li><Link to={props.toLink2}><div onClick={props.click}>{props.link2}</div></Link></li>
                    </ul>
                </nav>
            </div>

        </div>
    );
}
