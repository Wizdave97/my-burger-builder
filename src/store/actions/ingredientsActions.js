import axios from '../../axios-orders';


const saveIngredients =(type,ingredients) =>{
  return {
    type:type,
    value:ingredients
  }
}

export const fetchIngredients = () =>{
  return dispatch =>{
    axios.get( 'https://react-burger-builder-96754.firebaseio.com/ingredients.json' )
        .then( response => {
            dispatch(saveIngredients('FETCH_INGREDIENTS',response.data))
        } )
        .catch( error => {
            dispatch({type:'FETCH_INGREDIENTS_FAILED'});
        } );
  }
}

export const addIngredient= (type) =>{
    return {
      type:'ADD_INGREDIENT',
      ing:type
    }
}

export const removeIngredient = (type) =>{
  return {
    type:'REMOVE_INGREDIENT',
    ing:type
  }
}
