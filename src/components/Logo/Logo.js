import React from 'react';
import Burgerlogo from '../../assets/img/myburger.png';
import classes from './Logo.module.css';
import {NavLink, Route} from 'react-router-dom';

export const Logo = (props) => (
    <div className={classes.Logo} style={{height: props.height,}}>
        <NavLink to='/'>
        <img src={Burgerlogo} alt='Myburger' />
        </NavLink>
    </div>
); 