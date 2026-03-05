import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser, forgotPasswordUser, logoutUser, loginWithGoogleUser } from "../thunks/AuthThunks";

interface AuthState {
    user: any | null;
    emailLoading: boolean;
    googleLoading: boolean;
    error: any;
    loginType: 'email' | 'google' | null;
}

const initialState: AuthState = {
    user: null,
    emailLoading: false,
    googleLoading: false,
    error: null,
    loginType: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,   
    reducers: {
        setUser(state, action: PayloadAction<any | null>) {
            state.user = action.payload;
            state.emailLoading = false;
            state.googleLoading = false;
        },

        setLoginType(state, action: PayloadAction<'email' | 'google' | null>){
            state.loginType = action.payload;
        },

        setLoading(state, action: PayloadAction<'email' | 'google'>) {
            if (action.payload === 'email') {
                state.emailLoading = true;
            } else if (action.payload === 'google') {
                state.googleLoading = true;
            }
        },

        clearError(state) {
            state.error = null;
        },

        logout(state){
            state.error = null;
            state.emailLoading = false;
            state.googleLoading = false;
            state.user = null;
            state.loginType = null;
        }
    },
    extraReducers: (builder) => {
        // Login User
        builder.addCase(loginUser.pending, (state) => {
            state.emailLoading = true;
            state.error = null;
        })

        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.emailLoading = false;
            state.error = null;
            state.loginType = 'email';
        })

        builder.addCase(loginUser.rejected,(state, action) => {
            state.emailLoading = false;
            state.error = action.payload || "Login failed";
        })

        // Register User
        builder.addCase(registerUser.pending, (state) => {
            state.emailLoading = true;
            state.error = null;
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.emailLoading = false;
            state.error = null;
        })

        builder.addCase(registerUser.rejected, (state, action) => {
            state.emailLoading = false;
            state.error = action.payload || 'Registration failed'
        })

        // Forgot Password
        builder.addCase(forgotPasswordUser.pending, (state) => {
            state.emailLoading = true
        })

        builder.addCase(forgotPasswordUser.fulfilled, (state) => {
            state.emailLoading = false
        })

        builder.addCase(forgotPasswordUser.rejected, (state) => {
            state.emailLoading = false
        })

        // Logout User
        builder.addCase(logoutUser.pending, (state) => {
            state.emailLoading = true;
            state.googleLoading = true;
            state.error = null;
        })

        builder.addCase(logoutUser.fulfilled, (state) => {
            state.emailLoading = false;
            state.googleLoading = false;
            state.user = null;
            state.error = null;
            state.loginType = null;
        })

        builder.addCase(logoutUser.rejected, (state) => {
            state.emailLoading = false;
            state.googleLoading = false;
            state.error = null;
        })


        // Google Login User
        builder.addCase(loginWithGoogleUser.pending, (state) => {
            state.googleLoading = true;
            state.error = null;
        })

        builder.addCase(loginWithGoogleUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.googleLoading = false;
            state.error = null;
            state.loginType = 'google';
        })

        builder.addCase(loginWithGoogleUser.rejected, (state, action) => {
            state.googleLoading = false;
            state.error = action.payload || "Google login failed";
        })
    }
});

export const { setUser, setLoading, clearError, setLoginType } = authSlice.actions;
export default authSlice.reducer;