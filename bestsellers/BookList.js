import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import BookItem from './BookItem';
import NYT from './NYT';
import NAVER from './NAVER';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false,
      loadingMore: false,
      lastPage: 1,
      keyword: 'react',
    };
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidMount() {
    this._refreshData();
  }

  _renderItem = ({ item }) => {
    return (
      <BookItem
        coverURL={item.image}
        title={item.title}
        author={item.author}
        isFavorite={item.isFavorite}
        onPressFavorite={() => {
          console.log(item.key);
          this.props.dispatch({
            type: item.isFavorite ? 'REMOVE_FAVORITE' : 'ADD_FAVORITE',
            book: item,
          });
        }}
      />
    );
  };

  _addKeysToBooks = books => {
    // Takes the API response from the NYTimes,
    // and adds a key property to the object
    // for rendering purposes
    return books.map(book => {
      return Object.assign(book, { key: book.isbn });
    });
  };

  _refreshData = () => {
    this.setState({
      refreshing: true,
    });

    NAVER.fetchBooks({
      page: 1,
      keyword: this.state.keyword,
    }).then(books => {
      this.setState({
        data: this._addKeysToBooks(books),
        refreshing: false,
        lastPage: 1,
      });
    });
  };

  _onEndReached = ({ distanceFromEnd }) => {
    if (!this.onEndReachedCalledDuringMomentum) {
      console.log(distanceFromEnd);
      this.setState({
        loadingMore: true,
      });

      NAVER.fetchBooks({
        page: this.state.lastPage + 1,
        keyword: this.state.keyword,
      }).then(books => {
        console.log(books);
        this.setState(state => ({
          data: state.data.concat(this._addKeysToBooks(books)),
          lastPage: state.lastPage + 1,
          loadingMore: false,
        }));
      });
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  _renderFooter = () => {
    return (
      <View
        style={{
          height: 50,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator animating={this.state.loadingMore} size="small" />
      </View>
    );
  };

  render() {
    const listDataWithFavorite = this.state.data.map(book => ({
      ...book,
      isFavorite: this.props.favoriteBookKeys.indexOf(book.key) > -1,
    }));
    return (
      <View style={styles.container}>
        <View style={{ height: 50 }}>
          <TextInput
            style={{
              borderColor: 'gray',
              borderWidth: 1,
              height: 30,
              margin: 10,
            }}
            onSubmitEditing={e => {
              this.setState(
                {
                  keyword: e.nativeEvent.text,
                },
                () => {
                  this._refreshData();
                }
              );
            }}
            defaultValue={this.state.keyword}
          />
        </View>
        <FlatList
          data={listDataWithFavorite}
          renderItem={this._renderItem}
          onEndReached={this._onEndReached}
          onRefresh={this._refreshData}
          refreshing={this.state.refreshing}
          onEndReachedThreshold={0.3}
          ListFooterComponent={this._renderFooter}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({ container: { flex: 1, paddingTop: 22 } });

function mapStateToProps(state) {
  return {
    favoriteBookKeys: state.favoriteList.map(book => book.key),
  };
}
export default connect(mapStateToProps)(BookList);
