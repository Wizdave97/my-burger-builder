import { updateObject } from '../utility';
const initialState={
  totalPrice:4
}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const totalPriceReducer= (state=initialState, action) =>{
  let oldPrice;
  switch (action.type) {
    case 'ADD_INGREDIENT' :
      oldPrice=state.totalPrice
      return updateObject(state,{totalPrice:oldPrice + INGREDIENT_PRICES[action.ing]})
    case 'REMOVE_INGREDIENT' :
      oldPrice=state.totalPrice
      if(oldPrice<=4) return state
      return updateObject(state, {totalPrice: oldPrice - INGREDIENT_PRICES[action.ing]})
    case 'FETCH_INGREDIENTS' : return updateObject(state, {totalPrice: 4})
    default: return state

  }

}

export default totalPriceReducer;
