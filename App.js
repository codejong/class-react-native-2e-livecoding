import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import BookListScreen from './bestsellers/BookList';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import MyFavoriteListScreen from './MyFavoriteList';
import logger from 'redux-logger';

import reducers from './reducers';

const myStore = createStore(reducers, applyMiddleware(logger));

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  BookList: BookListScreen,
  MyFavorite: MyFavoriteListScreen,
  Settings: SettingsScreen,
});

const AppContainer = createAppContainer(TabNavigator);

function AppWithRedux() {
  return (
    <Provider store={myStore}>
      <AppContainer />
    </Provider>
  );
}
export default AppWithRedux;
