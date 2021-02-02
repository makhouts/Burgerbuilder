import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Aux } from '../../hoc/Auxiliary';
import { Toolbar } from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import { SideDrawer } from '../Navigation/SideDrawer/SideDrawer';


const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    }

    const DrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer)
    }
        return(
            <Aux> 
                   
                    <Toolbar isAuthenticated={props.isAuthenticated} DrawerToggleClicked={DrawerToggleHandler} />
                    <SideDrawer
                    isAuthenticated={props.isAuthenticated} 
                    open={showSideDrawer}
                    closed={sideDrawerClosedHandler} />
                    <main className={classes.Content}>
                        {props.children}
                    </main>
            </Aux>
            );
        };

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null 
    };
}

export default connect(mapStateToProps)(Layout);