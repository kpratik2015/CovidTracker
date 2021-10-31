import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar barStyle={'light-content'} />
        <QueryClientProvider client={queryClient}>
          <StackNavigator />
        </QueryClientProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

export default App;
