import React, { Component } from "react";
import { Order } from '../../../components/Order/Order';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import {Spinner, spinner} from '../../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Orders extends Component{
 
    render() {
        let orders = <Spinner />;
        if( !this.props.loading) {
            orders = this.props.orders.map(order => (
                        <Order key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                    ));
            
        };

        return(
            <div>
               {orders}
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        isAuth: state.auth.token !== null,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Orders);