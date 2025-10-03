import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginWithEmailPassword, registerWithNameEmailPassword, logoutUserAuth0 } from "../auth0";

// Login user with email and password
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password} : {email: string, password: string}, thunkAPI) => {
        try{
            const credentials = await loginWithEmailPassword(email, password);
            return credentials;
        }catch(error: any){
            console.log('Error in loginUser thunk: ', error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Register user with name, email and password
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async({userName, email, password} : {userName: string, email: string, password: string}, thunkAPI) => {
        try{
            const registerUserResponse = await registerWithNameEmailPassword(userName, email, password);
            return registerUserResponse;
        }catch(error: any){
            console.log('Error in registerUser thunk: ',error);
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

// Logout
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try{
            await logoutUserAuth0();
        }catch(error: any){
            return rejectWithValue(error.message || 'Logout failed')
        }
    }
);