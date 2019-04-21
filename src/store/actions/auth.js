import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart=() =>{
  return {
    type:actionTypes.AUTH_START
  }
}

export const authSuccess =(authData) => {
  return {
    type:actionTypes.AUTH_SUCCESS,
    authData:authData
  }
}

export const authFail =(error) =>{
  return {
    type:actionTypes.AUTH_FAIL,
    error:error
  }
}
export const authLogout =() =>{
  localStorage.myburgerbuilder='';
  return {
    type:actionTypes.AUTH_LOGOUT
  }
}
export const authCheckTimeout= ( expiresIn)=>{
  return dispatch=>{
    setTimeout(()=>{
      dispatch(authLogout());
    },expiresIn*1000)
  }
}
export const auth =(email,password,isSignUp) =>{
  return dispatch =>{
    dispatch(authStart())
    const authData={
      email:email,
      password:password,
      returnSecureToken:true
    }
    let url =`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=
              AIzaSyCJgehJO2CLqfhvAPAGN75Q4p238jtoVZo`
    if(!isSignUp) url=`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCJgehJO2CLqfhvAPAGN75Q4p238jtoVZo`
    axios.post(url,authData).then(response=>{
        console.log(response)
        if(!localStorage.myburgerbuilder) {
          localStorage.myburgerbuilder='';
          let loginData={idToken:response.data.idToken,localId:response.data.localId,expiresIn:new Date(new Date().getTime() + new Date(response.data.expiresIn*1000).getTime())}
          localStorage.myburgerbuilder=JSON.stringify(loginData)
        }
        dispatch(authSuccess(response.data))
        dispatch(authCheckTimeout(response.data.expiresIn))
      }).catch(err=>{
        if(!err.status) return dispatch(authFail(err))
        console.log(err)
        dispatch(authFail(err.response.data.error))
      })
  }
}
export const autoSignUp = () =>{
  return dispatch =>{
    if(localStorage.myburgerbuilder){
      let loginData=JSON.parse(localStorage.myburgerbuilder)
      let tokenValidity=new Date(loginData.expiresIn).getTime() - new Date().getTime();
      if(tokenValidity>0){
        dispatch(authSuccess(loginData))
        dispatch(authCheckTimeout(tokenValidity/1000))
      }
      else {
        dispatch(authLogout());
      }
    }
    else dispatch(authLogout())
  }
}
