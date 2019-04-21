import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/ordersActions';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
class Orders extends Component {


    componentDidMount() {
        this.props.onInitialize(this.props.token, this.props.userId)

    }

    componentDidUpdate(){
      if(this.props.cleared) this.props.onInitialize(this.props.token)
    }
    render () {
      let orders=<Spinner/>;
        if(this.props.loading && !this.props.error){
          orders=<Spinner/>
        }

        if(!this.props.loading && !this.props.error && this.props.orders){
          orders=(
            <div>
                {this.props.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}

            </div>
          );
        }
        return   orders
    }
}
const mapStateToProps = state =>({
  orders:state.orders.orders,
  loading:state.orders.loading,
  error:state.orders.error,
  cleared:state.orders.cleared,
  token:state.auth.token,
  userId:state.auth.userId
})
const mapDispatchToProps = dispatch => ({
  onInitialize: (token,userId)=> dispatch(actions.initialize(token,userId))
})
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));
