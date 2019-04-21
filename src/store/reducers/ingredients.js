import { updateObject } from '../utility';
const initialState={
  ingredients:null,
  loading:true,
  error:false
}


const ingredientsReducer =  (state=initialState, action  ) =>{
    let oldCount,newCount;
    switch (action.type) {
      case 'FETCH_INGREDIENTS' : return updateObject(state,{ingredients:action.value,error:false,loading:false})
      case 'ADD_INGREDIENT' :
        newCount=state.ingredients[action.ing]+1
        return updateObject(state, {ingredients:{...state.ingredients,[action.ing]:newCount}})
      case 'REMOVE_INGREDIENT' :
         oldCount=state.ingredients[action.ing];
         if(oldCount<=0) return state
         return updateObject(state, {ingredients:{...state.ingredients,[action.ing]:oldCount-1}})
      case 'FETCH_INGREDIENTS_FAILED' :
        return updateObject(state,{error:true,loading:false})
      default: return state
    }

}

export default ingredientsReducer;
