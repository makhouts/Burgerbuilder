import React from 'react';
import { Logo } from '../../Logo/Logo';
import { NavigationItems} from '../Toolbar/NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import { Backdrop } from '../../UI/Modal/Backdrop/Backdrop';


export const SideDrawer = (props) => {
    let attachClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachClasses = [classes.SideDrawer, classes.Open];

    }
    return(
        <>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            
            <nav>
                <NavigationItems isAuthenticated={props.isAuthenticated} />
            </nav>
        </div>
        </>
    );
}