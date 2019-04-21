import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState={
  token:null,
  userId:null,
  error:null,
  loading:false
}
const authSuccess =(state, action)=>{
  return updateObject(state,{
    token:action.authData.idToken,
    userId:action.authData.localId,
    error:null,
    loading:false
  })
}
const authFail =(state, action) =>{
  return updateObject(state,{
    error:action.error,
    loading:false
  })
}
const authReducer = (state=initialState,action) => {
  switch (action.type) {
      case actionTypes.AUTH_START: return updateObject(state,{error:false, loading:true});
      case actionTypes.AUTH_SUCCESS: return authSuccess(state,action)
      case actionTypes.AUTH_FAIL: return authFail(state,action)
      case actionTypes.AUTH_LOGOUT: return updateObject(state,{token:null,userId:null})
      default: return state
  }
}

export default authReducer;
