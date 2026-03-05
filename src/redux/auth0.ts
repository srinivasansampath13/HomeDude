import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
    domain: 'dev-bstkuoxdwbmfrglv.jp.auth0.com',
    clientId: 'LmD3L9pJPjdEVRri0EQ72QgXC5JqHho5',
})

const CONNECTION = 'Username-Password-Authentication'; // Default DB connection

// Login with Email and Password
export const loginWithEmailPassword = async (email: string, password: string) => {
    try{
        const response = await auth0.auth.passwordRealm({
            username: email,
            password: password,
            realm: CONNECTION,
            scope: 'openid profile email',
        })
        if(response && response?.accessToken){
            const userInfo = await auth0.auth.userInfo({ token: response?.accessToken})
            return {
                accessToken: response.accessToken,
                idToken: response.idToken,
                user: userInfo
            };
        }else{
            throw new Error('Access token not received')
        }
    }catch(error: any){
        throw error;
    }
}

// Register with name, email and password
export const registerWithNameEmailPassword = async (userName: string, email: string, password: string) => {
    try {
        const response = await auth0.auth.createUser({
          email,
          password,
          username: userName,
          connection: CONNECTION,
        });
        return response;
      } catch (error: any) {
        throw error;
      }
}

// Forgot Password with email
export const sendForgotPasswordWithEmail = async (email: string) => {
    try{
        const response = await auth0.auth.resetPassword({
            email,
            connection: CONNECTION
        });
        return { success: true, message: 'Password reset email sent successfully' };
    }catch(error: any){
        throw new Error(error || 'Failed to send reset email')
    }
}

// Logout 
export const logoutUserAuth0 = async () => {
    try {
        await auth0.webAuth.clearSession();
        return true;
    } catch (error: any) {
        return true;
    }
}

// Google Signin
export const loginWithGoogle = async() => {
    try{
        await GoogleSignin.hasPlayServices();
        const response = await GoogleSignin.signIn();
        // Check if user cancelled the sign-in
        if (response.type === 'cancelled') {
            throw new Error('USER_CANCELLED_LOGIN');
        }
        
        // Check if data is null or invalid
        if (!response.data) {
            throw new Error('No user data received from Google Sign-in');
        }
        
        // Format response to match email/password login structure
        const formattedUserInfo = {
            accessToken: response.data?.idToken || '',
            idToken: response.data?.idToken || '',
            user: {
                email: response.data?.user?.email || '',
                name: response.data?.user?.name || '',
                photo: response.data?.user?.photo || '',
                sub: response.data?.user?.id || ''
            }
        };
        return formattedUserInfo;
    }catch(error: any){
        console.error('Google Sign-in Error:', error);
        throw error;
    }
}

// Logout User Google
export const logoutUserGoogle = async () => {
    try{
        await GoogleSignin.signOut();
        return true;
    }catch(error: any){
        console.error('Google Sign-out Error',error);
        throw error;
    }
}