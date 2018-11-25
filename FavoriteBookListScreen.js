import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

class FavoriteBookListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          {_.map(
            this.props.list,
            (book, index) => index + ': ' + book.title
          ).join('\n\n')}
        </Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.favoriteList,
  };
}

export default connect(mapStateToProps)(FavoriteBookListScreen);
