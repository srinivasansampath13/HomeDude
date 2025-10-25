import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
    domain: 'dev-bstkuoxdwbmfrglv.jp.auth0.com',
    clientId: 'LmD3L9pJPjdEVRri0EQ72QgXC5JqHho5',
})

// Login with Email and Password
export const loginWithEmailPassword = async (email: string, password: string) => {
    try{
        const response = await auth0.auth.passwordRealm({
            username: email,
            password: password,
            realm: 'Username-Password-Authentication',
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
          connection: 'Username-Password-Authentication',
        });
        return response; // ✅ success
      } catch (error: any) {
        throw error;
      }
}

// Logout 
export const logoutUserAuth0 = async () => {
    try {
        await auth0.webAuth.clearSession();
        return true;
    } catch (error: any) {
        // Even if clearSession fails, we should still return true
        // as the local state will be cleared by Redux
        console.log('Auth0 clearSession error:', error);
        return true;
    }
}