import React, { Component } from 'react';
import { Button } from '../../UI/Button/Button';

export class OrderSummary extends Component {

    componentDidUpdate() {
        console.log('ordersummary will update')
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
        return  <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>
                    {igKey}</span>: {this.props.ingredients[igKey]}
                </li>;
        })
        return( <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>

            <p><strong>Total Price:</strong> €{this.props.price.toFixed(2)}</p>
            <p>Continue to checkout?</p>
            <Button clicked ={this.props.purchaseCancel} buttonType='Danger'> CANCEL</Button>
            <Button clicked ={this.props.purchaseProceed} buttonType='Success'>PROCEED</Button>
        </>
        );
    }    
    
}; 