import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Aux } from '../../hoc/Auxiliary';
import { Burger } from '../../components/Burger/Burger';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';
import { Modal } from '../../components/UI/Modal/Modal';
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { withErrorHandler } from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from 'axios';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component{

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseableState (ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

            return sum > 0;

    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHander = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };  

    render(){
        const disableInfo = {
            ...this.props.ings
        };
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = <Spinner />

        if(this.props.ings) {
            burger = (
                <>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientsAdded={this.props.onIngredientAdded}
                        ingredientsRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.updatePurchaseableState(this.props.ings)}
                        price={this.props.price}
                        isAuth={this.props.isAuth}
                        ordered = {this.purchaseHandler}
                
                    />   
                 </>
                    ); 
                        orderSummary = 
                        <OrderSummary
                            ingredients={this.props.ings}
                            price={this.props.price} 
                            purchaseCancel = {this.purchaseCancelHandler}
                            purchaseProceed = {this.purchaseContinueHander}
                        />                   
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path)) 


    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));