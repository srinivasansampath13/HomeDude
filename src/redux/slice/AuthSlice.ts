import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "../thunks/AuthThunks";


interface AuthState {
    user: any | null;
    loading: boolean;
    error: any;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
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
            state.error = null;
        })

        builder.addCase(loginUser.rejected,(state, action) => {
            console.log('Login user rejected...');
            state.loading = false;
            state.error = action.payload || "Login failed";
        })
    }
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;