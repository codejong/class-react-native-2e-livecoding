import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class MyFavoriteList extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> 총 개수: {this.props.count}</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.favoriteList.length,
  };
}
export default connect(mapStateToProps)(MyFavoriteList);
