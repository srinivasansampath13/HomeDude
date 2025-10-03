import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser } from "../thunks/AuthThunks";

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
        // Login User
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

        // Register User
        builder.addCase(registerUser.pending, (state) => {
            console.log('Register user pending...');
            state.loading = true,
            state.error = null;
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {
            console.log('Register user fullfilled...');
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })

        builder.addCase(registerUser.rejected, (state, action) => {
            console.log('Register user rejected...');
            state.loading = false;
            state.error = action.payload || 'Registration failed'
        })

        // Logout User
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(loginUser.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
            state.error = null;
        })

        builder.addCase(loginUser.rejected, (state) => {
            state.loading = false;
            state.error = null;
        })
    }
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;