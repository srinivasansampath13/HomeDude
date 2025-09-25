import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "../thunks/AuthThunks";
import { FirebaseAuthTypes } from '@react-native-firebase/auth';


interface AuthState {
    user: FirebaseAuthTypes.User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: '',
};

const authSlice = createSlice({
    name: "auth",
    initialState,   
    reducers: {
        setUser(state, action: PayloadAction<any | null>) {
            state.user = action.payload;
            state.loading = false;
        },

        setLoading(state, action: PayloadAction<boolean>) {
            state.loading =action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            console.log('Login user pending...');
            state.loading = true;
            state.error = null;
        })

        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log('Login user fulfilled...');
            state.user = action.payload;
            state.loading = false;
        })

        builder.addCase(loginUser.rejected,(state, action) => {
            console.log('Login user rejected...');
            state.loading = false;
            state.error = action.payload as string;
        })
    }
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;