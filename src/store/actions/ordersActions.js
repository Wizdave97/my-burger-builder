import axios from '../../axios-orders';

const saveOrders= (type,value)=>{
  return {
    type:type,
    value:value
  }
}
export const initialize = (token,userId) =>{
  return dispatch =>{
    const queryParams=`?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios.get(`/orders.json${queryParams}`)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            if(res.status===401) return dispatch({type:'FETCH_ORDERS_FAIL'})
            dispatch(saveOrders('INITIALIZE',fetchedOrders))

        })
        .catch(err => {
          dispatch({type:'FETCH_ORDERS_FAIL'});
        });
  }
}
