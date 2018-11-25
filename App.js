import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import BookListScreen from './bestsellers/BookList';
import FavoriteBookListScreen from './FavoriteBookListScreen';

import { applyMiddleware, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

import logger from 'redux-logger';

const store = createStore(persistedReducer, applyMiddleware(logger));
let persistor = persistStore(store);

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    BookList: BookListScreen,
    FavoriteList: FavoriteBookListScreen,
    Settings: SettingsScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'BookList') {
          iconName = 'ios-book';
        } else if (routeName === 'Settings') {
          iconName = 'ios-settings';
        } else if (routeName === 'FavoriteList') {
          iconName = 'ios-star';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const AppContainer = createAppContainer(TabNavigator);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
