import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { createBrowserHistory} from 'history';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { autoSignUp } from '././store/actions/auth';
import asyncComponents from './hoc/asyncComponents/asyncComponents';

const history=createBrowserHistory();

const asyncCheckout= asyncComponents(()=>{
  return import('./containers/Checkout/Checkout');
})
const asyncOrders= asyncComponents(()=>{
  return import('./containers/Orders/Orders');
})
const asyncAuth= asyncComponents(()=>{
  return import('./containers/Auth/Auth');
})
class App extends Component {

  componentDidMount(){
    this.props.onAutoSignup();
  }
  render () {
    let routes=(
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path='/auth'  exact component={asyncAuth}/>
        <Redirect to="/"/>
      </Switch>
    )
    if(this.props.isAuthenticated){
      routes=(
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route path='/auth'  exact component={asyncAuth}/>
          <Redirect to="/"/>
        </Switch>
      )
    }
    return (
      <div>
        <Layout history={history}>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>({
  onAutoSignup:() => dispatch(autoSignUp())
})
const mapStateToProps = state => ({
  isAuthenticated: state.auth.token!==null
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
