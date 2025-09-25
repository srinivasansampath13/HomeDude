import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password} : {email: string, password: string}, thunkAPI) => {
        try{
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            console.log('User Credential: ', userCredential);
            if(userCredential){
                return userCredential.user;
            }else{
                return thunkAPI.rejectWithValue('No user data found');
            }
        }catch(error: any){
            console.log('Error in loginUser thunk: ', error);
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);