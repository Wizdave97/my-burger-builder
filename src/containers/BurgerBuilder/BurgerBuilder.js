import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/ingredientsActions';



class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false
    }

    componentDidMount () {
        //console.log(this.props);
        if(this.props.ingredients==null) this.props.onFetchIngredients()


    }


    componentDidUpdate(){


    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
          this.setState( state=>({
            purchasing:!state.purchasing
          }) );
          }
        if (!this.props.isAuthenticated) {
            this.props.history.push('/auth');
          }
        }


    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    render () {
      let purchasable=false;
      if(this.props.ingredients){
        const sum = Object.keys( this.props.ingredients )
            .map( igKey => {
                return this.props.ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
            purchasable = sum>0? !purchasable:purchasable
          }
        const disabledInfo = {
            ...this.props.ingredients
        };
        //console.log(this.props.ingredients)
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

      if ( this.props.ingredients ) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredientHandler}
                        ingredientRemoved={this.props.onRemoveIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={purchasable}
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice}
                        authState={this.props.isAuthenticated} />
                </React.Fragment>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if ( this.props.loading ) {
            orderSummary = <Spinner />;
        }
        // {salad: true, meat: false, ...}
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}
const mapStateToProps = state =>({
  ingredients:state.ingredients.ingredients,
  totalPrice:state.totalPrice.totalPrice,
  loading:state.ingredients.loading,
  error:state.ingredients.error,
  isAuthenticated:state.auth.token!==null
})

const mapDispatchToProps= dispatch => ({
  onFetchIngredients: () => dispatch(actions.fetchIngredients()),
  onAddIngredientHandler: (type)=> dispatch(actions.addIngredient(type)),
  onRemoveIngredientHandler: (type) => dispatch(actions.removeIngredient(type))
})
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));
