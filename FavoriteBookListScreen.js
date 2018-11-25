import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux';
import BookItem from './bestsellers/BookItem';
import _ from 'lodash';

class FavoriteBookListScreen extends React.Component {
  _renderItem = ({ item }) => {
    return (
      <BookItem
        coverURL={item.image}
        title={item.title}
        author={item.author}
        isFavorite={true}
        onPressFavorite={() => {
          console.log(item.key);
          this.props.dispatch({
            type: 'REMOVE_FAVORITE',
            book: item,
          });
        }}
      />
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList data={this.props.list} renderItem={this._renderItem} />
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
