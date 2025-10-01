import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginWithEmailPassword } from "../auth0";

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