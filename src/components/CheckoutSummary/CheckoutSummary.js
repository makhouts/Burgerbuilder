import React from 'react';
import { Burger } from '../Burger/Burger';
import { Button } from '../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

export const CheckoutSummary = (props) => (
    <div className={classes.CheckoutSummary}>
        <h1>We hope it tastes well!</h1>
        <div>
            <Burger ingredients={props.ingredients} />
                      
            <Button 
            buttonType='Danger'
            clicked={props.CheckoutCancelled}>CANCEL</Button>

            <Button
            buttonType='Success'
            clicked={props.CheckoutContinued}>CONTINUE</Button>
        </div>
        
    </div>
);