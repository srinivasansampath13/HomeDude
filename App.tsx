import { StatusBar, StyleSheet, useColorScheme, LogBox } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import RootNavigator from './src/navigators/RootNavigator';
import { Provider } from 'react-redux';
import { persist, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Auth0Provider } from 'react-native-auth0';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Disable warning notifications
LogBox.ignoreAllLogs(true);

// Google SignIn 
GoogleSignin.configure({
  webClientId: '492851561646-mcvsl9ouo1tubnbu8ic5q8r2ae9j6kqh.apps.googleusercontent.com',
  offlineAccess: true,
})

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <SafeAreaProvider>
          <Auth0Provider
            domain={"dev-bstkuoxdwbmfrglv.jp.auth0.com"}
            clientId={"LmD3L9pJPjdEVRri0EQ72QgXC5JqHho5"}>
              <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <AppContent />
          </Auth0Provider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

function AppContent() {
  // You can use safeAreaInsets to add padding or margin to your components
  // so they don’t overlap with device notches

  // const safeAreaInsets = useSafeAreaInsets();
  return <RootNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
