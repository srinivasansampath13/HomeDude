import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginWithEmailPassword, registerWithNameEmailPassword, sendForgotPasswordWithEmail, logoutUserAuth0 } from "../auth0";

// Login user with email and password
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password} : {email: string, password: string}, thunkAPI) => {
        try{
            const credentials = await loginWithEmailPassword(email, password);
            return credentials;
        }catch(error: any){
            return thunkAPI.rejectWithValue(error);
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
            return thunkAPI.rejectWithValue(error)
        }
    }
);

// Forgot Password With Email
export const forgotPasswordUser = createAsyncThunk(
    'auth/forgotPassword',
     async (email: string, { rejectWithValue }) => {
        try{
            const response = await sendForgotPasswordWithEmail(email)
            return response;
        }catch(error: any){
            return rejectWithValue(error)
        }
    }
)

// Logout
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try{
            await logoutUserAuth0();
        }catch(error: any){
            return rejectWithValue(error || 'Logout failed')
        }
    }
);