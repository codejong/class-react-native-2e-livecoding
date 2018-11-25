import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class FavoriteListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{this.props.list.length}</Text>
      </View>
    );
  }
}

export default connect(function(state) {
  return {
    list: state.favoriteList,
  };
})(FavoriteListScreen);
