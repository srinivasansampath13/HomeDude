import Auth0 from 'react-native-auth0';


const auth0 = new Auth0({
    domain: 'dev-bstkuoxdwbmfrglv.jp.auth0.com',
    clientId: 'LmD3L9pJPjdEVRri0EQ72QgXC5JqHho5',
})

// Login with Email and Password
export const loginWithEmailPassword = async (email: string, password: string) => {
    return auth0.auth.passwordRealm({
        username: email,
        password: password,
        realm: 'Username-Password-Authentication',
        scope: 'openid profile email',
        audience: 'https://dev-bstkuoxdwbmfrglv.jp.auth0.com/api/v2/',
    })
}

// Register with name, email and password
export const registerWithNameEmailPassword = async (name: string, email: string, password: string) => {
    return auth0.auth.createUser({
        email,
        password,
        connection: 'Username-Password-Authentication',
        user_metadata: { name }, // store the name in user metadata
    });
}