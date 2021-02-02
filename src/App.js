import React, { useEffect, useState } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/BurgerBuilder/Checkout/Checkout';
import { Route, withRouter } from 'react-router-dom';
import Orders from './containers/BurgerBuilder/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const App = (props) => {
  useEffect(() => { // = component did mount
    props.onTryAutoSignup();
  }, []) // array zorgt ervoor dat de useEffect slechts 1 keer wordt toegepast
    
 
    let routes = (
      <>
        <Route path='/auth' component={Auth}/>
        <Route path='/' exact component={BurgerBuilder}/>
      </>
    );

    if(props.isAuthenticated) {
      routes = (
        <>
          <Route path='/Logout' component={Logout} />
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={Orders}/>
          <Route path='/' exact component={BurgerBuilder}/>
        </>
      );
    }

    return (
      <div>
        <Layout>
        {routes}    
        </Layout>
      </div>
    );
  };


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
