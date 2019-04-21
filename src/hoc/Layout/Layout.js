import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { authLogout } from '../../store/actions/auth';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    onLogout = () => {
      console.log('logged out');
      this.props.onLogout();
      this.props.history.push('/');

    }
    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        return (
            <React.Fragment>
                <Toolbar onLogout={this.onLogout} authState={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    onLogout={this.onLogout}
                    authState={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state =>({
  isAuthenticated: state.auth.token!==null
})
const mapDispatchToProps = dispatch  =>({
  onLogout: ()=> dispatch(authLogout())
})
export default connect(mapStateToProps,mapDispatchToProps)(Layout);
