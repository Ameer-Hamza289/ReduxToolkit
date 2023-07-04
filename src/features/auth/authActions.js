import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendURL='http://localhost:5000';
// register
export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ firstName, email, password }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
  
        await axios.post(`${backendURL}/register`, { firstName, email, password }, config);
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue({ payload: error.response.data.message });
        } else {
          return rejectWithValue({ payload: error.message });
        }
      }
    }
  );
  
  // login
  export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
  
        const { data } = await axios.post(`${backendURL}/login`, { email, password }, config);
        // store user-token in storage
        localStorage.setItem('userToken', data.userToken);
  
        return data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue({ payload: error.response.data.message });
        } else {
          return rejectWithValue({ payload: error.message });
        }
      }
    }
  );
  
//setCredentials
// export const getUserDetails=createAsyncThunk(




// )