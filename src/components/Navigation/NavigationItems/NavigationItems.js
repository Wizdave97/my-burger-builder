import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/"  click={()=>''}exact>Burger Builder</NavigationItem>
        {props.authState?<NavigationItem click={()=>''} link="/orders">Orders</NavigationItem>:''}
        {props.authState?<NavigationItem click={props.onLogout} link="/logout" exact>logout</NavigationItem>:<NavigationItem click={()=>''} link="/auth" exact>Authentication</NavigationItem>}
    </ul>
);

export default navigationItems;
