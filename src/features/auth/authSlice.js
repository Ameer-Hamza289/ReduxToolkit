import { createSlice } from '@reduxjs/toolkit';
import { registerUser,userLogin } from './authActions';

//initialize the user-token from localStorage
// const userToken=localStorage.getItem('userToken')?localStorage.getItem('userToken'):null
const userToken=localStorage.getItem('userToken')||null
const initialState = {
    loading: false,
    userInfo: {}, // for user object
    userToken, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
  }
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout:(state)=>{
            localStorage.removeItem('userToken')
            state.loading=false
            state.userInfo=null
            state.userToken=null
            state.error=null
            state.success=false
        },
        setCredentials:(state,{payload})=>{
            state.userInfo=payload
        }
    },
    // extraReducers: {
    //     //register the user
    //     [registerUser.pending]:(state)=>{
    //         state.loading=true
    //         state.error=null
    //     },
    //     [registerUser.fulfilled]:(state)=>{
    //         state.loading=false
    //         state.success=true
    //     },
    //     [registerUser.rejected]:(state,{payload})=>{
    //         state.loading=false
    //         state.error=payload
    //     },
    //     //login user
    //     [userLogin.pending]:(state)=>{
    //         state.loading=true
    //         state.error=null
    //     },
    //     [userLogin.fulfilled]:(state,{payload})=>{
    //         state.loading=false
    //         state.userInfo=payload
    //         state.userToken=payload.userToken
    //     },
    //     [userLogin.rejected]:(state,{payload})=>{
    //         state.loading=false
    //         state.error=payload
    //     },


    // },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled,(state)=>{
            state.loading = false;
            state.success = true;
        })
        .addCase(registerUser.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
        })
        .addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.success=true
            state.userInfo = payload;
            state.userToken = payload.userToken;
          })
          .addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
          });
    }
  })
  export const { logout, setCredentials } = authSlice.actions
  export default authSlice.reducer