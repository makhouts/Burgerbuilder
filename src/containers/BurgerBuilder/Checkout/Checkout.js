import React, { Component } from "react";
import { connect } from 'react-redux';
import { CheckoutSummary } from '../../../components/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import * as actions from '../../../store/actions/index';

class Checkout extends Component{
    

    CheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    CheckoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    
        render() {
            let summary = <Redirect  to='/' />
            if(this.props.ings) {
                const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
                summary = (
                        <div>
                            {purchasedRedirect}
                            <CheckoutSummary 
                                CheckoutCancelled={this.CheckoutCancelledHandler}
                                ingredients={this.props.ings}
                                CheckoutContinued={this.CheckoutContinueHandler} />
                            <Route path={this.props.match.path + '/contact-data'}
                            component={ContactData}/>
                        </div>
                );
            }
            return summary
        }   
};

const mapStateToProps  = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};



export default connect(mapStateToProps)(Checkout);
