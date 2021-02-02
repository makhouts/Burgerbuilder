import React from 'react';
import { BuildControl } from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    { label : 'Salad', type: 'salad' },
    { label : 'Bacon', type: 'bacon' },
    { label : 'Tomat', type: 'tomat' },
    { label : 'Cheese', type: 'cheese' },
    { label : 'Meat', type: 'meat' },

];
export const BuildControls = (props) => {
    return(
    <div className={classes.BuildControls}>
        <p>Current Price: € <strong>{props.price.toFixed(2)}</strong> </p>
        {controls.map(ctrl => {
            return <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added ={ () => props.ingredientsAdded(ctrl.type) }
                removed= { () => props.ingredientsRemoved(ctrl.type) }
                disabled = {props.disabled[ctrl.type]}
            />
            
        })} 

            <button className={classes.OrderButton} 
            disabled = {!props.purchasable}
            onClick = {props.ordered}>
             {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
            </button>
    </div>
    )
};