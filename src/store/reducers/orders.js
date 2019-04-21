import { updateObject } from '../utility';

const initialState={
  orders:null,
  loading:true,
  error:false,
  cleared:false
}
 const ordersReducer = (state=initialState, action) => {
    switch (action.type) {
      case 'INITIALIZE' :
        return updateObject(state,{orders:action.value,error:false,loading:false,cleared:false});
      case 'FETCH_ORDERS_FAIL' :
        return updateObject(state,{error:true,loading:false})
      default:  return state
    }

}
export default ordersReducer;
